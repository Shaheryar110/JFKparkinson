import firestore from '@react-native-firebase/firestore';
import { ImageSourcePropType } from 'react-native';

export const getDoctorsData=async() =>
{
    return await  firestore().collection('Doctors').get().then((snapshot) => {
        const users = snapshot.docs.map((doc) => doc.data() as DoctorsDataResponse);
        return users;
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        return [] as DoctorsDataResponse[];
      });

}


export type DoctorsDataResponse={
    details: string, 
    image:ImageSourcePropType,
    name: string,
}