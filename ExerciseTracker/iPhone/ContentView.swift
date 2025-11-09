import SwiftUI

struct ContentView: View {
    @StateObject private var dataManager = DataManager()
    @State private var selectedExercise: ExerciseType = .pushups

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Exercise Type Picker
                Picker("Exercise", selection: $selectedExercise) {
                    ForEach(ExerciseType.allCases, id: \.self) { type in
                        Label(type.rawValue, systemImage: type.icon)
                            .tag(type)
                    }
                }
                .pickerStyle(.segmented)
                .padding()

                // Main Content
                if let activeChallenge = dataManager.getActiveChallenge(for: selectedExercise) {
                    ActiveChallengeView(
                        challenge: activeChallenge,
                        dataManager: dataManager
                    )
                } else {
                    CreateChallengeView(
                        exerciseType: selectedExercise,
                        dataManager: dataManager
                    )
                }
            }
            .navigationTitle("Exercise Tracker")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    NavigationLink(destination: HistoryView(dataManager: dataManager, exerciseType: selectedExercise)) {
                        Image(systemName: "chart.line.uptrend.xyaxis")
                    }
                }
            }
        }
        .environmentObject(dataManager)
    }
}

struct ActiveChallengeView: View {
    let challenge: Challenge
    @ObservedObject var dataManager: DataManager
    @State private var repsToAdd: Int = 10

    var todayTotal: Int {
        dataManager.getTodaysTotal(for: challenge.exerciseType)
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Progress Ring
                ZStack {
                    Circle()
                        .stroke(Color.gray.opacity(0.2), lineWidth: 20)
                        .frame(width: 200, height: 200)

                    Circle()
                        .trim(from: 0, to: challenge.progress)
                        .stroke(
                            LinearGradient(
                                colors: [.blue, .purple],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            style: StrokeStyle(lineWidth: 20, lineCap: .round)
                        )
                        .frame(width: 200, height: 200)
                        .rotationEffect(.degrees(-90))
                        .animation(.easeInOut, value: challenge.progress)

                    VStack(spacing: 4) {
                        Text("\(challenge.completedReps)")
                            .font(.system(size: 48, weight: .bold))
                        Text("of \(challenge.targetReps)")
                            .font(.headline)
                            .foregroundColor(.secondary)
                    }
                }
                .padding(.top, 32)

                // Today's Progress
                VStack(spacing: 8) {
                    Text("Today")
                        .font(.headline)
                        .foregroundColor(.secondary)
                    Text("\(todayTotal) reps")
                        .font(.title2)
                        .fontWeight(.semibold)
                    Text("\(dataManager.getTodaysSets(for: challenge.exerciseType).count) sets")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color(.systemGray6))
                .cornerRadius(12)
                .padding(.horizontal)

                // Quick Add Buttons
                VStack(spacing: 12) {
                    Text("Quick Add")
                        .font(.headline)

                    HStack(spacing: 12) {
                        ForEach([10, 15, 20, 25], id: \.self) { count in
                            Button(action: {
                                dataManager.addSet(reps: count, to: challenge.id)
                                let generator = UIImpactFeedbackGenerator(style: .medium)
                                generator.impactOccurred()
                            }) {
                                Text("\(count)")
                                    .font(.title2)
                                    .fontWeight(.semibold)
                                    .frame(maxWidth: .infinity)
                                    .padding()
                                    .background(Color.blue)
                                    .foregroundColor(.white)
                                    .cornerRadius(12)
                            }
                        }
                    }

                    // Custom Amount
                    HStack {
                        Stepper("Custom: \(repsToAdd)", value: $repsToAdd, in: 1...50)
                            .padding(.horizontal)

                        Button(action: {
                            dataManager.addSet(reps: repsToAdd, to: challenge.id)
                            let generator = UIImpactFeedbackGenerator(style: .medium)
                            generator.impactOccurred()
                        }) {
                            Image(systemName: "plus.circle.fill")
                                .font(.title2)
                        }
                        .padding(.trailing)
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                }
                .padding(.horizontal)

                // Recent Sets
                if !challenge.sets.isEmpty {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Recent Sets")
                            .font(.headline)
                            .padding(.horizontal)

                        ForEach(challenge.sets.suffix(5).reversed()) { set in
                            HStack {
                                Image(systemName: challenge.exerciseType.icon)
                                    .foregroundColor(.blue)
                                Text("\(set.reps) reps")
                                    .fontWeight(.semibold)
                                Spacer()
                                Text(formatTime(set.timestamp))
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            .padding()
                            .background(Color(.systemGray6))
                            .cornerRadius(8)
                            .padding(.horizontal)
                        }
                    }
                    .padding(.vertical)
                }

                Spacer()
            }
        }
    }

    private func formatTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}

struct CreateChallengeView: View {
    let exerciseType: ExerciseType
    @ObservedObject var dataManager: DataManager
    @State private var targetReps: Double = 200

    var body: some View {
        VStack(spacing: 32) {
            Spacer()

            Image(systemName: exerciseType.icon)
                .font(.system(size: 80))
                .foregroundColor(.blue)

            VStack(spacing: 16) {
                Text("Start a Challenge")
                    .font(.title)
                    .fontWeight(.bold)

                Text("Set your goal and start tracking your \(exerciseType.rawValue.lowercased())")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
            }

            VStack(spacing: 16) {
                Text("Target: \(Int(targetReps)) reps")
                    .font(.title2)
                    .fontWeight(.semibold)

                Slider(value: $targetReps, in: 50...500, step: 10)
                    .padding(.horizontal, 40)
            }

            Button(action: {
                dataManager.createChallenge(exerciseType: exerciseType, targetReps: Int(targetReps))
            }) {
                Text("Start Challenge")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(12)
            }
            .padding(.horizontal, 40)

            Spacer()
        }
    }
}

struct HistoryView: View {
    @ObservedObject var dataManager: DataManager
    let exerciseType: ExerciseType

    var summaries: [DailySummary] {
        dataManager.getDailySummaries(for: exerciseType, days: 30)
    }

    var body: some View {
        List {
            if summaries.isEmpty {
                Text("No history yet. Start logging your exercises!")
                    .foregroundColor(.secondary)
                    .padding()
            } else {
                ForEach(summaries) { summary in
                    VStack(alignment: .leading, spacing: 8) {
                        Text(formatDate(summary.date))
                            .font(.headline)
                        HStack {
                            Text("\(summary.totalReps) reps")
                                .font(.title3)
                                .fontWeight(.semibold)
                            Text("in \(summary.setCount) sets")
                                .foregroundColor(.secondary)
                        }
                    }
                    .padding(.vertical, 4)
                }
            }
        }
        .navigationTitle("History")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        return formatter.string(from: date)
    }
}

#Preview {
    ContentView()
}
