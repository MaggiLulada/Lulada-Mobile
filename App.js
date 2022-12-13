import React, { useEffect } from 'react'
import { LogBox, Platform } from 'react-native';
import { Provider } from 'react-redux'
import { configureFonts, DefaultTheme, Provider as PaperProvider, Text } from 'react-native-paper';
import Navigation from './src/navigation'
import "./src/constansts/SelectLanguage"
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/de';
import { AuthProvider } from './src/providers/Auth';
import { fontsConfig } from './src/assets/fonts/fonts';
import { Store } from './src/redux/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { foregroundSubscriber, notificationService } from './src/utils/notifications/notificationService';
import messaging from '@react-native-firebase/messaging';
import NotificationController from './src/utils/notifications/NotificationController';

export default function App() {
  
  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontsConfig),
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FFBA00',
      secondary: '#848484',
      accent: '#FFFFFF',
      grey: '#F5F5F5',
      greyCard: '#8D8D8D'
    },
  };

  useEffect(() => {
    notificationService()
    LogBox.ignoreLogs(['Require cycle:', "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!"]);
    messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log('En background', remoteMessage);
      }
    )
    return foregroundSubscriber()
  }, []);

  
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
     <NotificationController/>
      <Provider store={Store}>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <Navigation/>
          </AuthProvider>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>

  )
}