import firestore from "@react-native-firebase/firestore";

export const getDataUser = (userId) => {
  return new Promise(async(resolve, reject) => {
      try{
        await firestore().collection('Users').doc(userId).get()
        .then(doc => {
          resolve(doc.data())
        })
      }catch (e) {
        reject({ text: e.message, type: false })
      }
  });
}

export const updateUser = (userId, data) => {
  return new Promise(async(resolve, reject) => {
      try{
        await firestore().collection('Users').doc(userId).update(data)
        .then(() => {
          resolve({ text: 'Se actualizo correctamente', type: true })
        })
      }catch (e) {
        reject({ text: e.message, type: false })
      }
  });
}