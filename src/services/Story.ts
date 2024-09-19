import firestore from '@react-native-firebase/firestore';
import { uploadImage } from './Storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GetStoryDataType } from '../Types/Story.types';
import Toast  from 'react-native-toast-message';


export const addStoryToFirestore = async(image:string,title:string,description:string,user:FirebaseAuthTypes.User|null)=>{
    const url=await uploadImage('',image);
    return await firestore().collection('Story').doc().set({
        title:title,
        description:description,
        image:url,
        timestamp:firestore.Timestamp.now(),
        userUid:user?.uid,
    })
}
export const getAllStories = async () => {
    return firestore()
      .collection('Story')
      .get()
      .then((snapshot) => {
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
          } as GetStoryDataType;
        });
  
        return Promise.all(promises);
      })
      .catch((error) => {
        Toast.show({type:'tomatoToast',text1:error?.message})
        return [] as GetStoryDataType[];
      });
  };