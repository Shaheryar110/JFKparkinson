import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Comments,
  CreateNote,
  EventDetails,
  LatestNews,
  Notes,
  Notifications,
  Onboarding,
  PeopleInTheNews,
  Profile,
  Story,
  SupportsGroup,
  TermsAndConditions,
  ZoomRecordings,
} from '../screens';
import {
  HomeNavigationType,
  RootStackParamsApp,
} from '../Types/NavigationTypes.types';
import BottomTab from './BottomTabNavigator';
import CreateStories from '../screens/CreateStory';
import PrivacyPolicy from '../screens/PravicyPolicy';
import Articles from '../screens/Articles';
import Article from '../screens/Article';
import CreatePost from '../screens/CreatePost';
import {
  onDisplayNotification,
  saveNotification,
} from '../services/Notifications';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../context/UserContex';

const Stack = createNativeStackNavigator<RootStackParamsApp>();

const AppNavigator = () => {
  const {user} = useUserContext();
  const navigation = useNavigation<HomeNavigationType['navigation']>();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (
        remoteMessage.notification?.title &&
        remoteMessage.notification?.body &&
        remoteMessage?.data?.id
      )
        onDisplayNotification(
          remoteMessage.notification?.title,
          remoteMessage.notification?.body,
          remoteMessage?.data?.id,
        );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data?.id) {
        navigation.navigate('EventDetails', {
          id: `${remoteMessage?.data.id}`,
        });
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          if (remoteMessage?.data?.id)
            navigation.navigate('EventDetails', {
              id: `${remoteMessage?.data.id}`,
            });
        }
      });
  }, []);
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          if (
            detail.notification?.data?.id &&
            user &&
            detail.notification?.title &&
            detail.notification?.body
          )
            saveNotification(
              user,
              detail.notification?.title,
              detail.notification?.body,
              `${detail.notification?.data.id}`,
            );
          break;
        case EventType.PRESS:
          if (detail.notification?.data?.id)
            navigation.navigate('EventDetails', {
              id: `${detail.notification?.data.id}`,
            });
          console.log(detail.notification?.data);
          break;
      }
    });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 1000,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTab} />

      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateStory" component={CreateStories} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="ZoomRecordings" component={ZoomRecordings} />
      <Stack.Screen name="Articles" component={Articles} />
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="SupportsGroup" component={SupportsGroup} />
      <Stack.Screen name="PeopleInTheNews" component={PeopleInTheNews} />
      <Stack.Screen name="LatestNews" component={LatestNews} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
