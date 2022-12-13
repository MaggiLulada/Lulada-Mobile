import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Dimensions} from 'react-native'
import { IconButton, useTheme } from 'react-native-paper';
import ButtonPrimary from '../buttons/ButtonPrimary';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const ModalSimple = ({visible, children, size, close}) => {

    const [dimensions, setDimensions] = useState({ window, screen });
    const {colors} = useTheme()

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
          "change",
          ({ window, screen }) => {
            setDimensions({ window, screen });
          }
        );
        return () => subscription?.remove();
    });

    const sizeModal = (size) => {
        switch(size){
            case 'small':
                return {
                    width: '40%',
                }
            case 'medium':
                return {
                    width: '60%',
                }
            case 'large':
                return {
                    width: '80%',
                }
        }
    }

    return (
        
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
        }}>
            <Modal
                transparent={true}
                visible={visible}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#00000080'
                }}>
                    
                    <View style={{
                        backgroundColor: "white",
                        borderRadius: 20,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        ...sizeModal(size),
                    }}>
                        <View style={{flexDirection:'row-reverse', position:'absolute', width:size ? '110%' : '90%', top:-28, }}>
                            <IconButton
                                icon='close'
                                color={colors.accent}
                                onPress={close}
                                size={30}
                                style={{backgroundColor:colors.primary}}
                            />
                        </View>
                        <View style={{marginTop:'5%', marginBottom:'5%'}}>
                            {children}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
        
    )
}

export default ModalSimple