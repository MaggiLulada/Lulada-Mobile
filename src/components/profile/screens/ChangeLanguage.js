import React from 'react'
import { View } from 'react-native'
import { Headline, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import RadioForm from 'react-native-simple-radio-button';

const ChangeLanguage = ({close}) => {

    const { t, i18n } = useTranslation()
    const {colors} = useTheme()
    const [languages, setLanguages] = React.useState([
        {label: t('common:german'), value: 0, code: 'de'},
        {label: t('common:english'), value: 1, code: 'en'},
    ])

    changeLanguageApp = (code) => {
        close()
        return i18n.changeLanguage(code)
    }

    return (
        <View>
            <Headline style={{flexDirection:'row', fontFamily:'Montserrat-Bold'}}>{t('common:profile_language')}</Headline>
            <RadioForm
                style={{marginTop:'5%'}}
                labelStyle={{fontFamily:'Montserrat-Regular'}}
                radio_props={languages}
                initial={languages.findIndex(lang => lang.code === i18n.language)}
                onPress={(value) => changeLanguageApp(languages[value].code)}
                buttonColor={colors.primary}
                selectedButtonColor={colors.primary}
                animation={true}
                labelHorizontal={true}
                
            />
        </View>
    )
}

export default ChangeLanguage