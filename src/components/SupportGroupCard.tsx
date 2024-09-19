import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import {fonts, images} from '../constant';
import {useTheme} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

type Props = {
  heading: string;
};
const SupportGroupCard: React.FunctionComponent<Props> = ({heading}) => {
  const theme = useTheme();
  return (
    <View style={styles.contanier}>
      <Image source={images.healing} style={styles.image} />
      <Text style={[styles.text, {color: theme.colors.scrim}]}>{heading}</Text>
    </View>
  );
};

export default SupportGroupCard;

const styles = StyleSheet.create({
  image: {
    width: width * 0.44,
    height: height / 5.5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    ...fonts.cardHeading,
    width: width * 0.44,
  },
  contanier: {
    margin: 8,
  },
});
