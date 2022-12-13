import { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';


const NotificationControllerIos = (props) => {

  useEffect(() => {

    if (Platform.OS === 'ios') {
      PushNotification.configure({
          onNotification: function (notification) {
              console.log("NOTIFICATION ios:", notification);
              if(notification.title != undefined && notification.message != undefined)
              PushNotification.localNotification(notification); 
              notification.finish(PushNotificationIOS.FetchResult.NoData);
          },
          onAction: function (notification) {
            console.log("ACTION ios:", notification.action);
            console.log("NOTIFICATION ios:", notification);
          },
    
          onRegistrationError: function (err) {
            NotificationService.error(constant.error, err.message);
          },
          senderID: '137663367672',
          permissions: {
            alert: true,
            badge: true,
            sound: true,
          },
          popInitialNotification: true,
    
          requestPermissions: true,
      });
    }

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      PushNotificationIOS.addNotificationRequest({
        id: remoteMessage.messageId,
        body: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        userInfo: remoteMessage.data,
      });
    });

    return unsubscribe;
  }, []);

  return null;
};

export default NotificationControllerIos;