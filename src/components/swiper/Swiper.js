import React, {useEffect, useState} from 'react'
import { View, Dimensions, Image, ImageBackground, Platform, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Headline, IconButton, Text, useTheme } from 'react-native-paper'
import { styles } from '../../assets/styles/globalStyles'
import Dots from 'react-native-dots-pagination'
import ButtonPrimary from '../buttons/ButtonPrimary'
import Button from '../buttons/Button'

const Swiper = ({pages, actionPress}) => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window')
  const [currentPage, setCurrentPage] = useState(0)
  const [image, setImage] = useState(require('../../assets/images/background/Welcome_1.jpeg'))


  return (
    <ImageBackground source={image} resizeMode='cover' style={{flex:1}}>
      <ScrollView
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const offset = event.nativeEvent.contentOffset.x
          setCurrentPage(Math.round(offset / width))
          setImage(pages[Math.round(offset / width)].image)
        }}
      >
        {pages.map((page, index) => {
          return (
            <View
              key={index}
              style={{
                flex:1,
                flexDirection: 'column', 
                width,
              }}
            >
             
              {page.positionImage === 'up' ? (
                <View style={{height:'30%', width:'100%', padding:'5%', marginTop:'10%'}}>
                  <Headline style={[styles.headline, {color:'#fff'}]}>{page.title}</Headline>
                  <Text style={[styles.textGray, {color:'#fff', fontFamily: "Montserrat-Bold"}]}>{page.description}</Text>
                </View>
              ):(  
                <View style={{height:'30%', width:'100%', padding:'5%', marginTop:'10%'}}>
                  <Headline style={[styles.headline, {color:'#fff'}]}>{page.title}</Headline>
                  <Text style={[styles.textGray, {color:'#fff', fontFamily: "Montserrat-Bold"}]}>{page.description}</Text>
                </View>
              )}
            </View>
          )
        })}
      </ScrollView>
      <View 
        style={[Platform.select({
          ios: {
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 3,
            shadowOpacity: 0.4,
            elevation: 7,
          },
          android: {
            elevation: 20,
            shadowOpacity: 0.4,
          }
        }),{ 
          flexDirection:'row', 
          justifyContent:'space-between', 
          padding:'5%', 
          paddingBottom:'5%'
        }]}
      >
        <Dots length={pages.length} active={currentPage} activeColor={colors.primary} marginHorizontal={8} />
        {currentPage === pages.length - 1 ? (
          <Button
            label="Start"
            onPress={() => navigation.navigate(actionPress)}
            size={90}
          />
        ):(
          <Button
            label="Next"
            onPress={() => {
              setCurrentPage(Math.round(200 / width))
            }}
            size={90}
          />
        )}
       
      </View>
    </ImageBackground>
  )
}

export default Swiper