import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {Image} from 'react-native';
import {colors, fonts, images} from '../constant';
import Animated, {
  BounceInRight,
  Easing,
  FadeOutLeft,
} from 'react-native-reanimated';
import TouchableText from './TouchableText';
const {width, height} = Dimensions.get('window');
type props = {
  title: string;
  time: string;
  onPress: () => void;
  source: ImageSourcePropType;
  index: number;
};

const DoctorsCard: React.FunctionComponent<props> = ({
  time,
  title,
  onPress,
  source,
  index,
}) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[styles.contanier, {borderColor: theme.colors.outline}]}
        entering={BounceInRight.duration(500 * (index + 1))}
        exiting={FadeOutLeft.duration(1000).easing(Easing.linear)}>
        <Image
          source={
            source
              ? typeof source === 'number'
                ? source
                : {uri: source}
              : images.gindolce
          }
          style={styles.image}></Image>
        <View>
          <Text
            style={[styles.title, {color: theme.colors.scrim}]}
            numberOfLines={2}>
            {title}
          </Text>
          <Text style={[styles.time, {color: theme.colors.shadow}]}>
            {time}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default DoctorsCard;

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: width * 0.37,
    height: width * 0.37,
    borderRadius: 20,
  },

  time: {
    ...fonts.TouchableText,
    marginLeft: 10,
    maxWidth: width * 0.45,
  },
  title: {
    ...fonts.cardHeading,
    maxWidth: width * 0.45,
    marginLeft: 10,
    marginTop: 10,
  },
});
