import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { ImageBackground, View, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { Text} from 'react-native-paper';
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import { uploadToStorage } from '../../../../utils/uploadToStorage';
import { addDocument } from '../../../../utils/queriesDatabase';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/styles/globalStyles';
import { useDispatch } from 'react-redux';
import { login } from "../../../../redux/User/UserSlice";

const Ready = ({route}) => {

  const {
    phoneInfo,
    userId,
    name,
    lastName,
    address,
    birthday,
    picture
  } = route.params;

  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);

  const image = { uri: "https://firebasestorage.googleapis.com/v0/b/lulada-a38cb.appspot.com/o/ready.png?alt=media&token=fe8c48a3-4f5b-49dc-b74d-e2ef4bb25228" };

  const createUser = async() => {
    setLoading(true);
    try{
      uploadToStorage(picture, `Users/${userId}/Profile`)
      .then(res => {
        auth().currentUser.updateProfile({
          emailVerified: true,
          displayName: `${name} ${lastName}`,
          photoURL:res.data[0],
        })
        .then(() => {
          addDocument('Users' ,userId, {
            id: userId,
            email: auth().currentUser.email,
            name: name,
            lastName: lastName,
            address: address,
            phoneInfo: phoneInfo,
            birthday: birthday,
            picture: res.data[0],
            typeAuthentication: "phone",
            data_pay_tax:{
              billingAddress: '',
              emailPaypal:'',
              taxNumber:0,
              vat:false
            }
          }).then(() => {
            dispatch(login({
              id: userId,
              email: auth().currentUser.email,
              name: name,
              lastName: lastName,
              address: address,
              phoneInfo: phoneInfo,
              birthday: birthday,
              picture: res.data[0],
              typeAuthentication: "phone",
              data_pay_tax:{
                billingAddress: '',
                emailPaypal:'',
                taxNumber:0,
                vat:false
              }
            }))
            setLoading(false);
            navigation.navigate("App")
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }catch(error){
      console.log(error)
    }
  }

  return (
    <ImageBackground 
      source={image} 
      style={{
        flex:1, 
        resizeMode:'cover', 
        justifyContent:'space-between',
        alignItems:'center',
      }}
    >
   
      <View style={{ height:280, marginBottom:'-5%', marginTop:'10%'}}>
        <View style={{justifyContent:'center', alignItems:'center', marginTop:'10%'}}>
          <Image
            source={require('../../../../assets/images/lulada_2.png')}
            style={{width: 160, height: 160, resizeMode:'contain'}}
          />
          <Text style={styles.headlineWhite}>{name},</Text>
          <Text style={styles.headlineWhite}>{t('common:you_are_ready')}</Text>
        </View>
      </View>
     
      <View style={{width:'80%',height:220, flexDirection:'column', justifyContent:'space-between'}}>
        
      </View>
      <View style={{marginBottom: '15%', width:'70%'}}>
        <ButtonPrimary
          title={loading === true ? 'Starting' :  t('common:start')}
          loading={loading}
          onPress={createUser}
        />
      </View>
      
    </ImageBackground>
  )
}

export default Ready