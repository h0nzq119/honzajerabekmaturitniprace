import Foundation

// MARK: - Exercise Type
enum ExerciseType: String, Codable, CaseIterable {
    case pushups = "Push-ups"
    case pullups = "Pull-ups"
    case squats = "Squats"
    case plank = "Plank"

    var icon: String {
        switch self {
        case .pushups: return "figure.strengthtraining.traditional"
        case .pullups: return "figure.climbing"
        case .squats: return "figure.strengthtraining.functional"
        case .plank: return "figure.core.training"
        }
    }
}

// MARK: - Exercise Set
struct ExerciseSet: Identifiable, Codable {
    var id: UUID = UUID()
    var reps: Int
    var timestamp: Date
    var exerciseType: ExerciseType

    init(reps: Int, exerciseType: ExerciseType, timestamp: Date = Date()) {
        self.reps = reps
        self.exerciseType = exerciseType
        self.timestamp = timestamp
    }
}

// MARK: - Challenge
struct Challenge: Identifiable, Codable {
    var id: UUID = UUID()
    var exerciseType: ExerciseType
    var targetReps: Int
    var completedReps: Int = 0
    var sets: [ExerciseSet] = []
    var startDate: Date
    var endDate: Date?
    var isActive: Bool = true

    var progress: Double {
        guard targetReps > 0 else { return 0 }
        return min(Double(completedReps) / Double(targetReps), 1.0)
    }

    var isCompleted: Bool {
        completedReps >= targetReps
    }

    mutating func addSet(_ set: ExerciseSet) {
        sets.append(set)
        completedReps += set.reps

        if isCompleted && endDate == nil {
            endDate = Date()
            isActive = false
        }
    }
}

// MARK: - Daily Summary
struct DailySummary: Identifiable {
    var id: String { dateString }
    var date: Date
    var dateString: String
    var exerciseType: ExerciseType
    var totalReps: Int
    var setCount: Int

    init(date: Date, exerciseType: ExerciseType, sets: [ExerciseSet]) {
        self.date = date
        self.exerciseType = exerciseType

        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        self.dateString = formatter.string(from: date)

        self.totalReps = sets.reduce(0) { $0 + $1.reps }
        self.setCount = sets.count
    }
}
