import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import {  IconButton, useTheme } from 'react-native-paper';
import { Platform, TouchableOpacity } from 'react-native';
//import { useHideTabsHook } from '../utils/useHideTabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';

import Splash from '../containers/auth/Splash';
import Login from '../containers/auth/Login';
import Welcome from '../components/auth/register/Welcome';
import Register from '../containers/auth/Register';
import Ready from '../components/auth/register/screens/Ready';
import Home from '../containers/home/Home';
import WorkoutsIcon from '../components/icons/WorkoutsIcon';

// ============================= Profile =====================================
import Profile from '../containers/profile/Profile';
import EditProfile from '../components/profile/screens/EditProfile';
import PaymentAndTaxes from '../components/profile/screens/PaymentAndTaxes';

// ============================= Workouts =====================================

import PastWorkouts from '../containers/workouts/PastWorkouts';
import UpcomingWorkouts from '../containers/workouts/UpcomingWorkouts';
import CreateWorkoutOnboarding from '../components/workouts/CreateWorkoutOnboarding';
import { useDispatch, useSelector } from 'react-redux';
import { currentWorkout, finishedCurrentWorkout, savingWorkout, totalWorkouts, updateCurrentWorkout } from '../redux/Workouts/WorkoutsSlice';
import { useNavigation } from '@react-navigation/native';
import WorkoutDetailsPast from '../components/workouts/screens/details/WorkoutDetailsPast';
import WorkoutDetails from '../components/workouts/screens/details/WorkoutDetails';
import SwiperWorkouts from '../components/swiper/SwiperWorkouts';
import Pay from '../components/workouts/screens/payment/Pay';
import Notifications from '../components/profile/screens/Notifications';
import dayjs from 'dayjs';
import { getUser } from '../redux/User/UserSlice';
import EditWorkoutOnboarding from '../components/workouts/screens/edit/EditWorkoutOnboarding';


const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (

    <AuthStack.Navigator
        initialRouteName="Welcome"
    >
        <AuthStack.Screen 
            name="Welcome" 
            component={Welcome} 
            options={{
                headerShown: false,
            }}
        />

        <AuthStack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false}}
        />

        <AuthStack.Screen 
            name="Register" 
            component={Register} 
            options={{
                headerTitle:'',
                headerBackTitleVisible: false,
                headerTintColor: '#4f4f4f',
                headerTransparent: true,
            }}
        />

        <AuthStack.Screen 
            name="Ready" 
            component={Ready} 
            options={{ headerShown: false}}
        />
        
    </AuthStack.Navigator>
)


const ExplorePrincipalStack = createMaterialTopTabNavigator();
const ExplorePrincipalStackScreen = ({t, colors}) => (

    <ExplorePrincipalStack.Navigator
        initialRouteName="Today"
        screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: '#848484',
            tabBarIndicatorStyle: {
                backgroundColor: colors.primary,
            },
            tabBarLabelStyle: {
                fontFamily: 'Montserrat-Bold',
            },
            
        }}
    >
        
        <ExplorePrincipalStack.Screen
            name="Today"
            options={{
                headerShown: false,
                tabBarLabel: t('navigate:explore_today'),
            }}
        >
            {props => <Home {...props} date={dayjs(new Date())} />}
        </ExplorePrincipalStack.Screen>

        <ExplorePrincipalStack.Screen
            name="Tomorrow"
            options={{
                headerShown: false,
                tabBarLabel: t('navigate:explore_tomorrow'),
            }}
        >
            {props => <Home {...props} date={dayjs(new Date()).add(1, 'day')} />}
        </ExplorePrincipalStack.Screen>

        <ExplorePrincipalStack.Screen
            name="NextDays"
            options={{
                headerShown: false,
                tabBarLabel: t('navigate:explore_next_days'),
            }}
        >
             {props => <Home {...props} date={dayjs(new Date()).add(9, 'day')} />}
        </ExplorePrincipalStack.Screen>

    </ExplorePrincipalStack.Navigator>
)


const ProfileStack = createNativeStackNavigator();
export const ProfileStackScreen = ({t}) => {

    const navigation = useNavigation()
    return(
    <ProfileStack.Navigator
        initialRouteName="Profile"
    >
        <ProfileStack.Screen
            name="Profile" 
            options={{
                headerShown: false,
            }}
        >
            {props => <Profile {...props}  />} 
        </ProfileStack.Screen>

        <ProfileStack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
                title: t('navigate:profile'),
                headerBackTitleVisible: false,
                headerTintColor: '#4f4f4f',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold',
                },
                tabBarStyle: { display: "none" },
            }}
        />

        <ProfileStack.Screen
            name="PaymentAndTaxes"
            component={PaymentAndTaxes}
            options={{
                title: t('profile_payment_and_taxes'),
                headerBackTitleVisible: false,
                headerTintColor: '#4f4f4f',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold',
                },
                headerLeft: () => {
                    return(
                       
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Ionicons
                            
                                name={Platform.OS === 'android' ? "arrow-back-outline" : "chevron-back-outline"}
                                size={Platform.OS === 'android' ? 23 : 30}
                                color="#4f4f4f"
                            />
                        </TouchableOpacity>
                      
                    )
                }
                
            }}
        />

        <ProfileStack.Screen
            name="Notifications"
            component={Notifications}
            options={{
                title: t('profile_notifications'),
                headerBackTitleVisible: false,
                headerTintColor: '#4f4f4f',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold',
                }
            }}
        />
        
    </ProfileStack.Navigator>
    )
}

