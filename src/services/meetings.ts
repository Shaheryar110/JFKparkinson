import firestore from '@react-native-firebase/firestore';
import { ImageSourcePropType } from 'react-native';

export const getMeetings=async(date:string)=>{
    return await firestore().collection('Meetings').where('date','==',date).get().then((snapshot) => {
        const meetings = snapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id } as unknown as GetMeetingResponse));
        return meetings;
      })
      .catch((error) => {
        console.error('Error fetching Meetings:', error);
        return [] as GetMeetingResponse[];
      });
}


export const getMeetingsHome=async(date:string)=>{
    return await firestore().collection('Meetings').where('date','==',date).get().then((snapshot) => {
        const meetings = snapshot.docs.map((doc) => ({...doc.data(),id:doc.id} as GetMeetingResponse));
        return meetings;
      })
      .catch((error) => {
        console.error('Error fetching Meetings:', error);
        return [] as GetMeetingResponse[]; 
      });
}


export const getMeetingDetailsById=async(id:string)=>{
  return await firestore().collection('Meetings').doc(id).get().then((snapshot) => {
    const meetings = ({...snapshot.data(),id:snapshot.id}  as GetMeetingResponse)
    return meetings;
  })
  .catch((error) => {
    console.error('Error fetching Meetings:', error);
    return {} as GetMeetingResponse; 
  });
}
export type GetMeetingResponse ={
    date:string,
    heading:string,
    image:ImageSourcePropType,
    location:string,
    note:string,
    time:string,
    zoomlink:string,
    id:string
} 