import React, { useEffect, useState } from 'react'
import { View, FlatList, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../redux/User/UserSlice'
import { Headline, Text, useTheme } from 'react-native-paper'
import { styles } from '../../../assets/styles/globalStyles'
import Button from '../../buttons/Button'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import CardDetails from '../CardDetails'
import dayjs from 'dayjs'
import ModalSimple from '../../modals/ModalSimple'
import ButtonPrimary from '../../buttons/ButtonPrimary'
import { deleteDocument, updateDocument } from '../../../utils/queriesDatabase'
import { subscribeTopic } from '../../../utils/notifications/notificationService'
import PushNotification from 'react-native-push-notification'
import { configureStore } from '@reduxjs/toolkit'
import { editCurrentWorkout } from '../../../redux/Workouts/WorkoutsSlice'

const Upcoming = () => {

    const {t} = useTranslation()
    const {colors} = useTheme()
    const navigation = useNavigation()
    const user = useSelector(getUser)
    const dispatch = useDispatch()

    const [modalVisible, setModalVisible] = useState(false) 
    const [workouts, setWorkouts] = useState([])
    const [workoutSelected, setWorkoutSelected] = useState({})
    const [workoutsPayer, setWorkoutsPayer] = useState([])
    const [workoutsPay, setWorkoutsPay] = useState([])
    const [typeDetails, setTypeDetails] = useState('')
    const today = dayjs().format('YYYY-MM-DD')
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD')

    useEffect(() => {
        getUpcomingWorkouts()
        getWorkoutsPayer() 
    }, [])

    const getUpcomingWorkouts = async() => {
        try{
            firestore().collection('Workouts_Schedule')
            .where('state', '==', 'upcoming')
            .where('user.id', '==', user.id)
            .onSnapshot(querySnapshot => {
                const data = []
                querySnapshot.forEach(doc => {
                    const {
                        id
                    } = doc.data();
                    data.push({
                        id:doc.id,
                        ...doc.data()
                    })
                })
               
                data.filter(workout => {
                    if(workout.date >= today ){
                        updateDocument('Workouts_Schedule', workout.id, {workout_id:workout.id})
                        return workout
                    } else {
                        updateDocument('Workouts_Schedule', workout.id, {state:'past'})
                    }
                })
                console.log(JSON.stringify(data))
                setWorkouts(data)
            })
        }catch(err){
            Alert.alert(t('error'), err.message)
        }    
    }

    const getWorkoutsPayer = async() => {
        try{
            firestore().collection('Payments')
            .where('payer_info.id', '==', user.id)
            .onSnapshot(querySnapshot => {
                const data = []
                querySnapshot.forEach(doc => {
                    data.push(doc.data().workout_schedule)
                })
                console.log(JSON.stringify(data), 'pay')
                getWorkoutsPayerUpcoming(data)
                setWorkoutsPayer(data)
            })
        }catch(err){
            Alert.alert(t('error'), err.message)
        }    
    }

    const getWorkoutsPayerUpcoming = async(array) => {
        try{
            firestore().collection('Workouts_Schedule')
            .where('state', '==', 'upcoming')
            .where('workout_id', 'in', array)
            .onSnapshot(querySnapshot => {
                const data = []
                querySnapshot.forEach(doc => {
                    const {
                        id
                    } = doc.data();
                    data.push({
                        id:doc.id,
                        ...doc.data()
                    })
                })
                console.log(data, 'data')
                const unique = data.filter((value, index) => {
                    return data.indexOf(value) === index
                })

                const final = [...unique, ...workouts]
                //setWorkouts(final)
            })
        }catch(err){
            Alert.alert(t('error'), err.message)
        }    
    }

    const backgroundCard = (item) => {
        console.log(item.secondary_state)
        if(item.date <= tomorrow && item.secondary_state != 'cancelled') {
            subscribeTopic(item.id)
            return colors.primary
        } else if (item.date >= tomorrow && item.secondary_state != 'cancelled') {
            return colors.accent
        } else if (item.secondary_state == 'cancelled') {
            return colors.greyCard
        }
    }

    const textCard = (item) => {
        if(item.date <= tomorrow && item.secondary_state != 'cancelled'){
            return colors.accent
        } else {
            return '#000000'
        }
    }

    const redirectDetails = (item) => {
        setWorkoutSelected(item)
        if (backgroundCard(item) == colors.primary){
            return navigation.navigate('WorkoutDetails', {data: item})
        } else if (backgroundCard(item) == colors.accent){
            setTypeDetails('not_online')
            setModalVisible(true)
        } else {
            setTypeDetails('cancelled')
            setModalVisible(true)
        }
    }

    const deleteWorkout = () => {
        deleteDocument('Workouts_Schedule', workoutSelected.workout_id).then(() => {
            setWorkoutSelected({})
            setModalVisible(!modalVisible)
        })
    }

    const editWorkout = () => {
        setModalVisible(!modalVisible)
        console.log(JSON.stringify(workoutSelected))
        dispatch(editCurrentWorkout({
            name:workoutSelected.name,
            workout_id:workoutSelected.workout_id,
            currentPage: 0,
            pictures:workoutSelected.pictures,
            location:workoutSelected.location,
            directions: workoutSelected.directions,
            start_time: workoutSelected.start_time,
            end_time: workoutSelected.end_time,
            participants: workoutSelected.participants,
            instructions: workoutSelected.instructions,
            description:workoutSelected.description,
            main_language:workoutSelected.main_language,
            secondary_language:workoutSelected.secondary_language,
            cost:workoutSelected.cost,
        }))
        navigation.navigate('EditWorkout', {data: workoutSelected})
        setWorkoutSelected({})
    }

    const renderContentState = (type) => {
        if(type == 'not_online'){
            return(
                <View style={{justifyContent:'center', padding:'5%'}}>
                    <Headline style={{textAlign:'center', fontSize:20}}>{t('common:workout_details_is_not_online')}</Headline>
                    <View style={{marginTop:'6%'}}>
                        <ButtonPrimary
                            title={t('common:workout_details_edit')}
                            onPress={editWorkout}
                        />
                    </View>
                    <View  style={{marginTop:'6%'}}>
                        <ButtonPrimary
                            title={t('common:workout_details_delete')}
                            onPress={deleteWorkout}
                        />
                    </View>
                </View>    
            )
        } else {
            return(
                <View style={{justifyContent:'center', padding:'5%'}}>
                    <Headline style={{textAlign:'center', fontSize:20}}>{t('common:workout_details_cancelled')}</Headline>
                </View>
            )
        }
    }

    return (
        <View 
            style={[
                styles.containerPrincipal, 
                {
                    backgroundColor:'#FFFFFF', 
                    alignItems:'center',
                    padding:'4%',
                }
            ]}
        >
        
            <View style={{width:'100%', margin:'5%'}}>
                {workouts.length > 0 ? (
                    <FlatList
                        data={workouts.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())}
                        renderItem={({item, index}) => {
                            return (
                                <CardDetails 
                                    index={item.id}
                                    data={item} 
                                    styles={{
                                        backgroundColor: backgroundCard(item),
                                        padding: '5%',
                                        borderRadius: 10,
                                        marginBottom: '5%',
                                    }} 
                                    colorText={textCard(item)}
                                    onPress={() => redirectDetails(item)}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => {
                            return(
                                <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:20, color: '#B2B2B2', fontFamily:'Montserrat-Bold'}}>{t('common:workouts_empty_title')}</Text>
                            </View>
                            )
                        }}
                    />
                ):(
                    <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:20, color: '#B2B2B2', fontFamily:'Montserrat-Bold'}}>{t('common:workouts_empty_title')}</Text>
                    </View>
                )}
            </View>
            <Button
                onPress={() => navigation.navigate('NewWorkout')}
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
            <ModalSimple
                visible={modalVisible}
                size='large'
                close={() => setModalVisible(!modalVisible)}
            >
                {renderContentState(typeDetails)}
            </ModalSimple>
       </View>
    )
}

export default Upcoming