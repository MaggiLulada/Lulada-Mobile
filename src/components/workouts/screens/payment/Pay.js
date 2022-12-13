import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'
import { Alert, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { Appbar, Subheading } from 'react-native-paper';
import WebView from 'react-native-webview'
import { useSelector } from 'react-redux';
import { getUser, languageActual } from '../../../../redux/User/UserSlice';
import { addData, addDataSubcollection, addDocument, updateDocument } from '../../../../utils/queriesDatabase';
import ButtonPrimary from '../../../buttons/ButtonPrimary';

const Pay = ({dataPay, close}) => {

    const navigation = useNavigation()
    const user = useSelector(getUser)
    const [prog, setProg] = useState(false);
    const [progClr, setProgClr] = useState('#000');
    const [titleWeb, setTitleWeb] = useState({
        title:'',
        url:''
    })
    const [statusPay, setStatusPay] = useState([])
    const [pay, setPay] = useState([])
    const webviewRef = useRef();

    
    
    const onMessage = async(e) => {
        try {
            const data = JSON.parse(e.nativeEvent.data)
            setPay(data)
            const status = data.status
            const language = await AsyncStorage.getItem('user-language')
            if (status == 'COMPLETED') {
                const purchaseInfo = data.purchase_units
                const finalPurchase = purchaseInfo[0]
                Alert.alert('', JSON.stringify(finalPurchase))
                addData('Payments', {
                    ...data,
                    workout:dataPay.workout,
                    workout_schedule:dataPay.id,
                    payer_info: user,
                    
                }).then((res) => {
                    res.type == true && (
                        axios.post('https://us-central1-lulada-a38cb.cloudfunctions.net/generatePDFInvoice', {
                            user_info: user,
                            data: dataPay,
                            purchase_info: finalPurchase,
                            date: data.creation_time,
                            id: data.id
                        }).then((response) => {
                            console.log(response)
                        })
                      
                    )
                    axios.post('https://us-central1-lulada-a38cb.cloudfunctions.net/notificationsInstructor-userEnrolledWorkout', {
                        id:dataPay.id,
                        language:language,
                        payer_info: user,
                        extra: dataPay
                    }).then((response) => {
                        console.log(response)
                    })
                })
            }
        } catch (error) {
            Alert.alert('Try again', 'try again')
        }
        
    }


    const navigationChange = (webState) => {
        console.log(webState)
        setTitleWeb({
            title:webState.title,
            url:webState.url
        })
    }

    const INJECTED_JAVASCRIPT = `setTimeout(function() { 
        window.postMessage({
            type: 'paypal',
            cost:${dataPay.cost.toString()},
            instructor_email:"camilobastidas1996@gmail.com"
        })
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
    `;

    return (
       <View style={{flex:1}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={close} />
                <Appbar.Content title="Pay"/>
            </Appbar.Header>
       
            <WebView
                ref={(ref) => {webviewRef.current = ref}}
                source={{ uri: 'https://lulada-a38cb.web.app/' }}
                style={{flex:1}}
                onMessage={onMessage}
                onNavigationStateChange={navigationChange}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onLoadProgress={() => {
                    setProg(true);
                    setProgClr('#00457C');
                }}
                cacheEnabled={false}
                cacheMode='LOAD_NO_CACHE'
                pullToRefreshEnabled={true}
            />
        </View>
    )
}

export default Pay