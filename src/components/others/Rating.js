import React, {useState} from 'react'
import { View, Text, KeyboardAvoidingView, Alert } from 'react-native'
import { Subheading, useTheme } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import StarRating from 'react-native-star-rating-widget'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { t } from 'i18next'
import Input from '../inputs/Input'
import { addData } from '../../utils/queriesDatabase'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/User/UserSlice'

const Rating = (props) => {

    const user = useSelector(getUser)
    const {colors} = useTheme()
    const [rate, setRate] = useState(4);
    const [visibleExperience, setVisibleExperience] = useState(false)
    const [experience, setExperience] = useState(false)
    const [loading, setLoading] = useState(false)

    const save = async() => {
        try {
            setLoading(true)
            addData("Rating", {
                workout_schedule: props.extraData.workout_id,
                rate:rate,
                experience:experience,
                user: user
            }).then(() => {
                setLoading(false)
                props.onClose()
            })
        } catch (error) {
            setLoading(false)
            Alert.alert("Error", error)
        }
    }


    return (
        <>
            <KeyboardAvoidingView style={{flex:1, flexDirection:'column', alignItems:'center', margin:'5%'}}>
                <Text style={{fontSize:25, color: colors.secondary, fontFamily:'Montserrat-Bold', textAlign:'center' }}>{props.title}</Text>
                {props.image && visibleExperience == false && (
                    <FastImage
                        source={{
                            uri: props.image,
                            priority:FastImage.priority.high,
                            cache: FastImage.cacheControl.web
                        }}
                        style={{
                            width:150,
                            height:120,
                            borderRadius:10,
                            marginTop:'10%'
                        }}  
                    />
                )}
                <Subheading>{rate}</Subheading>
                <View style={{marginTop:'8%'}}>
                    <StarRating
                        rating={rate}
                        starSize={50}
                        onChange={setRate}
                    />
                    {props.experienceTitle && (
                        <Subheading 
                            style={{
                                color:colors.primary, 
                                fontSize:16, 
                                fontWeight:'500', 
                                textAlign:'center', 
                                textDecorationLine:'underline',
                                marginTop:'3%'
                            }}
                            onPress={() => setVisibleExperience(!visibleExperience)}
                        >
                             {visibleExperience == true ? props.notExperienceTitle : props.experienceTitle}
                        </Subheading>
                    )}
                </View>
                {visibleExperience == true && (
                    <View style={{width:'100%', marginTop:'5%'}}>
                        <Input
                            style={{backgroundColor:'#FFF', width: '100%'}}
                            underlineColor='#9B9B9B'
                            placeholder='Write...'
                            onChangeText={(text) => setExperience(text)}
                        />
                    </View>
                )}
                <View style={{width:'100%', marginTop:'10%'}}>
                <ButtonPrimary
                    title={t('common:send')}
                    onPress={save}
                    loadingLabel={t('common:send') + ' ...'}
                    loading={loading}
                />
                </View>     
            </KeyboardAvoidingView>    
        </>
    )
}

export default Rating