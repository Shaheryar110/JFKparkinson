import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {fonts, images} from '../constant';
import {useTheme} from 'react-native-paper';

type props = {
  heading: string;
};
const {width, height} = Dimensions.get('window');
const VedioCard: React.FunctionComponent<props> = ({heading}) => {
  const theme = useTheme();
  return (
    <View style={styles.contanier}>
      <Image
        source={images.gindolce}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.inner}>
        <Text
          style={[styles.heading, {color: theme.colors.scrim}]}
          numberOfLines={3}>
          {heading}
        </Text>
      </View>
    </View>
  );
};

export default VedioCard;

const styles = StyleSheet.create({
  image: {
    height: height / 5,
    borderRadius: 20,
    width: width * 0.95,
  },
  contanier: {
    alignItems: 'center',
    margin: 10,
  },
  heading: {
    ...fonts.eventDetailsHeading,
    marginHorizontal: 10,
    maxWidth: width * 0.8,
  },
  inner: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});
