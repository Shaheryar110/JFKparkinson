import firestore from '@react-native-firebase/firestore';
import { GetNewsResponse } from '../Types/News.types';
import { err } from 'react-native-svg/lib/typescript/xml';

export const getNews=async()=>{
    return await firestore().collection("News").get().then((snapshot)=>{
        const news=snapshot.docs.map(doc=>doc.data() as GetNewsResponse)
        return news;
    }).catch(error=>{
        console.log(error);
        return [] as GetNewsResponse [];
    })
}
