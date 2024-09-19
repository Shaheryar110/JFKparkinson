import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert, ToastAndroid } from 'react-native';
import { signUpProps } from '../Types/AuthTypes.types';

export const signUp = async (user:signUpProps) => {
    if (!user.name || !user.email?.trim() || !user.password )
      throw new Error('All fields are mandatory.');
  
    return auth()
      .createUserWithEmailAndPassword(user.email.trim(), user.password)
      .then(cred => {
        const {uid} = cred.user;
            auth().currentUser?.updateProfile({
                displayName: user.name,
              });
        
        auth().onAuthStateChanged(usercred => {
          if (usercred && !usercred.emailVerified ) {
            usercred
              .sendEmailVerification()
              .then(() =>
                Alert.alert(
                  'Email Verification sent',
                  'An email verification is sent to your email please check to verify your email.',
                ),
              )
          }
        });
        return uid;
      })
      .then(uid =>
        createUserInDatabase(
          uid,
          user.name,
          user.email?.trim(),
          false,
        ),
      ).catch(err=>console.log(err));;
  };

  export const createUserInDatabase = (
    uid:string,
    fullName:string,
    email:string,
    isPremium:boolean,
  ) => {
    return firestore().collection('users').doc(uid).set({
      uid,
      fullName,
      email,
      createdAt: firestore.FieldValue.serverTimestamp(),
      isPremium,
    });
  };


  export const signOut = async () => {
    try {
      await auth().signOut();
      return console.log('User signed out!');
    } catch (err) {
      return console.log(err);
    }
  };

  export const signIn = async (email :string, password:string) => {
    if (!email || !password) {
      Alert.alert("Email and password is required","Please enter a valid email and password");
      return
    }
    
    return auth().signInWithEmailAndPassword(email?.trim(), password);
  };

  export const sentPasswordResetEmail = async (email:string) => {
    if (!email) Alert.alert('Invalid Email ','Email is required');
    return auth().sendPasswordResetEmail(email);
  };

  export const updateProfilePicture=async (url:string,uid:string)=>{
    if(url!=='')
    {
      return firestore().collection('users').doc(uid).update({
        photoURL:url
      })
    }

  }