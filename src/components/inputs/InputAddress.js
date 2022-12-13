import React from 'react'
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Caption } from 'react-native-paper';

const InputAddress = ({label, setAddress, close, types, mode}) => {

  const {t, i18n} = useTranslation()


  const [addressState, setAddressState] = React.useState({
    address: '',
    route: '',
    postal_code: '',
    city:'',
    country: '',
    url: '',
    lat:'',
    lng:'',
  })



  const handleAddress = (details) => {
    for (let i = 0; i < details.address_components.length; i++) {
      let addressType = details.address_components[i].types[0];
      let value = details.address_components[i].long_name;
      switch (addressType) {
        case 'street_number':
          addressState.address = details.formatted_address;
          addressState.url = details.url;
          addressState.lat = details.geometry.location.lat;
          addressState.lng = details.geometry.location.lng;
          break;
        case 'route':
          addressState.route = value;
          break;
        case 'postal_code':
          addressState.postal_code = value;
          break;
        case 'locality':
          addressState.city = value;
          break;
        case 'country':
          addressState.country = value;
          break;
      }
    }
    if(mode === 'complete' && addressState.address && addressState.postal_code){
      setAddress(addressState)
    } else if (mode == 'simple') {
      console.log(details)
      setAddress({
        address: details.formatted_address,
        lat : details.geometry.location.lat,
        lng : details.geometry.location.lng,
        url: details.url
      })
    } else {
      Alert.alert('Error', t('common:my_address_error'))
    }
  }

  return (
    <>
    <GooglePlacesAutocomplete
      styles={{
        borderBottomWidth: 1,
        borderBottomColor: '#9B9B9B',
        textInputContainer:{
          borderBottomWidth:1,
          borderBottomColor: '#9B9B9B',
          fontFamily: 'Montserrat-Regular',
        },
        container: {
          minHeight: 180,
        },
        textInput:{
          fontFamily: 'Montserrat-Regular',
          color: '#000',
        },
        description:{
          fontFamily: 'Montserrat-Medium',
          color: '#000',

        }
      }}
      placeholder={label}
      onPress={(data, details = null) => {
        setAddressState({})
        console.log('detailsssssss', details)
        handleAddress(details)
        close()
      }}
      fetchDetails={true}
      enablePoweredByContainer={false}
      query={{
        key: 'AIzaSyC-qdDbUxvi3du28WM7ZjZYID0d0m2Q-kk',
        language: 'de',
        types: types,
        components: 'country:de'
      }}
    />

    </>
  )
}

export default InputAddress