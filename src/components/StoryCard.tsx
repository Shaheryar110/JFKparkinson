import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fonts, images} from '../constant';
import {TouchableRipple, useTheme} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

type props = {
  onPress?: () => void;
  heading: string;
  userName: string;
  date: string;
  source: string | number;
  profileImage: string | number;
};

const StoryCard: React.FunctionComponent<props> = ({
  onPress,
  heading,
  userName,
  date,
  source,
  profileImage,
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.ripple}
      activeOpacity={0.8}>
      <ImageBackground
        source={
          source
            ? typeof source === 'number'
              ? source
              : {uri: source}
            : images.profileImage
        }
        style={styles.contanier}>
        <View style={styles.layer} />
        <Text
          style={[styles.heading, {color: theme.colors.onError}]}
          numberOfLines={2}>
          {heading}
        </Text>
        <View style={styles.profileContanier}>
          <Image
            source={
              profileImage
                ? typeof profileImage === 'number'
                  ? profileImage
                  : {uri: profileImage}
                : images.profileImage
            }
            style={styles.profileImage}
          />
          <View>
            <Text style={[styles.user, {color: theme.colors.onSecondary}]}>
              {userName}
            </Text>
            <Text style={[styles.date, {color: theme.colors.onSecondary}]}>
              {date}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default StoryCard;

const styles = StyleSheet.create({
  contanier: {
    height: height / 4,
    overflow: 'hidden',
    padding: 12,
    borderRadius: 20,
  },
  heading: {
    ...fonts.homeHeading,
  },
  date: {
    ...fonts.TouchableText,
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  user: {
    ...fonts.cardHeading,
    marginLeft: 10,
  },
  profileContanier: {
    flexDirection: 'row',
    marginTop: 20,
  },
  layer: {
    position: 'absolute',
    backgroundColor: 'black',
    top: 0,
    left: 0,
    opacity: 0.3,
    alignSelf: 'center',
    height: height / 4,
    width: width,
  },
  ripple: {
    margin: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
