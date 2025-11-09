import Foundation
import Combine

class DataManager: ObservableObject {
    @Published var challenges: [Challenge] = []
    @Published var allSets: [ExerciseSet] = []

    private let challengesKey = "savedChallenges"
    private let setsKey = "savedSets"
    private let connectivityManager = WatchConnectivityManager.shared
    private var cancellables = Set<AnyCancellable>()

    init() {
        loadData()
        setupSyncNotification()
    }

    private func setupSyncNotification() {
        NotificationCenter.default.publisher(for: NSNotification.Name("SyncDataReceived"))
            .sink { [weak self] notification in
                guard let self = self,
                      let challenges = notification.userInfo?["challenges"] as? [Challenge],
                      let sets = notification.userInfo?["sets"] as? [ExerciseSet] else {
                    return
                }
                self.challenges = challenges
                self.allSets = sets
                self.saveData()
            }
            .store(in: &cancellables)
    }

    // MARK: - Challenge Management
    func createChallenge(exerciseType: ExerciseType, targetReps: Int) {
        let challenge = Challenge(
            exerciseType: exerciseType,
            targetReps: targetReps,
            startDate: Date()
        )
        challenges.append(challenge)
        saveData()
    }

    func addSet(reps: Int, to challengeID: UUID) {
        guard let index = challenges.firstIndex(where: { $0.id == challengeID }) else { return }

        let set = ExerciseSet(reps: reps, exerciseType: challenges[index].exerciseType)
        challenges[index].addSet(set)
        allSets.append(set)
        saveData()
    }

    func quickAddSet(reps: Int, exerciseType: ExerciseType) {
        // Add to active challenge or create a new one
        if let index = challenges.firstIndex(where: { $0.exerciseType == exerciseType && $0.isActive }) {
            addSet(reps: reps, to: challenges[index].id)
        } else {
            // Create a default challenge if none exists
            createChallenge(exerciseType: exerciseType, targetReps: 200)
            if let newChallenge = challenges.last {
                addSet(reps: reps, to: newChallenge.id)
            }
        }
    }

    func deleteChallenge(_ challenge: Challenge) {
        challenges.removeAll { $0.id == challenge.id }
        saveData()
    }

    // MARK: - Active Challenge
    func getActiveChallenge(for exerciseType: ExerciseType) -> Challenge? {
        challenges.first { $0.exerciseType == exerciseType && $0.isActive }
    }

    // MARK: - Statistics
    func getTodaysSets(for exerciseType: ExerciseType? = nil) -> [ExerciseSet] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())

        return allSets.filter { set in
            let setDate = calendar.startOfDay(for: set.timestamp)
            let isToday = setDate == today
            if let type = exerciseType {
                return isToday && set.exerciseType == type
            }
            return isToday
        }
    }

    func getTodaysTotal(for exerciseType: ExerciseType) -> Int {
        getTodaysSets(for: exerciseType).reduce(0) { $0 + $1.reps }
    }

    func getDailySummaries(for exerciseType: ExerciseType, days: Int = 7) -> [DailySummary] {
        let calendar = Calendar.current
        let now = Date()

        var summaries: [DailySummary] = []

        for dayOffset in 0..<days {
            guard let date = calendar.date(byAdding: .day, value: -dayOffset, to: now) else { continue }
            let startOfDay = calendar.startOfDay(for: date)
            let endOfDay = calendar.date(byAdding: .day, value: 1, to: startOfDay)!

            let daySets = allSets.filter { set in
                set.exerciseType == exerciseType &&
                set.timestamp >= startOfDay &&
                set.timestamp < endOfDay
            }

            if !daySets.isEmpty {
                summaries.append(DailySummary(date: date, exerciseType: exerciseType, sets: daySets))
            }
        }

        return summaries.sorted { $0.date > $1.date }
    }

    // MARK: - Persistence
    private func saveData() {
        if let encoded = try? JSONEncoder().encode(challenges) {
            UserDefaults.standard.set(encoded, forKey: challengesKey)
        }
        if let encoded = try? JSONEncoder().encode(allSets) {
            UserDefaults.standard.set(encoded, forKey: setsKey)
        }

        // Sync with Watch
        connectivityManager.updateApplicationContext(challenges: challenges, sets: allSets)
    }

    private func loadData() {
        if let data = UserDefaults.standard.data(forKey: challengesKey),
           let decoded = try? JSONDecoder().decode([Challenge].self, from: data) {
            challenges = decoded
        }
        if let data = UserDefaults.standard.data(forKey: setsKey),
           let decoded = try? JSONDecoder().decode([ExerciseSet].self, from: data) {
            allSets = decoded
        }
    }
}
