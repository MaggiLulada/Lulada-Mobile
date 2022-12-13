import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Image, Platform } from 'react-native'
import Dots from 'react-native-dots-pagination'
import { ScrollView } from 'react-native-gesture-handler'
import { Headline, Subheading, Text, useTheme } from 'react-native-paper'
import ButtonPrimary from '../buttons/ButtonPrimary'

const SwiperMini = ({pages, dimensions, labelButton, onPressButton}) => {

    const {t} = useTranslation()
    const {colors} = useTheme()
    const [currentPage, setCurrentPage] = useState(0)
    const realHeight = dimensions.realHeight
    const realWidth = dimensions.realWidth
    const heightWindow = dimensions.height
    const widthWindow = dimensions.width
    const totalWidth = widthWindow * realWidth / 100 
    const totalHeight = heightWindow * realHeight / 100
 
    return (
        <View style={{
            height: totalHeight,
            alignItems: 'center',
        }}>
            <ScrollView
               
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const offset = event.nativeEvent.contentOffset.x
                    setCurrentPage(Math.round(offset / totalWidth))
                }}
            >
                {pages.map((page, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                flex:1,
                                width: totalWidth,
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                            }}
                        >
                            
                            <View style={{ height:'50%', marginTop:'3%'}}>
                                <Image
                                    source={page.image}
                                    style={{
                                        width: widthWindow / 2,
                                        height: widthWindow / 2.3,
                                        alignSelf:'center',
                                        marginTop: 20,
                                    }}
                                    resizeMode='contain'
                                />
                            </View>
                            <View style={{height:'15%',margin:'8%', marginBottom:0, alignItems:'center'}}>
                                <Headline style={{color:'#9B9B9B', fontWeight:'600'}}>{page.title}</Headline>
                            </View>
                            <View style={{margin:'8%', marginTop:0, marginBottom:0, alignItems:'center', height:'30%'}}>
                                <Subheading style={{textAlign:'center', fontWeight:'500'}}>{page.description}</Subheading>
                            </View>
                               
                        </View>
                    )
                })}
            </ScrollView>
            <View style={{width:'100%'}}>
                <Dots length={pages.length} active={currentPage} activeColor={colors.primary} marginHorizontal={8} />
                <ButtonPrimary
                    title={labelButton}
                    onPress={onPressButton}
                />
            </View>
        </View>
    )
}

export default SwiperMini