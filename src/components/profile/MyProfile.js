import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { Headline, IconButton, List, RadioButton, Text, Title, useTheme } from 'react-native-paper'
import { styles } from '../../assets/styles/globalStyles'
import { t } from 'i18next'
import { useNavigation } from '@react-navigation/native'
import Button from '../buttons/Button'
import ModalBottomSheet from '../modals/ModalBottomSheet'
import ChangeLanguage from './screens/ChangeLanguage'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/User/UserSlice'


const MyProfile = () => {

  const user = useSelector(getUser)
  const navigation = useNavigation();
  const {colors} = useTheme()

  const section1 = [
    {
      option: t('common:profile_language'),
      icon: 'web',
      onPress: 'language',
    },
  ]

  const section2 = [
    {
      option: t('common:profile_payment_and_taxes'),
      icon: 'checkbox-marked-circle-outline',
    },
  ]

  const section3 = [
    {
      option: t('common:profile_legal'),
      icon: 'file-document-outline',
      section: false,
      accordion: true,
      optionsAccordion: [
        {
          optionName: t('common:profile_legal_terms_and_conditions'),
        },
        {
          optionName: t('common:profile_legal_privacy_policy'),
        },
        {
          optionName: t('common:profile_legal_cookies'),
        },
      ]
    },
    {
      option: t('common:profile_faq'),
      icon: 'help-circle-outline',
      section: false,
      accordion: true,
    },
    {
      option: t('common:profile_delete_account'),
      icon: 'delete-forever-outline',
      section: false
    },
  ]

  const [modalVisible, setModalVisible] = useState(false);
  const [viewOption, setViewOption] = useState('');
  const [value, setValue] = React.useState('first');

  const renderContent = (view) => {
    setViewOption('')
    setModalVisible(!modalVisible);
    setViewOption(view);
  }

  const redirectWorkoutStack = () => {
    navigation.navigate('NewWorkout', { screen: 'WorkoutsStackScreen' }) ||
    navigation.navigate('Workouts')
  }
  return (
    <View style={[
      styles.containerPrincipal, 
      {
        backgroundColor:'#FFFFFF', 
        alignItems:'center',
        paddingTop: Platform.OS === 'android' ? '12%' : '15%',
        padding:'4%',
      }
    ]}>
      <View style={{width:'100%'}}>
        <List.Item
          onPress={() => navigation.navigate('ProfileStack', { screen: 'EditProfile' })}
          title={<Text style={{fontSize:25}}>{user.name}</Text>}
          description={user.phoneInfo.completeNumber}
          left={props => <Image {...props} source={{uri: user.picture}} 
            style={{
              width:Platform.OS === 'android' ? 70 : 90, 
              height:Platform.OS === 'android' ? 70 : 90, 
              borderRadius:100,
              marginRight:'4%'
            }} 
          />}
          right={props => <IconButton {...props} icon="chevron-right" style={{alignSelf:'center', marginRight:'-2%'}} color={colors.secondary} size={35}/>}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
        <List.Section>
          <List.Subheader style={{marginBottom:'-4%'}}>{t('common:profile_section_general')}</List.Subheader>
            <List.Item
              title={t('common:profile_notifications')}
              left={() => <List.Icon icon='bell-outline' style={{alignSelf:'center'}} color={colors.secondary} />}
              right={props => <IconButton {...props} icon="chevron-right" style={{alignSelf:'center'}} size={35}/>}
              style={{padding:'-8%'}} 
              onPress={() => navigation.navigate('Notifications')}
            />
          {section1.map((item, index) => (
            <List.Item 
              key={item.option} 
              style={{padding:'-8%'}} 
              title={item.option} 
              left={() => <List.Icon icon={item.icon} style={{alignSelf:'center'}} color={colors.secondary} />}
              right={props => <IconButton {...props} icon="chevron-down" style={{alignSelf:'center'}} size={35}/>}
              onPress={() => renderContent(item.onPress)}
            />
          ))}
          <List.Subheader style={{marginBottom:'-4%'}}>{t('common:profile_section_for_trainers')}</List.Subheader>
          {section2.map((item, index) => (
            <List.Item 
              onPress={() => navigation.navigate('PaymentAndTaxes')}
              key={item.option} 
              style={{padding:'-8%'}}
              title={item.option} 
              left={() => <List.Icon icon={item.icon} style={{alignSelf:'center'}} color={colors.secondary}  />} 
              right={props => <IconButton {...props} icon="chevron-right" style={{alignSelf:'center'}} color={colors.secondary} size={35}/>}
            />
          ))}
          <List.Subheader style={{marginBottom:'-4%'}}>{t('common:profile_section_help')}</List.Subheader>
          {section3.map((item, index) => (
            item.accordion ? (
              <List.Accordion
                key={item.option} 
                title={item.option}
                style={{padding:'-8%', backgroundColor:'#FFFFFF'}}
                left={props => <List.Icon {...props} icon={item.icon} color={colors.secondary} />}
                right={props => <IconButton {...props} icon="chevron-down" style={{alignSelf:'center', marginRight:0}} color={colors.secondary} size={35}/>}
              >
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion>
            ):(
              <List.Item 
                key={item.option}  
                style={{padding:'-8%'}} 
                title={item.option} 
                left={() => <List.Icon icon={item.icon} style={{alignSelf:'center'}} color={colors.secondary}/>} 
                right={props => <IconButton {...props} icon="chevron-right" style={{alignSelf:'center'}} color={colors.secondary} size={35}/>}
              />
            )
          ))}
        </List.Section>
        <List.Item
          title={t('common:profile_logout')}
          left={props => <List.Icon icon="logout-variant" {...props} color={colors.secondary}/>}
        /> 
      </ScrollView>
      <Button
        onPress={redirectWorkoutStack}
        label={t('common:profile_new')}
        labelTwo={t('common:profile_workouts')}
        positionLabel={{x:'25%', y:'42%'}}
        positionLabelTwo={{x:'20%', y:'62%'}}
        styles={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          margin: '2%',
        }}
        size={90}
      />
      <ModalBottomSheet
        visible={modalVisible}
        size='smallXl'
        backgroundModal='#ffffff'
        backDrop={true}
        onClose={() => console.log('close')}
      >
        <View style={{marginTop:'2%', margin:'10%'}}>
          {viewOption === 'language' && (
            <ChangeLanguage close={() => setModalVisible(!modalVisible)} />
          )}
          {viewOption === 'location' && (
            <View>
              <Headline style={{fontWeight:'bold'}}>{t('common:profile_location')}</Headline>
            </View>
          )}
        </View>
      </ModalBottomSheet>
    </View>
  )
}

export default MyProfile