import firestore from '@react-native-firebase/firestore';
import { GetSupportData } from '../Types/SupportData.types';


export const getSupportsGroup=async()=>{
    return await firestore().collection('Support').get().then(snapshot=>{
        const supportData=snapshot.docs.map(data=>data.data() as GetSupportData)
        return supportData;
    }).catch(error=>{
        console.log(error)
        return [] as GetSupportData[];
    })
}