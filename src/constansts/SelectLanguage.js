import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import en from './translations/en';
import de from './translations/de';

const LANGUAGES = {
  en,
  de
};

const LANG_CODES = Object.keys(LANGUAGES);


const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
     
      console.log(`Language Actual ${Platform.OS}`, language)
      const deviceLanguage = RNLocalize.getLocales();
      const availableLanguages = RNLocalize.getLocales().filter(locale => LANG_CODES.includes(locale.languageCode))

      if (language !== null) {
        callback(language);
      } else {
        if (availableLanguages.length > 0 && availableLanguages[0].languageCode == deviceLanguage[0].languageCode) {
          callback(availableLanguages[0].languageCode);
        } else {
          callback('en');
        }
      }
     
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      {/**if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback',)

        }
        const findBestAvailableLanguage = RNLocalize.getLocales(LANG_CODES);
        callback(findBestAvailableLanguage.languageTag || 'de');
        console.log('Language is set to ', RNLocalize.getLocales() );
        return;
      }
    callback(language);**/}
    });
  },
  init: () => {},
  cacheUserLanguage: language => {
    AsyncStorage.setItem('user-language', language);
  }
};

i18n
  // detect language
  .use(LANGUAGE_DETECTOR)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // set options
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    },
    defaultNS: 'common'
  });