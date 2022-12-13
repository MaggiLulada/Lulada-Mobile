import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Image,
  Platform,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { styles } from "../../assets/styles/globalStyles";
import { connection, login, logout } from "../../redux/User/UserSlice";
import { getDataUser } from "../../redux/User/Actions";
import { useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

const Splash = ({navigation}) => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(true);

  const unsubscribe = NetInfo.addEventListener(state => {
    dispatch(connection(state))
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });

  unsubscribe()

  
  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      setAnimating(false);
      auth().onAuthStateChanged(async (user) => {
        if (user != null && user.displayName != null && isMounted) {
          getDataUser(user.uid).then((data) => {
            dispatch(login(data));
            navigation.navigate("App");
          }).catch((e) => {
            console.log(e);
            navigation.navigate("Auth");
          })
          setLoading(false);
        } else if (user == null && isMounted) {
          dispatch(logout())
          navigation.navigate("Auth");
        } else {
          dispatch(logout())
          navigation.navigate("Auth");
        }
      })
      return () => {
        isMounted = false;
      }
    }, 4000);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFBA00" }}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/lulada.png")}
          style={{
            width: "70%",
            resizeMode: "contain",
            margin: 30,
          }}
        />
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;