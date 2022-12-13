import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Subheading, Text, useTheme } from 'react-native-paper'
import { t } from 'i18next'

const ShowMore = ({text, style, characters}) => {

    const {colors} = useTheme()
    const [showMore, setShowMore] = useState(false)

    return (
        <View style={{flex:1,}}>
            <Text style={style}>
                {showMore ? text : `${text.substring(0, characters)}`}  
                <Text style={{alignSelf:'center', color:colors.primary}} onPress={() => setShowMore(!showMore)}>
                    {showMore ? t('common:show_less') : t('common:show_more')}
                </Text>
            </Text>
        </View>
    )
}

export default ShowMore