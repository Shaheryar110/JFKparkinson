import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {colors, fonts, images} from '../constant';
import {Surface, TouchableRipple} from 'react-native-paper';
interface props {
  width?: number;
  time: string;
  heading: string;
  onPress?: () => void;
  source: ImageSourcePropType;
}

const EventHomeCard: React.FunctionComponent<props> = ({
  width,
  heading,
  time,
  onPress,
  source,
}) => {
  return (
    <TouchableRipple onPress={onPress} style={[styles.ripple, {width: width}]}>
      <Surface elevation={2} style={[styles.contanier, {width: width}]}>
        <ImageBackground
          source={
            source
              ? typeof source === 'number'
                ? source
                : {uri: source}
              : images.profileImage
          }
          style={[styles.innerContanier, {width: width}]}>
          <View style={[styles.back, {width: width}]} />
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.text}>{time}</Text>
        </ImageBackground>
      </Surface>
    </TouchableRipple>
  );
};

export default EventHomeCard;

const styles = StyleSheet.create({
  contanier: {
    overflow: 'hidden',
    backgroundColor: 'black',
    borderRadius: 20,
  },
  innerContanier: {
    width: 270,
    height: 160,
    padding: 10,
  },
  heading: {
    ...fonts.cardHeading,
    color: colors.white,
    marginTop: 50,
  },
  text: {
    ...fonts.TouchableText,
    color: colors.white,
    maxWidth: 200,
  },
  back: {
    backgroundColor: 'black',
    height: 160,
    position: 'absolute',
    opacity: 0.4,
    borderRadius: 20,
  },
  ripple: {
    marginVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
