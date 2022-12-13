import React, { useEffect } from 'react'
import { Alert, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


async function saveTokenToDatabase(token) {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;

    // Add the token to the users datastore 
    await firestore()
        .collection('Users')
        .doc(userId)
        .update({
            tokens: firestore.FieldValue.arrayUnion(token),
        });
}
  
export const notificationService = () => {

    messaging()
    .getToken()
    .then(token => {
        return saveTokenToDatabase(token);
    });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    if(Platform.OS == 'ios') { 
        messaging()
        .getAPNSToken().
        then(token => { 
            return saveTokenToDatabase(token); 
        }); 
    }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
        saveTokenToDatabase(token);
    });

}

export const foregroundSubscriber = messaging().onMessage(
    async (remoteMessage) => {
        console.log('Notificacion recibida', remoteMessage)
    }
);

export const subscribeTopic = (topic) => {
    messaging().subscribeToTopic(topic)
}
