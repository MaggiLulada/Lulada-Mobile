import React, { useEffect, useState } from 'react'
import { View, Image, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import { getUser } from '../../../redux/User/UserSlice'
import { Text, useTheme } from 'react-native-paper'
import { styles } from '../../../assets/styles/globalStyles'
import Button from '../../buttons/Button'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import CardDetails from '../CardDetails'
import dayjs from 'dayjs'

const Past = () => {

    const {t} = useTranslation()
    const {colors} = useTheme()
    const navigation = useNavigation()
    const user = useSelector(getUser)

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        getUpcomingWorkouts()   
    }, [])

    const getUpcomingWorkouts = async() => {
        try{
            firestore().collection('Workouts_Schedule')
            .where('state', '==', 'past')
            .where('user.id', '==', user.id)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setWorkouts(data)
                console.log(JSON.stringify(data), 'passssssssssss')
            })
        }catch(err){
            console.log(err)
        }    
    }

    return (
       <View style={[
        styles.containerPrincipal, 
        {
          backgroundColor:'#FFFFFF', 
          alignItems:'center',
          padding:'4%',
        }
      ]}>
            <View style={{width:'100%', margin:'5%'}}>
                {workouts.length > 0 ? (
                    <FlatList
                        data={workouts.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())}
                        renderItem={({item, index}) => {
                            return (
                                <CardDetails 
                                    index={index}
                                    data={item} 
                                    styles={{
                                        backgroundColor: 'orange',
                                        padding: '5%',
                                        borderRadius: 10,
                                        marginBottom: '5%',
                                    }} 
                                    onPress={() => navigation.navigate('WorkoutDetailsPast', {data: item})}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    
                    />
                ):(
                    <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:20, color: '#B2B2B2', fontFamily:'Montserrat-Bold' }}>{t('common:workouts_empty_title')}</Text>
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
       </View>
    )
}

export default Past