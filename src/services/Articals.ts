import firestore from '@react-native-firebase/firestore';
import { GetArticalResponse } from '../Types/Articals';

export const getArticals=async()=>{
    return firestore().collection("Articals").get().then((snapshot)=>{
        const articals=snapshot.docs.map(data=>data.data() as GetArticalResponse)
        return articals;
    })
    .catch(error=>{
        console.log(error);
        return [ ] as GetArticalResponse[];
    })
}