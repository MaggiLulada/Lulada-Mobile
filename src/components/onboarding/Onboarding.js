import React from 'react'
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import Dots from 'react-native-dots-pagination';
import { useTheme } from 'react-native-paper'
import { styles } from '../../assets/styles/globalStyles';

const Onboarding = ({length, active, pages, typeOnboarding, disabledDots}) => {

    const { colors } = useTheme();


    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.containerOnboarding}
        >
            <View style={{marginTop:'5%'}}>
                {typeOnboarding === 'register' && (
                    active != 0 && active != 1 && (
                        <Dots length={length} active={active} activeColor={colors.primary} marginHorizontal={8} />
                    )
                )} 
                {typeOnboarding === 'workout' && (
                    disabledDots === false && (
                        <Dots length={length} active={active} activeColor={colors.primary} marginHorizontal={8} />
                    )
                )}
                {typeOnboarding === 'edit' && (
                    <View style={{marginTop:'-11%'}}>
                        <Dots length={length} active={active} activeColor={colors.primary} marginHorizontal={8} />
                    </View> 
                )}
            </View>
            <View key={active} style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                {pages.map((page, index) => {
                    if (index === active) {
                        return page
                    }
                })}
            </View>
        </KeyboardAvoidingView>
    )
}

export default Onboarding