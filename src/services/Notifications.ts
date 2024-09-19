
import notifee, { AndroidImportance, AndroidVisibility, TimestampTrigger, TriggerType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

import {PermissionsAndroid, Platform} from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GetNotification } from '../Types/Notification.types';


export const  onDisplayNotification=async(title:string,body:string,id:string)=> {
    // Request permissions (required for iOS)
    notifee
      .createChannel({
        id: 'default',
        name: 'Default Channel',
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
      })
      .then(channelId =>  notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          
          pressAction: {
            id: 'default',
            
          },
          
        },
        data:{
          id:id
        }
      }));
    // Display a notification
  }

  export const registerDevice=async ()=>{
    await messaging().registerDeviceForRemoteMessages()
    // Get the token
    const token = await messaging().getToken();
    console.log(token)
  }

  export const requestUserPermission=async()=> {
    if(Platform.OS==='ios')
    {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
    else{
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(status=>console.log("status",status))
    }
   
  }

  export const onCreateTriggerNotification=async(date:Date,title:string,body:string)=> {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), 
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: title,
        body: body,
        android: {
          channelId:'default',
        },
      },
      trigger,
    );
  }

  export const saveNotification=async(user:FirebaseAuthTypes.User,title:string,body:string,id:string)=>{
    return await firestore().collection('Notifications').doc().set({
      userId:user.uid,
      title:title,
      body:body,
      id:id,
      createdAt:firestore.FieldValue.serverTimestamp(),
    }).then(()=>{}).catch(error=>console.log(error))
  }

  export const getNotifications=async(user:FirebaseAuthTypes.User)=>{
    return await firestore().collection('Notifications').where("userId",'==',user.uid).get().then((snapshot)=>{
      const notifications=snapshot.docs.map(doc=>({...doc.data(),docId:doc.id} as GetNotification))
      return notifications;
    }).catch((error)=>
    {
      return [] as GetNotification []
    }
    )
  }