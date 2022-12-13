import { View, Text, Platform } from 'react-native'
import React from 'react'
import NotificationControllerAndroid from './NotificationController.android'
import NotificationControllerIos from './NotificationController.ios'

const NotificationController = () => {
    Platform.OS === 'android' ? <NotificationControllerAndroid/> : <NotificationControllerIos/>
}

export default NotificationController