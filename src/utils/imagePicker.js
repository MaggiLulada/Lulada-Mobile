import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export const chooseImage = (type, limit) => {

    const options = {
        camera:{
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 700,
            maxHeight: 700,
            selectionLimit: limit,
        },
        library:{
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 700,
            maxHeight: 700,
            selectionLimit: limit,
        }
    }
    

    if (type === 'launchCamera') {
        return new Promise (async( resolve, reject ) => {
            try{
                await launchCamera(options.camera)
                .then(result => {
                    resolve(result);
                })
            } catch ( e ) {
              reject(e);
            }
        })
    } else if (type === 'launchLibrary') {
        return new Promise (async( resolve, reject ) => {
            try{
                await launchImageLibrary(options.library)
                .then(result => {
                    resolve(result);
                })
            } catch ( e ) {
              reject(e);
            }
        })
    }

};
