import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../constant';

type props = {
  text: string;
};
const EmptyText: React.FunctionComponent<props> = ({text}) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default EmptyText;

const styles = StyleSheet.create({
  text: {
    ...fonts.cardHeading,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
