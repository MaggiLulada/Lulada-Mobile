import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Dimensions, Image, Platform, Alert, Modal, useWindowDimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/User/UserSlice';
import ModalBottomSheet from '../modals/ModalBottomSheet';
import { Headline, IconButton, List, Subheading, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { dateFormart, dateLL } from '../../utils/date';
import SwiperWorkouts from '../swiper/SwiperWorkouts';
import FastImage from 'react-native-fast-image';

const PrincipalMap = ({ coords, date, screen }) => {

  const navigation = useNavigation();
  const { colors } = useTheme();
  const user = useSelector(getUser)
  const mapRef = useRef(null);
  const window = useWindowDimensions();

  const [workouts, setWorkouts] = useState([])
  const [workoutsSwipe, setWorkoutsSwipe] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetailsVisible, setModalDetailsVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);

  useLayoutEffect(() => {
    mapRef.current.animateCamera({
      center: {
        latitude: coords.latitude ? coords.latitude : user.address.lat,
        longitude: coords.longitude ? coords.longitude : user.address.lng
      },
      pitch: 0,
      heading: 0,
      altitude: 1000,
      zoom: 16,
    });
    getUpcomingWorkouts(screen, date)
  }, [coords]);

  const getUpcomingWorkouts = async (queryScreen, queryDate) => {
    try {
      if (queryScreen == 'NextDays') {
        firestore().collection('Workouts_Schedule')
          .where('date', '<=', dateFormart(queryDate))
          .where('date', '>=', dateFormart(new Date()))
          .onSnapshot(querySnapshot => {
            const data = []
            querySnapshot.forEach(doc => {
              const {
                id,
              } = doc.data();
              data.push({
                id: doc.id,
                ...doc.data()
              })
            })
            setWorkouts(data)
          })
      } else {
        firestore().collection('Workouts_Schedule')
          .where('date', '==', dateFormart(queryDate))
          .where('state', '==', 'upcoming')
          .onSnapshot(querySnapshot => {
            const data = []
            querySnapshot.forEach(doc => {
              const {
                id,
              } = doc.data();
              data.push({
                id: doc.id,
                ...doc.data()
              })
            })
            setWorkouts(data)
          })
      }
    } catch (err) {
      Alert.alert('Error', err.message)
    }
  }

  const orderWorkouts = () => {
    workouts.sort((a, b) => {
      return a[selectedWorkoutIndex] - b[selectedWorkoutIndex]
    })
    return workouts
  }


  const openModal = (workout, index) => {
    console.log(workout.location)
    setSelectedWorkout(workout)
    orderWorkouts()
    setModalVisible(!modalVisible)
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        loadingEnabled={true}
        loadingBackgroundColor={colors.accent}
        loadingIndicatorColor={colors.primary}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        showsUserLocation
        showsMyLocationButton={true}
        showsCompass={true}
        minZoomLevel={4}
        maxZoomLevel={25}
        zoomControlEnabled={true}
      >



        {workouts.map((workout, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: workout.location.lat,
                longitude: workout.location.lng,
              }}
              onPress={() => openModal(workout)}
            >
              <View>
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/lulada-a38cb.appspot.com/o/location.png?alt=media&token=b196c2b2-f216-4f02-9afc-65e781d0615e'
                  }}
                  style={{
                    width: 40,
                    height: 54,
                  }}
                />
              </View>
            </Marker>
          )
        }
        )}
      </MapView>
      <ModalBottomSheet
        visible={modalVisible}
        size='small'
        backgroundModal='#fff'
        onClose={() => console.log('close')}

      >
        <View style={{ margin: '1%', marginTop: 0, }}>
          {!!selectedWorkout && (

            <List.Item
              title={<Headline style={{ fontSize: 22, color: '#000000' }}>{selectedWorkout.name}</Headline>}
              titleNumberOfLines={2}
              description={<Subheading style={{ color: '#000000', fontSize: 20, marginTop: `25%` }}>{selectedWorkout.start_time}</Subheading>}
              left={props => (
                <FastImage {...props}
                  source={{
                    uri: selectedWorkout.pictures[0],
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.web
                  }}
                  style={{
                    width: window.width / 4.5,
                    height: window.width / 4.5,
                    borderRadius: 100,
                    marginRight: 10,
                  }}
                />
              )}
              right={props => (
                <IconButton {...props} icon='chevron-right' size={40} style={{ alignItems: 'center', alignSelf: 'center' }} />
              )}
              onPress={() => setModalDetailsVisible(!modalDetailsVisible)}

            />
          )}
        </View>
      </ModalBottomSheet>
      <Modal
        visible={modalDetailsVisible}
        onRequestClose={() => setModalDetailsVisible(!modalDetailsVisible)}
      >
        <SwiperWorkouts
          selectedWorkout={selectedWorkout}
          allWorkouts={workouts}
          close={() => setModalDetailsVisible(!modalDetailsVisible)}
        />
      </Modal>
    </View>
  );
};

export default PrincipalMap;