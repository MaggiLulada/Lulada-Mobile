import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
    en,
    de,
    registerTranslation,
} from 'react-native-paper-dates'
  // registerTranslation('en', en)
  // registerTranslation('nl', nl)
  // registerTranslation('pl', pl)
  // registerTranslation('pt', pt)
  // registerTranslation('de', de)
registerTranslation('en', en),
registerTranslation('de', de)
  

AppRegistry.registerComponent(appName, () => App);
