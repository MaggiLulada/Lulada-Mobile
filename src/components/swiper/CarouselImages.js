import React, {useState} from 'react'
import { ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import { IconButton } from 'react-native-paper'
import { styles } from '../../assets/styles/globalStyles';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';


export default function CarouselImages({images, setImages, onPress, addNew}) {


    const [visibleView, setVisibleView] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [imagesData, setImagesData] = useState(images);

    const viewImage = (uri) => {
        const array = imagesPreview
        array.push({
            uri: uri,
        })
        setImagesPreview(array)
        setVisibleView(true)
    }

    const removeImage = (uri, index) => {
        console.log(imagesData)
        const array = [...images]
        const res = array.find(c => c.uri == uri)
        const i = array.indexOf(res)
        if(i == index){
            array.splice(i, 1)
            setImagesData(array)
            setImages(array)
        }
    }

    const closeViewImage = () => {
        setImagesPreview([])
        setVisibleView(false)
    }

    return (
        <ScrollView style={styles.containerScrollViewHorizontal} horizontal={true} showsHorizontalScrollIndicator={false}>
           
            {images.map((image, index) => (
                <TouchableOpacity onPress={() => viewImage(image.uri)} key={index}>
                    <Image
                        resizeMode="cover"
                        resizeMethod="scale"
                        style={{
                            width: Platform.OS  === 'ios' ? 240 : 220,
                            height: Platform.OS  === 'ios' ? 240 : 220, 
                            borderRadius:10, 
                            margin:10,
                            marginHorizontal:10, 
                        }}
                        source={{uri: image.uri ? image.uri : image}}
                    />
            
                    <IconButton onPress={() => removeImage(image.uri, index)} icon='close-circle' color={'#9B9B9B'} size={35} style={{position:'absolute', margin:1, backgroundColor:'#FFF', borderRadius:100, borderColor:'#c5c5c5'}}/>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.buttonSecondaryAddImage} onPress={addNew}>
                <FontAwesomeIcons name="plus" size={50} color="#9B9B9B" />
            </TouchableOpacity>
        </ScrollView>
    )
}