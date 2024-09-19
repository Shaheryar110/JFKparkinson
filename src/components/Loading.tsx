import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../constant';

const Loading: React.FunctionComponent = () => {
  return <Image source={images.logoGif} style={styles.logo} />;
};

export default Loading;

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
});