const WorkoutsPrincipalStack = createMaterialTopTabNavigator();
const WorkoutsPrincipalStackScreen = ({t, colors}) => (

    <WorkoutsPrincipalStack.Navigator
        initialRouteName="PastWorkouts"
        screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: '#848484',
            tabBarIndicatorStyle: {
                backgroundColor: colors.primary,
            },
            tabBarLabelStyle: {
                fontFamily: 'Montserrat-Bold',
            },
            
        }}
    >
        
        <WorkoutsPrincipalStack.Screen
            name="PastWorkouts"
            component={PastWorkouts}
            options={{
                headerShown: false,
                tabBarLabel: t('navigate:workouts_past'),
            }}
        />

        <WorkoutsPrincipalStack.Screen
            name="UpcomingWorkouts"
            component={UpcomingWorkouts}
            options={{
                headerShown: false,
                tabBarLabel: t('navigate:workouts_upcoming'),
            }}
        />


    </WorkoutsPrincipalStack.Navigator>
)

const WorkoutsStack = createNativeStackNavigator();
const WorkoutsStackScreen = ({t, colors}) => {

    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const navigation = useNavigation()
    const current = useSelector(currentWorkout)
    const allWorkouts = useSelector(totalWorkouts)
    const finished = useSelector(finishedCurrentWorkout)
    const saving = useSelector(savingWorkout)

    const backScreenNavigation = () => {
        if(current === null || current.currentPage === 0){
            navigation.navigate('Initial')
        }
        else if(current.currentPage >= 1){
            let currentPage = current.currentPage 
            console.log('current', current)
            console.log('currentPage', currentPage-1)
            dispatch(updateCurrentWorkout({
                currentPage: currentPage - 1,
            }))
        }
    
    }

    return(
        <WorkoutsStack.Navigator>

            <WorkoutsStack.Screen
                name="Initial"
                options={{
                    title: t('navigate:workouts'),
                    headerTitleStyle: {
                        fontFamily: 'Montserrat-Bold',
                    }
                }}
            >
                {props => <WorkoutsPrincipalStackScreen {...props} t={t} colors={colors}/>}
            </WorkoutsStack.Screen>

            <WorkoutsStack.Screen
                name="NewWorkout"
                options={{
                    headerTitle:'',
                    title:'',
                    headerBackTitleVisible: false,
                    headerTintColor: '#4f4f4f',
                    headerTransparent: true,
                    //presentation:'fullScreenModal',
                    headerLeft: () => {
                        return(
                            finished === false && saving === false ?
                            <TouchableOpacity onPress={backScreenNavigation}>
                                <FontAwesomeIcons
                                    name={Platform.OS === 'android' ? "arrow-left" : "chevron-left"}
                                    size={22}
                                    color="#4f4f4f"
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity >
                            </TouchableOpacity>
                        )
                    }
                }}
            >
                {props =>  <CreateWorkoutOnboarding {...props}/> }
            </WorkoutsStack.Screen> 

            <WorkoutsStack.Screen
                name="EditWorkout"
                options={({route}) => ({
                    title:`${route.params.data.name}(${route.params.data.date})`,
                    headerBackTitleVisible: false,
                    headerTintColor: '#4f4f4f',
                    headerTintColor: '#4f4f4f',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Montserrat-Bold',
                    },
                    presentation:'fullScreenModal',
                    headerLeft: () => {
                        return(
                            finished === false && saving === false ?
                            <TouchableOpacity onPress={backScreenNavigation}>
                                <FontAwesomeIcons
                                    name={Platform.OS === 'android' ? "arrow-left" : "chevron-left"}
                                    size={22}
                                    color="#4f4f4f"
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity >
                            </TouchableOpacity>
                        )
                    }
                })}
            >
                {props =>  <EditWorkoutOnboarding {...props}/> }
            </WorkoutsStack.Screen> 

            <WorkoutsStack.Screen
                name="WorkoutDetailsPast"
                component={WorkoutDetailsPast}
                options={({ navigation, route }) => ({
                    title: route.params.data.name,
                    headerBackTitleVisible: false,
                    headerTintColor: '#4f4f4f',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Montserrat-Bold',
                    },
                    tabBarStyle: { display: "none" },
                    /**headerRight: () => (
                        route.params.data.user.id == user.id ? (
                            <IconButton
                                icon='cancel'
                                color={'#4f4f4f'}
                                style={{marginLeft:'-2%'}}
                            />
                        ):(
                            <>
                                <IconButton
                                    icon={() => (
                                        <Icon name="receipt-outline" color={'#4f4f4f'} size={20} />
                                    )}
                                />
                                <IconButton
                                    icon='cancel'
                                    color={'#4f4f4f'}
                                    style={{marginLeft:'-2%'}}
                                />
                            </>
                        )
                       
                    )**/
                })}
                
            />

            <WorkoutsStack.Screen
                name="WorkoutDetails"
                component={WorkoutDetails}
                options={({ navigation, route }) => ({
                    title: route.params.data.name,
                    headerBackTitleVisible: false,
                    headerTintColor: '#4f4f4f',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Montserrat-Bold',
                    },
                    tabBarStyle: { display: "none" },
                    /**headerRight: () => (
                        route.params.data.user.id == user.id ? (
                            <IconButton
                                icon='cancel'
                                color={'#4f4f4f'}
                                style={{marginLeft:'-2%'}}
                            />
                        ):(
                            <>
                                <IconButton
                                    icon={() => (
                                        <Icon name="receipt-outline" color={'#4f4f4f'} size={20} />
                                    )}
                                />
                                <IconButton
                                    icon='cancel'
                                    color={'#4f4f4f'}
                                    style={{marginLeft:'-2%'}}
                                />
                            </>
                        )
                       
                    )**/
                })}
                
            />
            

            <WorkoutsStack.Screen
                name="WorkoutSwiperDetailsParticipant"
                options={{
                    //headerShown: false,
                    title:'',
                    headerTransparent: true,
                    presentation:'fullScreenModal',
                    fullScreenGestureEnabled: true,
                    headerLeft: () => {
                        return(
                            <TouchableOpacity onPress={() => navigation.navigate()}>
                                <FontAwesomeIcons
                                    name={Platform.OS === 'android' ? "arrow-down" : "chevron-down"}
                                    size={24}
                                    color="#4f4f4f"
                                />
                            </TouchableOpacity>  
                        )
                    }
                }}
            >
                {props => <SwiperWorkouts {...props} />}
            </WorkoutsStack.Screen>

            <WorkoutsStack.Screen
                name="Pay"
                options={{
                    headerShown: false,
                    //headerTitle:'',
                    //headerBackTitleVisible: false,
                    //headerTintColor: '#4f4f4f',
                    headerTransparent: true,
                    presentation:'fullScreenModal',
                    fullScreenGestureEnabled: true,
                    headerLeft: () => {
                        return(
                            <TouchableOpacity onPress={backScreenNavigation}>
                                <FontAwesomeIcons
                                    name={Platform.OS === 'android' ? "arrow-left" : "chevron-left"}
                                    size={22}
                                    color="#4f4f4f"
                                />
                            </TouchableOpacity>  
                        )
                    }
                }}
            >
                {props => <Pay {...props} />}
            </WorkoutsStack.Screen>

        </WorkoutsStack.Navigator>
    )
}


