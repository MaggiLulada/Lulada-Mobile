import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './RootNavigation'
import { Text } from 'react-native-paper';
import { Linking } from 'react-native';
import PushNotification from 'react-native-push-notification';

export default Navigation = () => {

  const config = {
    screens: {
      App:{
        screens:{
          Explore:'Explore',
          Workouts:{
            path:'Workouts',
            screens:{
              Initial:{
                path:'Initial',
                screens:{
                  UpcomingWorkouts:{
                    path:'UpcomingWorkouts',
                  }
                }
              }
            }
          },
          ProfileStack:'Profile'
        }
      }
    }
  }

  const linkingApp = {
    prefixes:['https://lulada.de', 'lulada://'],
    config,
    getInitialURL: async () => { // <---- 4
          // check for notification deep linking
      PushNotification.popInitialNotification(notification => { // <---- 1
        if (!notification) return;

        const {link = null} = notification?.data || {};
        link && Linking.openURL(link); // <---- 2
      });

      // this is the default return
      return Linking.getInitialURL();
    },
    subscribe: listener => { // <---- 5
      // <---- 5.a
      const onReceiveURL = ({url}) => listener(url);
  
      // <---- 5.b
      Linking.addEventListener('url', onReceiveURL);
  
      return () => Linking.removeAllListeners('url', onReceiveURL);
    },
  };
  
  return(
    <NavigationContainer linking={linkingApp} fallback={<Text>Loading...</Text>}>
      <RootStackScreen />
    </NavigationContainer>
  );
    
};