import Foundation
import WatchConnectivity

class WatchConnectivityManager: NSObject, ObservableObject {
    static let shared = WatchConnectivityManager()

    private let session: WCSession? = WCSession.isSupported() ? WCSession.default : nil

    private override init() {
        super.init()
        session?.delegate = self
        session?.activate()
    }

    // MARK: - Send Data
    func syncData(challenges: [Challenge], sets: [ExerciseSet]) {
        guard let session = session, session.isReachable else {
            print("Watch is not reachable")
            return
        }

        do {
            let challengesData = try JSONEncoder().encode(challenges)
            let setsData = try JSONEncoder().encode(sets)

            let message: [String: Data] = [
                "challenges": challengesData,
                "sets": setsData
            ]

            session.sendMessage(message, replyHandler: nil) { error in
                print("Error sending message: \(error.localizedDescription)")
            }
        } catch {
            print("Error encoding data: \(error.localizedDescription)")
        }
    }

    func updateApplicationContext(challenges: [Challenge], sets: [ExerciseSet]) {
        guard let session = session else { return }

        do {
            let challengesData = try JSONEncoder().encode(challenges)
            let setsData = try JSONEncoder().encode(sets)

            let context: [String: Data] = [
                "challenges": challengesData,
                "sets": setsData
            ]

            try session.updateApplicationContext(context)
        } catch {
            print("Error updating application context: \(error.localizedDescription)")
        }
    }
}

// MARK: - WCSessionDelegate
extension WatchConnectivityManager: WCSessionDelegate {
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        if let error = error {
            print("WCSession activation failed: \(error.localizedDescription)")
        } else {
            print("WCSession activated with state: \(activationState.rawValue)")
        }
    }

    func session(_ session: WCSession, didReceiveMessage message: [String: Any]) {
        handleReceivedData(message)
    }

    func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String: Any]) {
        handleReceivedData(applicationContext)
    }

    private func handleReceivedData(_ data: [String: Any]) {
        guard let challengesData = data["challenges"] as? Data,
              let setsData = data["sets"] as? Data else {
            return
        }

        do {
            let challenges = try JSONDecoder().decode([Challenge].self, from: challengesData)
            let sets = try JSONDecoder().decode([ExerciseSet].self, from: setsData)

            // Post notification to update DataManager
            DispatchQueue.main.async {
                NotificationCenter.default.post(
                    name: NSNotification.Name("SyncDataReceived"),
                    object: nil,
                    userInfo: ["challenges": challenges, "sets": sets]
                )
            }
        } catch {
            print("Error decoding received data: \(error.localizedDescription)")
        }
    }

    #if os(iOS)
    func sessionDidBecomeInactive(_ session: WCSession) {
        print("WCSession became inactive")
    }

    func sessionDidDeactivate(_ session: WCSession) {
        print("WCSession deactivated")
        session.activate()
    }
    #endif
}