const AppStack = createBottomTabNavigator();
const AppStackScreen = ({t, colors}) => (

    <AppStack.Navigator
        
        initialRouteName="Explore"
        screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: '#848484',
            tabBarStyle: {
                height: Platform.OS === 'ios' ? 80 : 54,
            },
            tabBarLabelStyle: {
                fontSize: 13,
                marginTop: -10,
                marginBottom: Platform.OS === 'android' ? 3: -4,
                fontFamily: 'Montserrat-Medium',
            }
        }}
    >
        <AppStack.Screen
            name="Explore"
            options={{
                tabBarLabel: t('navigate:explore'),
                tabBarIcon: ({color}) => (
                    <FontAwesomeIcons name="search" color={color} size={26} />
                ),
                title: t('navigate:explore'),
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold',
                }
            }}
        >
            {props => <ExplorePrincipalStackScreen {...props} t={t} colors={colors}/>}
        </AppStack.Screen>

        <AppStack.Screen
            name="Workouts"
            options={{
                tabBarLabel: t('navigate:workouts'),
                tabBarIcon: ({color}) => (
                    <WorkoutsIcon color={color}/>
                ),
                title: t('navigate:workouts'),
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold',
                },
                headerShown: false,
               
            }}
        >
            {props => <WorkoutsStackScreen {...props}  t={t} colors={colors} />}
        </AppStack.Screen>
      
        <AppStack.Screen
            name="ProfileStack"
            options={{
                headerShown: false,
                tabBarLabel: t('navigate:profile'),
                tabBarIcon: ({color}) => (
                    <FontAwesomeIcons name="user" color={color} size={26} />
                ),
            }}
        >
            {props => <ProfileStackScreen {...props}  t={t} />}
        </AppStack.Screen>

    </AppStack.Navigator>
)



const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {

    const {t} = useTranslation();
    const {colors} = useTheme()

    return (
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
            headerShown: false,
        }}
      >
        <RootStack.Screen name="Splash" component={Splash} options={{ headerShown: false}}/>
        <RootStack.Screen name="Auth" component={AuthStackScreen}/>
       
        <RootStack.Screen name="App">
            {props => <AppStackScreen {...props} t={t} colors={colors}/>}
        </RootStack.Screen>
   
      </RootStack.Navigator>
    );
}


export default RootStackScreen;