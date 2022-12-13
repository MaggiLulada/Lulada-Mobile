import React from 'react'
import { Image } from 'react-native'
import { List, Title } from 'react-native-paper'
import { color } from 'react-native-reanimated'
import { dateRelative, hourLocal } from '../../utils/date'

const CardDetails = ({data, index, styles, onPress, colorText}) => {
    return (
        <List.Item
            key={index}
            style={[Platform.select({
                ios: {
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 3,
                  shadowOpacity: 0.4,
                  elevation: 7,
                },
                android: {
                  elevation: 3,
                }
              }
            ), styles]}
            title={
                <Title style={{color: colorText, fontWeight:'600', fontSize:25}}>{data.name}</Title>
            }
            description={
                <Title 
                    style={{
                        color: colorText, 
                        fontWeight:'400', 
                        fontSize:15
                    }}
                >
                    {`${dateRelative(`${data.date} ${data.start_time}:00`)}, ${data.start_time}`}
                </Title>
            }
            titleNumberOfLines={1}
            right={props => 
                <Image
                    {...props} 
                    source={{uri: data.pictures[0]}}
                    style={{
                        width:80, 
                        height:80,
                        borderRadius:100
                    }} 
                />
            }
            onPress={onPress}
        />
  )
}

export default CardDetails