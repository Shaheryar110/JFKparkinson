import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ForgetPassword, SignIn, SignUp, TermsAndConditions} from '../screens';
import {RootStackParamsAuth} from '../Types/NavigationTypes.types';
import PrivacyPolicy from '../screens/PravicyPolicy';

const Stack = createNativeStackNavigator<RootStackParamsAuth>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
