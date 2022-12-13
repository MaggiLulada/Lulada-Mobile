import React, { useState } from 'react'
import { Chip, IconButton, Text, TextInput, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Alert, View} from 'react-native'

const InputTags = ({
    label,
    style,
    underlineColor,
    values,
    error,
    setValues
}) => {

    const {colors} = useTheme()
    const [tags, setTags] = useState(values != [] ? values : [])
    const [input, setInput] = useState('')

    function containsWhitespace(str) {
        return /\s/.test(str);
    }

    const addTag = (text) => {
        setInput(text)
        console.log(containsWhitespace(text))
        if (text !== '' && containsWhitespace(text) == true) {
            setTags([...tags, text])
            setValues([...tags, text])
            setInput('')
        }
    }

    return (

        <>
            <TextInput
                label={label}
                error={error}
                style={style}
                value={input}
                underlineColor={underlineColor}
                onChangeText={(text) => addTag(text)}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {tags.map((tag, index) => (
                    <View key={index} style={{ margin: 5 }}>
                        <Chip 
                            mode='outlined'
                            onClose={() => {
                                setTags(tags.filter((t, i) => i !== index))
                            }}
                            //style={{ backgroundColor:colors.primary+'60' }}
                            closeIcon={() => (<Icon name="close-circle" size={20} color={colors.primary} />)}
                        >
                            {tag}
                        </Chip>
            
                    </View>
                ))}
            </View>

        </>
    
    )
}

export default InputTags