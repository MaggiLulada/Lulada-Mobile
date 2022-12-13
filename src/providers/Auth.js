import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {
    
  const [user, setUser] = useState(null);
  const currentUser = auth().currentUser;

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        setUser,
       
        logout: async () => {
            try {
                await auth().signOut();
            } catch (e) {
                console.log(e);
            }
        },
        }}
    >
      {children}
    </AuthContext.Provider>
  );
};