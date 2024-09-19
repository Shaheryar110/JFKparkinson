import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';
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
  date: string;
  title: string;
  time: string;
  onPress: () => void;
};

const MeetingCard: React.FunctionComponent<props> = ({
  date,
  time,
  title,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[styles.contanier, {borderColor: theme.colors.outline}]}
        entering={BounceInRight.duration(1000)}
        exiting={FadeOutLeft.duration(1000).easing(Easing.linear)}>
        <Image source={images.healing} style={styles.image}></Image>
        <View>
          <Text style={[styles.date, {color: theme.colors.primary}]}>
            {date}
          </Text>
          <Text style={[styles.time, {color: theme.colors.shadow}]}>
            {time}
          </Text>
          <Text
            style={[styles.title, {color: theme.colors.scrim}]}
            numberOfLines={2}>
            {title}
          </Text>
          <TouchableText
            text="Registar >>"
            alignSelf="flex-start"
            color={theme.colors.primary}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default MeetingCard;

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
  date: {
    ...fonts.TouchableText,
    marginTop: 10,
    marginLeft: 10,
  },
  time: {
    ...fonts.TouchableText,
    marginLeft: 10,
  },
  title: {
    ...fonts.cardHeading,
    maxWidth: width * 0.45,
    marginLeft: 10,
  },
});
