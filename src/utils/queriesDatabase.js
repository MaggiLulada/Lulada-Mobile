import firestore from "@react-native-firebase/firestore";

export const addData = (collection, data) => {
  return new Promise (async( resolve, reject ) => { // Se utiliza para crear un documento
    try{
      await firestore().collection(collection)
        .add(data)
      resolve({ text: 'succesfull', type: true })
    } catch ( e ) {
      reject({ text: e.message, type: false })
    }
  })
}

export const addDataSubcollection = (collection, document, subcollection, data) => {
  return new Promise (async( resolve, reject ) => { // Se utiliza para crear un documento
    try{
      await firestore().collection(collection).doc(document).collection(subcollection)
        .add(data)
      resolve({ text: 'succesfull', type: true })
    } catch ( e ) {
      reject({ text: e.message, type: false })
    }
  })
}

export const addDocument = (collection, document, data) => {
  return new Promise(async(resolve, reject) => {
    try{
      await firestore().collection(collection).doc(document).set(data);
      resolve({text: 'success', type: true});
    }catch (e) {
      reject({ text: e.message, type: false })
    }
  });
}

export const updateDocument = (collection, document, data) => {
  return new Promise(async(resolve, reject) => {
    try{
      await firestore().collection(collection).doc(document).update(data);
      resolve({text: 'success', type: true});
    }catch (e) {
      reject({ text: e.message, type: false })
    }
  });
}

export const deleteDocument = (collection, document) => {
  return new Promise(async(resolve, reject) => {
    try{
      await firestore().collection(collection).doc(document).delete();
      resolve({text: 'success', type: true});
    }catch (e) {
      reject({ text: e.message, type: false })
    }
  });
}