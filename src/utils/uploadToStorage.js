import { Platform } from 'react-native';
import storage from '@react-native-firebase/storage';


export const uploadToStorage = (files, routeSave) => {
    
    return new Promise (async( resolve, reject ) => {
        try{
            const promises = [];
            const urls = [];
            files.map((file) => {
                console.log(file, 'fileeeeeee')
                const uri = file.uri;
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : file.uri;
                const fileRef = storage().ref(`${routeSave}/${file.fileName}`)
                const task = fileRef.putFile(uploadUri);
                promises.push(task);
                task.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                        console.log(`Upload is ${file.fileName} ` + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log(`Progress: ${progress}%`);
                                
                                break;
                        }
                    },
                )
                Promise.all(promises).then(async () => {
                    const downloadUrl = await task.snapshot.ref.getDownloadURL();
                    urls.push(downloadUrl);
                    if(urls.length === files.length) {
                        resolve({text: 'success', type: true, data: urls});
                    }
                })
                
            })
        }catch (e) {
            reject(e);
        }
    })
}