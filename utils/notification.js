import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Permissions from "expo-permissions"
import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = "mobile_flashcards.notification"

export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
              .then(Notifications.cancelAllScheduledNotificationsAsync())

}

function createNotification() {
    return {
        title: 'Flashcard Quiz!',
        body: 'Hey, don\'t forget to try a quiz for today',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export async function setLocalNotification () {
    await AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if ( status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)
                            console.log(tomorrow);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}