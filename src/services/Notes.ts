import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GetNotesDataType } from '../Types/Notes.types';
export const addNotesToFirestore = async(title:string,description:string,user:FirebaseAuthTypes.User|null)=>{
    return await firestore().collection('Notes').doc().set({
        title:title,
        description:description,
        createdAt:firestore.Timestamp.now(),
        userUid:user?.uid,
    })
}

export const getNotesFromFirestore=async(uid:string)=>{
    return await firestore().collection('Notes').where('userUid', '==',uid).get().then((snapshot)=>{
        const notes=snapshot.docs.map(data=>data.data() as GetNotesDataType )
        return notes;
    }).catch(error=>{
        console.log(error)
        return [] as GetNotesDataType []
    })
}