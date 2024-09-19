
import firestore from '@react-native-firebase/firestore';
import { uploadImage } from './Storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GetPostDataType } from '../Types/PostTypes.types';

export const addPostToFirestore = async(image:string | undefined,text:string,user:FirebaseAuthTypes.User|null)=>{
    let url = ''
    
    if(image) url=await uploadImage('',image)
    return await firestore().collection('Post').doc().set({
        text:text,
        image:url,
        timestamp:firestore.Timestamp.now(),
        userUid:user?.uid,
        likes:0,
        comments:0,
        shares:0,
        
    }).then((res)=>{
    //  console.log(res)
    
    }).catch(err => console.error(err))
}

export const getPost=async ()=>{
    return await firestore().collection('Post').get().then((snapshot)=>{
        const promises = snapshot.docs.map(async (doc) => {
            const userSnapshot = await firestore()
              .collection('users')
              .where('uid', '==', doc.data().userUid)
              .get();
            const userData = userSnapshot.docs[0]?.data();
            return {
                ...doc.data(),
                userName: userData?.fullName,
                userProfileImage: userData?.photoURL
              }as GetPostDataType ;
            });
            return Promise.all(promises);
    }) .catch((error) => {
        console.error('Error fetching Stories:', error);
        return [] as GetPostDataType[];
      });
}