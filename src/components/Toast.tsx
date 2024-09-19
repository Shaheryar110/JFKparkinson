import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import {colors} from '../constant';

interface ToastLayoutProps {
  text1: string;
  text2: string;
}

const ToastLayout: React.FC<ToastLayoutProps> = ({text1, text2}) => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor:
      Platform.OS === 'ios'
        ? 'rgba(28, 28, 28,0.7)'
        : 'rgba(235, 236, 237,0.7)',
    borderRadius: 36,
    padding: 20,
    marginHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 12,
    color: Platform.OS === 'ios' ? colors.white : colors.black,
    textAlign: 'center',
  },
  text2: {
    fontSize: 12,
    color: '#ffffff',
  },
});

export default ToastLayout;
