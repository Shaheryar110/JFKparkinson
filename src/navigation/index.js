import React, {useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useUserContext} from '../context/UserContex';
import auth from '@react-native-firebase/auth';
import {StyleSheet, View, Image} from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {useDrawerContext} from '../context/DrawerContex';
import {useLoadingContext} from '../context/LoadingContext';
import {BlurView} from '@react-native-community/blur';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../utils/toastConfig';
import {images} from '../constant';

export default AppContainer = ({theme}) => {
  const {user, setUser} = useUserContext();
  const {isOpen} = useDrawerContext();
  const {loading, setLoading} = useLoadingContext();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(_userAuth);
    return subscriber; // unsubscribe on unmount
  }, []);

  const _userAuth = async cred => {
    setLoading(true);
    if (!cred?.uid) setUser();
    else {
      setUser(cred);
    }

    setLoading(false);
  };

  return (
    <>
      <NavigationContainer theme={theme}>
        {isOpen && <DrawerNavigator />}

        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      {loading && (
        <>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.container}>
            <Image source={images.logoGif} style={styles.gif} />
          </View>
        </>
      )}
      <Toast position="bottom" config={toastConfig} />
    </>
  );
};
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '30%',
  },
  gif: {
    width: 200,
    height: 200,
  },
});
