import React from 'react'
import { View } from 'react-native'
import { List } from 'react-native-paper'
import { chooseImage } from '../../utils/imagePicker'


const ListOptionsMultimedia = ({data, setData, close, t, limit}) => (
    

    optionsList = [
        {title: t('common:take_photo'), icon:'camera-plus', function:'launchCamera'},
        {title: t('common:choose_photo'), icon:'image-multiple', function:'launchLibrary'},
    ],

    optionsList.map((option, index) => {

        const selectOption = (util) => {
            switch(util){
                case 'launchCamera':
                    chooseImage('launchCamera', limit).then(image => {
                        const newData = [...data, ...image?.assets]
                        console.log(newData)
                        setData(newData)
                        close()
                    })
                    break;
                case 'launchLibrary':
                    chooseImage('launchLibrary', limit).then(images => {
                        const newData = [...data, ...images?.assets]
                        console.log(newData)
                        setData(newData)
                        close()
                    })
                    break;
                default:
                    console.log('default');
            }
        }

        return(
            <View key={index}>
                <List.Item
                    onPress={() => selectOption(option.function)}
                    title={option.title}
                    left={props => <List.Icon {...props} icon={option.icon} />}
                />
            </View>
        )
    })
    
)

export default ListOptionsMultimedia