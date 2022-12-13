import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { editCurrentWorkout, editWorkout, updateCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice'
import { Caption, Headline } from 'react-native-paper'
import ButtonAddImages from '../../../buttons/ButtonAddImages'
import CarouselImages from '../../../swiper/CarouselImages'
import ButtonPrimary from '../../../buttons/ButtonPrimary'
import ModalBottomSheet from '../../../modals/ModalBottomSheet'
import ListOptionsMultimedia from '../../../lists/ListOptionsMultimedia'
import { styles } from '../../../../assets/styles/globalStyles'

const WorkoutEditPictures = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const current = useSelector(editWorkout)
  
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(current.pictures);
    const [error, setError] = useState(false);
  
  
    const nextPage = () => {
      if(data.length == 0){
        setError(true)
      } else{
        dispatch(editCurrentWorkout({
          currentPage: 1,
          pictures: data,
        }))
      }
    }
  
    const pressModal = () => {
      setModalVisible(!modalVisible);
    }
  
    return (
      <>
        <View key={current.currentPage} style={{width:'80%'}}>
            <Headline style={styles.headline}>{t('common:edit_workout_pictures')}</Headline>
            {error === false ? (
                <Caption style={{ marginTop:'-5%', marginBottom:'5%'}}>{t('common:create_workout_pictures_description')}</Caption>
            ):(
                <Caption style={{ marginTop:'-5%', marginBottom:'5%', color:'#FF0000'}}>{t('common:create_workout_pictures_description')}</Caption>
            )}
  
            <View style={{width:'100%', alignItems:'center', alignSelf:'center'}}>
                
                {data == '' ? (
                    <ButtonAddImages
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                ):(
                    <CarouselImages images={data} setImages={setData} addNew={() => setModalVisible(!modalVisible)} />
                )}
            </View>
        </View>
        <View style={{width:'80%', margin:'8%'}}>
          <ButtonPrimary
            title={t('common:next')}
            onPress={nextPage}
          />
        </View>
        <ModalBottomSheet
          visible={modalVisible}
          size='small'
          backgroundModal='#f5f5f5'
          onClose={() => console.log('close')}
          //backDrop={false}
        >
          <View style={{margin:'2%'}}>
            <ListOptionsMultimedia
              data={data}
              setData={setData}
              close={pressModal}
              t={t}
              limit={10}
            />
          </View>
        </ModalBottomSheet>
      </>
     
    )
  }
  
  export default WorkoutEditPictures