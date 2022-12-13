import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapViewSearch from '../../components/maps/MapViewSearch'
import ConnectionStatus from '../../components/others/ConnectionStatus'
import { statusConnection } from '../../redux/User/UserSlice'
import NetInfo from "@react-native-community/netinfo";
import { connection } from '../../redux/User/UserSlice'

export default function Home(props) {

  const dispatch = useDispatch()
  const statusNetwork = useSelector(statusConnection)

  const unsubscribe = NetInfo.addEventListener(state => {
    dispatch(connection(state))
  });

  unsubscribe()

  return (
    <MapViewSearch date={props.date} screen={props.route.name}/>
  )
}