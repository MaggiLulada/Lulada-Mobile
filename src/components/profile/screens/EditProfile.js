import React, { useEffect, useRef, useState } from 'react'
import { View, KeyboardAvoidingView, ScrollView, ActivityIndicator, TouchableHighlight} from 'react-native'
import { Avatar, IconButton, TextInput, useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '../../buttons/ButtonPrimary'
import auth from '@react-native-firebase/auth'
import PhoneInput from 'react-native-phone-number-input'
import InputAddress from '../../inputs/InputAddress'
import ModalBottomSheet from '../../modals/ModalBottomSheet'
import ListOptionsMultimedia from '../../lists/ListOptionsMultimedia'
import { uploadToStorage } from '../../../utils/uploadToStorage'
import { useNavigation } from '@react-navigation/native'
import { updateUser } from '../../../redux/User/Actions'
import { useDispatch, useSelector } from 'react-redux'
import {getUser, updateInfo} from '../../../redux/User/UserSlice'


const EditProfile = () => {

    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { colors } = useTheme()
    const navigation = useNavigation()
  
    const [fullname, setFullname] = useState(`${user.name} ${user.lastName}`)
    const [address, setAddress] = useState(user.address)
    const [phoneInfo, setPhoneInfo] = useState(user.phoneInfo)
    const [pictureActual, setPictureActual] = useState(user.picture)
    const [picture, setPicture] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisiblePicture, setModalVisiblePicture] = useState(false);
    const phoneInput = useRef(null);
    const [formattedValue, setFormattedValue] = useState("");


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    const handleSave = async () => {
        try{
            if (picture.length > 0) {
                setLoading(true)
                uploadToStorage(picture, `Users/${user.id}/Profile`)
                .then(res => {
                    auth().currentUser.updateProfile({
                      displayName: fullname,
                      photoURL:res.data[0],
                    })
                    .then(() => {
                        updateUser(user.id, {
                            name: fullname.split(' ')[0],
                            lastName: fullname.split(' ')[1],
                            picture: res.data[0],
                            address: address,
                        }).then(() => {
                            dispatch(updateInfo({
                                name: fullname.split(' ')[0],
                                lastName: fullname.split(' ')[1],
                                picture: res.data[0],
                                address: address,
                            }))
                            setLoading(false)
                            setFullname('')
                            setAddress('')
                            setPhoneInfo('')
                            setPicture('')
                            navigation.goBack()
                        })
                    })
                })
            }else{
                setLoading(true)
                auth().currentUser.updateProfile({
                    displayName: fullname,
                })
                .then(() => {
                    updateUser(user.id, {
                        name: fullname.split(' ')[0],
                        lastName: fullname.split(' ')[1],
                        address: address,
                    }).then(() => {
                        dispatch(updateInfo({
                            name: fullname.split(' ')[0],
                            lastName: fullname.split(' ')[1],
                            address: address,
                        }))
                        setLoading(false)
                        setFullname('')
                        setAddress('')
                        setPhoneInfo('')
                        setPicture('')
                        navigation.goBack()
                    })
                })
            }
        }catch(error){
            console.log(error)
        }     
    }


    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1, padding:'5%', backgroundColor:'#FFFFFF', justifyContent:'space-between', alignItems:'center'}}
        >
            <ScrollView
                style={{width:'100%'}}
                contentContainerStyle={{alignItems:'center'}}
                showsVerticalScrollIndicator={false}
            >
            <View style={{width:'100%', alignItems:'center', marginTop: Platform.OS === 'android' ? '20%':'25%'}}>
                <Avatar.Image size={110} source={{uri: picture != '' ? picture[0].uri : pictureActual}}/>
                <IconButton
                    onPress={() => setModalVisiblePicture(true)}
                    icon="camera-outline"
                    size={25}
                    color='#FFFFFF'
                    style={{position:'absolute', top:'2%', right:'30%', backgroundColor:colors.primary,}}
                />
            </View>
            
            <View style={{width:'100%'}}>
                <TextInput
                    label={t('common:profile_edit_name')}
                    value={fullname}
                    style={{marginTop:'5%', backgroundColor:'#FFFFFF'}}
                    underlineColor='#9B9B9B'
                    onChangeText={text => setFullname(text)}
                />

                <PhoneInput
                    ref={phoneInput}
                    placeholder=''
                    defaultValue={phoneInfo.number}
                    defaultCode={phoneInfo.countryCode}
                    layout="first"
                    autoFocus={false}
                    onChangeText={text => setPhoneInfo({...phoneInfo, number: text})}
                    onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                        setPhoneInfo({...phoneInfo, number: text, countryCode:phoneInput.current.getCountryCode(), callingCode:phoneInput.current.getCallingCode()})
                    }}
                    containerStyle={{
                        width: '100%',
                        alignSelf: 'center',
                        marginTop: '4%',
                        backgroundColor:'#FFFFFF',
                        borderBottomWidth:1,
                        borderBottomColor:'#9B9B9B',
                    }}
                    textContainerStyle={{
                        backgroundColor:'#FFFFFF',
                        marginTop: Platform.OS === 'android' ? '-4%':'0%',
                    }}
                    textInputStyle={{
                        fontFamily:'Montserrat-Regular',
                    }}
                    codeTextStyle={{
                        fontFamily:'Montserrat-Regular',
                    }}
                    
                />

                <TouchableHighlight onPress={() => setModalVisible(!modalVisible)}>
                    <TextInput
                        label={t('common:profile_edit_address')}
                        value={address.address}
                        style={{marginTop:'5%', backgroundColor:'#FFFFFF'}}
                        underlineColor='#9B9B9B'
                        pointerEvents='none'
                        editable={false}
                        multiline={true}
                    />  
                </TouchableHighlight>
                
            </View>
            </ScrollView>
            <View style={{width:'100%', marginBottom:'5%'}}>
                <ButtonPrimary
                    title={t('common:save')}
                    onPress={() => handleSave()}
                    loading={loading}
                />
            </View>
            <ModalBottomSheet
                visible={modalVisible}
                size='large'
                backgroundModal='#ffffff'
                backDrop={true}
                keyBoard={true}
                onClose={() => console.log('close')}
            >
                <View style={{margin:'4%'}}>
                    <InputAddress 
                        label={t('common:profile_edit_address')} 
                        setAddress={setAddress} 
                        close={() => setModalVisible(!modalVisible)} 
                        types={'address'} 
                        mode='complete' 
                    />
                </View>
            </ModalBottomSheet>
            <ModalBottomSheet
                visible={modalVisiblePicture}
                size='small'
                backgroundModal='#ffffff'
                backDrop={true}
                onClose={() => console.log('close')}
            >
                <View style={{margin:'2%'}}>
                <ListOptionsMultimedia
                    data={picture}
                    setData={setPicture}
                    close={() => setModalVisiblePicture(!modalVisiblePicture)}
                    t={t}
                    limit={1}
                />
                </View>
            </ModalBottomSheet>
        </KeyboardAvoidingView>
    )
}

export default EditProfile