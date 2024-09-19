import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constant';

type props = {
  color: string;
  text: string;
  heading: string;
};

const {width} = Dimensions.get('window');
const Note: React.FunctionComponent<props> = ({color, text, heading}) => {
  return (
    <View
      style={[styles.contanier, {shadowColor: color, backgroundColor: color}]}>
      <Text style={styles.text}>{heading}</Text>
      <Text style={styles.descrip}>{text}</Text>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  contanier: {
    width: width * 0.9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    alignSelf: 'center',
    margin: 10,
    padding: 10,
  },
  text: {
    ...fonts.headerHeading,
    color: colors.black,
  },
  descrip: {
    ...fonts.eventDetailsText,
  },
});
