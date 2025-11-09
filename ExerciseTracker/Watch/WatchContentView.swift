import SwiftUI

struct WatchContentView: View {
    @StateObject private var dataManager = DataManager()
    @State private var selectedExercise: ExerciseType = .pushups

    var activeChallenge: Challenge? {
        dataManager.getActiveChallenge(for: selectedExercise)
    }

    var todayTotal: Int {
        dataManager.getTodaysTotal(for: selectedExercise)
    }

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 12) {
                    // Exercise Picker
                    Picker("Exercise", selection: $selectedExercise) {
                        ForEach(ExerciseType.allCases, id: \.self) { type in
                            Text(type.rawValue).tag(type)
                        }
                    }
                    .labelsHidden()

                    // Progress Summary
                    if let challenge = activeChallenge {
                        VStack(spacing: 4) {
                            Text("\(challenge.completedReps)/\(challenge.targetReps)")
                                .font(.title2)
                                .fontWeight(.bold)

                            ProgressView(value: challenge.progress)
                                .progressViewStyle(LinearProgressViewStyle(tint: .blue))

                            Text("Today: \(todayTotal)")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .padding(.vertical, 8)
                    } else {
                        Text("No active challenge")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .padding()
                    }

                    Divider()

                    // Quick Add Buttons
                    Text("Quick Add")
                        .font(.caption)
                        .foregroundColor(.secondary)

                    VStack(spacing: 8) {
                        HStack(spacing: 8) {
                            QuickAddButton(reps: 10, dataManager: dataManager, exerciseType: selectedExercise)
                            QuickAddButton(reps: 15, dataManager: dataManager, exerciseType: selectedExercise)
                        }
                        HStack(spacing: 8) {
                            QuickAddButton(reps: 20, dataManager: dataManager, exerciseType: selectedExercise)
                            QuickAddButton(reps: 25, dataManager: dataManager, exerciseType: selectedExercise)
                        }
                    }

                    // Custom Entry
                    NavigationLink(destination: CustomEntryView(dataManager: dataManager, exerciseType: selectedExercise)) {
                        HStack {
                            Image(systemName: "plus.circle")
                            Text("Custom")
                        }
                        .font(.caption)
                        .frame(maxWidth: .infinity)
                        .padding(8)
                        .background(Color.blue.opacity(0.2))
                        .cornerRadius(8)
                    }
                    .buttonStyle(.plain)

                    // Recent Sets
                    if let challenge = activeChallenge, !challenge.sets.isEmpty {
                        Divider()

                        Text("Recent")
                            .font(.caption)
                            .foregroundColor(.secondary)

                        ForEach(challenge.sets.suffix(3).reversed()) { set in
                            HStack {
                                Text("\(set.reps)")
                                    .fontWeight(.semibold)
                                Spacer()
                                Text(formatTime(set.timestamp))
                                    .font(.caption2)
                                    .foregroundColor(.secondary)
                            }
                            .padding(8)
                            .background(Color(.darkGray).opacity(0.3))
                            .cornerRadius(6)
                        }
                    }
                }
                .padding(8)
            }
            .navigationTitle("Tracker")
        }
    }

    private func formatTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}

struct QuickAddButton: View {
    let reps: Int
    @ObservedObject var dataManager: DataManager
    let exerciseType: ExerciseType

    var body: some View {
        Button(action: {
            dataManager.quickAddSet(reps: reps, exerciseType: exerciseType)
            WKInterfaceDevice.current().play(.success)
        }) {
            Text("\(reps)")
                .font(.title3)
                .fontWeight(.bold)
                .frame(maxWidth: .infinity)
                .padding(12)
                .background(Color.blue)
                .cornerRadius(8)
        }
        .buttonStyle(.plain)
    }
}

struct CustomEntryView: View {
    @ObservedObject var dataManager: DataManager
    let exerciseType: ExerciseType
    @State private var reps: Int = 10
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(spacing: 16) {
            Text("Enter Reps")
                .font(.headline)

            Picker("Reps", selection: $reps) {
                ForEach(1...50, id: \.self) { number in
                    Text("\(number)").tag(number)
                }
            }
            .labelsHidden()
            .frame(height: 100)

            Button(action: {
                dataManager.quickAddSet(reps: reps, exerciseType: exerciseType)
                WKInterfaceDevice.current().play(.success)
                dismiss()
            }) {
                Text("Add")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(8)
            }
            .buttonStyle(.plain)
        }
        .padding()
    }
}

#Preview {
    WatchContentView()
}
