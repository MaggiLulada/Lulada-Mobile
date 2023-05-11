import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, Dimensions, Platform, ScrollView, Modal, Alert, Image} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { Avatar, Caption, Chip, Headline, IconButton, Subheading, Text, Title, useTheme } from 'react-native-paper'
import { styles } from '../../assets/styles/globalStyles'
import { dateRelative } from '../../utils/date'
import { t } from 'i18next'
import LinearGradient from 'react-native-linear-gradient'
import CarouselImagesDetails from './CarouselImagesDetails'
import ShowMore from '../others/ShowMore'
import ButtonSecondary from '../buttons/ButtonSecondary'
import { useNavigation } from '@react-navigation/native'
import Pay from '../workouts/screens/payment/Pay'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/User/UserSlice'
import FastImage from 'react-native-fast-image'
import ButtonPrimary from '../buttons/ButtonPrimary'
import BeforePayment from '../workouts/screens/payment/BeforePayment'


const SwiperWorkouts = ({selectedWorkout, allWorkouts, close}) => {

    const user = useSelector(getUser)
    const { colors } = useTheme();
    const {width, height} = Dimensions.get('window')

    const [modalPay, setModalPay] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [footer, setFooter] = useState('initial')
    const [dataPay,setDataPay] = useState([])
    const [workoutPage, setWorkoutPage] = useState({})
    const [paymentsUser, setPaymentsUser] = useState([])

    useEffect(() => {
      getPaidWorkout()
    }, [])
    
    const startPay = (data) => {
        setDataPay(data)
        setModalPay(!modalPay)
    }

    const getPaidWorkout = async () => {
        try {
            firestore().collection('Payments')
            .where('payer_info.id', '==', user.id)
            .onSnapshot(querySnapshot => {
               
                const data = querySnapshot.docs.map(doc => doc.data())
        
                console.log(JSON.stringify(data))
        
                setPaymentsUser(data)
            })
        } catch (error) {
            Alert.alert('Error', error)
        }
    }

    const filterPaidWorkout = (page) => {
        const equal = paymentsUser.filter(payment => payment.workout_schedule == page.id)
        console.log(JSON.stringify(equal), 'equal')
        if (equal.length != 0) {
            return (
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-around', height:window.height}} >
                    {/**<Image
                        source={require("../../assets/images/HappyLulada.png")}
                        style={{
                            width: 90,
                            height: 90,
                            alignSelf:'center'
                        }}
                        resizeMode='contain'
                    />**/}
                    <View style={{alignItems:'center'}}>
                        <Headline style={{fontWeight:'500', color:'#FFF', fontSize:25}}>{t('common:workout_details_you_in')}</Headline>
                    </View>
                    <ButtonSecondary
                        style={{marginTop:'5%'}}
                        title={t('common:details')}
                        labelStyle={{color:colors.primary, fontSize:24, fontWeight:'500'}}
                    />
                </View>
            )
        } else if (footer === 'initial') {
            return (
                <>
                    <View
                        style={{
                            flex:2,
                            width:'100%', 
                            flexDirection:'row',
                            marginBottom:'8%',
                        }}
                    >
                        <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', width:'40%'}}>
                            <FastImage
                                style={{ width: 90, height:90, borderRadius:100}}
                                source={{
                                uri:page.user.picture,
                                priority:FastImage.priority.high
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            /> 
                            <Title>{page.user.name}</Title>
                            <Caption style={{marginTop:'-5%'}}>Trainer</Caption>
                        </View>
                        <View style={{flexDirection:'column', width:'60%', marginTop:'-8%'}}>
                            <Title style={{fontWeight:'600', textAlign: 'center', fontSize:22}}>{`${dateRelative(`${page.date} ${page.start_time}:00`)}, ${page.start_time}`}</Title>
                            <View style={{flexDirection:'row', justifyContent:'flex-end', marginRight:'4%'}}>

                                <Title style={{color:'#000', fontSize:16, margin:'5%', textAlign:'right', textDecorationLine:'underline'}}>{page.location.address}</Title>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', marginRight:'5%', justifyContent:'flex-end'}}>
                                <IconButton icon="currency-eur" size={20} color="#000" />
                                <Title style={{color:'#000', fontSize:16, margin:'5%', textAlign:'right'}}>{page.cost.toFixed(2)}</Title>
                            </View>
                        </View>
                    </View>
                    {user.id == page.user.id && (
                        <View style={{margin:'4%'}}>
                            <ButtonPrimary
                                //onPress={() => setModalPay(!modalPay)}
                                onPress={() => startPay(page)}
                                style={{marginTop:'5%'}}
                                title={t('common:im_in')}
                                labelStyle={{color:'#fff', fontSize:24, fontWeight:'500'}}
                            />
                        </View>
                    )}       
                </>
            )
        } else if (footer === 'im_in') {
            return(
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-around', height:window.height}} >
                    <View style={{alignItems:'center'}}>
                        <Headline style={{fontWeight:'500', color:'#FFF', fontSize:32}}>{`${page.cost} €`}</Headline>
                        <Subheading style={{color:'#FFF', fontSize:16}}>{t('common:workout_details_support_coach')}</Subheading>
                    </View>
                    <ButtonSecondary
                        onPress={() => setModalPay(!modalPay)}
                        style={{marginTop:'5%'}}
                        title={t('common:pay')}
                        labelStyle={{color:colors.primary, fontSize:24, fontWeight:'500'}}
                    />
                </View>
            )
        }

    }

    const closeModal = () => {
        setModalPay(!modalPay)
    }

    return (
        <View style={{flex:1, backgroundColor:'#FFFFFF', paddingTop:-50, top:0}}>
            <ScrollView
                horizontal={true}
                scrollEventThrottle={16}
                nestedScrollEnabled={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const offset = event.nativeEvent.contentOffset.x
                    setCurrentPage(Math.round(offset / width))
                }}
            >
                {allWorkouts.map((page, index) => {

                    const images = []

                    for (let i = 0; i < page.pictures.length; i++) { // loop through all the pictures
                        images.push({
                            picture: page.pictures[i]
                        })
                    }
                    return (
                    
                        <View
                            key={index}
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                width: width,
                                height: height,
                                top: 0,
                                left: 0,
                            }}
                        >
                        
                            <CarouselImagesDetails
                                images={images}
                                width={width}
                            />
                           
                            <Headline 
                                style={{
                                    fontSize:25, 
                                    marginLeft:'8%', 
                                    fontFamily: 'Montserrat-Bold',
                                    fontWeight: Platform.OS === 'ios' ? "bold" : "normal"
                                }}
                            >
                                {page.name}
                            </Headline>
                            
                            <ScrollView showsVerticalScrollIndicator={false} style={{ margin:'8%', marginTop:'2%'}}>
                                <View>
                                    <ShowMore
                                        text={page.description}
                                        style={[styles.textGray,{fontSize:16, textAlign:'justify'}]}
                                        characters={50}
                                    />
                                    <View style={{flexDirection:'row', marginTop:'6%'}}>
                                        <Subheading style={[styles.textGray,{fontSize:16}]}>
                                            {t('common:create_workout_speak_language_input_main')}:
                                        </Subheading>
                                        <Subheading>
                                            {page.main_language.map(l => l)}
                                        </Subheading>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Subheading style={[styles.textGray,{fontSize:16}]}>
                                            {t('common:create_workout_speak_language_input_secondary')}:
                                        </Subheading>
                                        <Subheading>
                                            {page.secondary_language.map(l => l)}
                                        </Subheading>
                                        
                                    </View>
                                </View>
                                
                            </ScrollView>
                          
                            {filterPaidWorkout(page)}
                           
                            <LinearGradient
                                colors={['rgba(150, 150, 150, 0.4)', 'rgba(130, 130, 130, 0.2)', 'rgba(120, 120, 120, 0.1)', 'transparent']}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    width: width,
                                    position: 'absolute',
                                    backgroundColor: 'rgba(50, 50, 50, 0.005)',
                                    paddingTop: Platform.OS === 'android' ? '3%': '12%',
                                    alignItems:'center',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <IconButton
                                    icon='chevron-down'
                                    color={colors.accent}
                                    size={40}
                                    onPress={() => close()}
                                />
                                <Avatar.Image
                                    key={index}
                                    size={60}
                                    source={{
                                        uri: page.user.picture
                                    }}

                                />
                                <View style={{flexDirection:'column', marginLeft:'5%', alignSelf:'center'}}>
                                    <Headline style={[styles.headline, {fontSize:20, color:'#FFF'}]}>{page.user.name}</Headline>
                                </View>
                            </LinearGradient>
                        </View>
                    )
                })}
            </ScrollView>
            <Modal
                visible={modalPay}
                onRequestClose={() => setModalPay(!modalPay)}
            >
               {/**<BeforePayment close={() => setModalPay(!modalPay)} data={dataPay}/>**/}
                <Pay 
                    dataPay={dataPay} 
                    close={closeModal}
                />
            </Modal>
        </View>
    )
}

export default SwiperWorkouts