import React, {useState} from 'react'
import {Image, Platform, View, Dimensions, ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper';
import Dots from 'react-native-dots-pagination';

export default function CarouselImagesDetails({images}) {

    const { colors } = useTheme();
    const [currentPage, setCurrentPage] = useState(0)
    const { width } = Dimensions.get('window')

    return (

        <View
            style={{
                flexGrow:1,
                height:Platform.OS === 'android' ? '38%' : '35%', 
                marginBottom: '3%',
                top:0
            }
        }>
            <ScrollView
                horizontal={true}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const offset = event.nativeEvent.contentOffset.x
                    console.log(offset, Platform.OS)
                    setCurrentPage(Math.round(offset / width))
                }}
                pagingEnabled={true}
            >  
                {images.map((image, index) => (
                    <Image
                        key={index}
                        style={{
                            width: width,
                        }}
                        source={{uri: image.picture}}
                        resizeMode='cover'

                    />
                ))}
            </ScrollView>
            <Dots 
                length={images.length}  
                activeColor={colors.primary} 
                marginHorizontal={5}
                active={currentPage} 
            />   
        </View>
    )
}