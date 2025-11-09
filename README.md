# Exercise Tracker

A simple and intuitive iOS and watchOS app to track your exercise challenges, starting with push-ups!

## Features

- Track exercise challenges (Push-ups, Pull-ups, Squats, Plank)
- Set custom goals (e.g., 200 push-ups)
- Quick-add buttons for common set sizes (10, 15, 20, 25 reps)
- Custom rep entry for any amount
- Real-time progress tracking with visual progress ring
- Daily statistics and history
- Apple Watch support for quick logging during workouts
- Automatic sync between iPhone and Apple Watch
- Clean, easy-to-use interface

## Screenshots

### iPhone App
- **Main View**: Progress ring showing total reps, quick-add buttons, and recent sets
- **History View**: View daily summaries and track your progress over time
- **Challenge Creation**: Set your target and start a new challenge

### Apple Watch App
- Quick-add buttons optimized for workout use
- Current progress at a glance
- Custom entry picker
- Recent sets history

## Project Structure

```
ExerciseTracker/
├── Shared/
│   ├── Models.swift                    # Data models (Exercise, Set, Challenge)
│   ├── DataManager.swift               # Business logic and persistence
│   └── WatchConnectivityManager.swift  # iPhone-Watch sync
├── iPhone/
│   ├── ExerciseTrackerApp.swift       # iOS app entry point
│   └── ContentView.swift              # Main iPhone UI
└── Watch/
    ├── ExerciseTrackerWatchApp.swift  # watchOS app entry point
    └── WatchContentView.swift         # Watch UI
```

## Setup Instructions

### Prerequisites
- macOS with Xcode 15.0 or later
- iOS 17.0+ target device or simulator
- watchOS 10.0+ for Apple Watch functionality

### Step 1: Create Xcode Project

1. Open Xcode and select "Create a new Xcode project"
2. Choose "iOS" → "App" template
3. Set the following:
   - **Product Name**: ExerciseTracker
   - **Interface**: SwiftUI
   - **Language**: Swift
   - **Include Tests**: Optional
4. Save in your desired location

### Step 2: Add Watch App Target

1. In Xcode, go to **File → New → Target**
2. Select **watchOS → Watch App**
3. Set:
   - **Product Name**: ExerciseTracker Watch App
   - **Interface**: SwiftUI
   - **Language**: Swift
4. Click **Finish** and **Activate** the scheme when prompted

### Step 3: Add the Source Files

1. **Add Shared files** (both iPhone and Watch targets):
   - Right-click on the project → **Add Files to "ExerciseTracker"**
   - Select files from `ExerciseTracker/Shared/`:
     - `Models.swift`
     - `DataManager.swift`
     - `WatchConnectivityManager.swift`
   - **Important**: Check both "ExerciseTracker" and "ExerciseTracker Watch App" targets

2. **Add iPhone files** (iPhone target only):
   - Add files from `ExerciseTracker/iPhone/`:
     - `ExerciseTrackerApp.swift` (replace the default one)
     - `ContentView.swift` (replace the default one)
   - Check only "ExerciseTracker" target

3. **Add Watch files** (Watch target only):
   - Add files from `ExerciseTracker/Watch/`:
     - `ExerciseTrackerWatchApp.swift` (replace the default one)
     - `WatchContentView.swift` (replace the default one)
   - Check only "ExerciseTracker Watch App" target

### Step 4: Configure Capabilities

#### For iPhone App:
1. Select the project in the navigator
2. Select the **ExerciseTracker** target
3. Go to **Signing & Capabilities**
4. Add capability: **Background Modes** (optional, for background syncing)

#### For Watch App:
1. Select the **ExerciseTracker Watch App** target
2. Ensure **WatchKit App** is properly configured

### Step 5: Configure Info.plist (if needed)

Both apps should work without additional Info.plist configuration, but you can customize:
- Display name
- Version and build numbers
- Privacy descriptions (if you plan to add HealthKit later)

### Step 6: Build and Run

1. Select the **ExerciseTracker** scheme and choose your iPhone simulator/device
2. Click **Run** (⌘R)
3. To test the Watch app:
   - Select the **ExerciseTracker Watch App** scheme
   - Choose a paired Watch simulator
   - Click **Run**

## Usage

### iPhone App

1. **Start a Challenge**:
   - Open the app
   - Select your exercise type (Push-ups, Pull-ups, etc.)
   - Set your target (default: 200 reps)
   - Tap "Start Challenge"

2. **Log Sets**:
   - Use quick-add buttons (10, 15, 20, 25) for fast entry
   - Or use the custom stepper for any amount
   - View recent sets and today's progress

3. **View History**:
   - Tap the chart icon in the top-right
   - See daily summaries and total progress

### Apple Watch App

1. **Quick Logging**:
   - Open the Watch app
   - Select exercise type with the picker
   - Tap quick-add buttons (10, 15, 20, 25)
   - Watch vibrates on successful entry

2. **Custom Entry**:
   - Tap "Custom" button
   - Use the picker to select reps (1-50)
   - Tap "Add"

3. **View Progress**:
   - See current challenge progress at the top
   - View today's total
   - Check recent sets

## Data Sync

Data automatically syncs between iPhone and Apple Watch using WatchConnectivity:
- Changes on iPhone appear on Watch
- Sets logged on Watch sync to iPhone
- Uses background sync when devices are in range
- Data persists locally on each device

## Extending the App

### Add New Exercise Types

Edit `ExerciseTracker/Shared/Models.swift`:

```swift
enum ExerciseType: String, Codable, CaseIterable {
    case pushups = "Push-ups"
    case pullups = "Pull-ups"
    case squats = "Squats"
    case plank = "Plank"
    case situps = "Sit-ups"  // Add new exercise

    var icon: String {
        switch self {
        // ... existing cases
        case .situps: return "figure.mind.and.body"  // Add icon
        }
    }
}
```

### Customize Quick-Add Buttons

In `ContentView.swift` and `WatchContentView.swift`, modify:

```swift
ForEach([10, 15, 20, 25], id: \.self) { count in  // Change these values
```

### Change Default Challenge Target

In `DataManager.swift`, line 41:

```swift
createChallenge(exerciseType: exerciseType, targetReps: 200)  // Change target
```

## Troubleshooting

### Watch App Not Syncing
- Ensure both apps are installed and running
- Check that iPhone and Watch are paired and in range
- Try force-quitting and restarting both apps

### Build Errors
- Ensure all files are added to correct targets
- Clean build folder: **Product → Clean Build Folder** (⇧⌘K)
- Check deployment targets match (iOS 17.0+, watchOS 10.0+)

### Data Not Persisting
- Check UserDefaults are working correctly
- Ensure you're not running in a restrictive simulator mode

## Future Enhancements

Possible features to add:
- HealthKit integration
- Complications for Watch faces
- Notifications for daily reminders
- Weekly/monthly statistics
- Share achievements
- Custom challenge durations
- Rest timer between sets
- Multiple simultaneous challenges

## License

This is a personal project created for exercise tracking. Feel free to use and modify as needed.

## Support

For issues or questions, refer to the code comments or SwiftUI documentation.
