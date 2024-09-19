import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {fonts, images} from '../constant';
import {Back} from '../../assets/svg';
import {useDrawerContext} from '../context/DrawerContex';
import {useNavigation} from '@react-navigation/native';
import {StoryNavigationType} from '../Types/NavigationTypes.types';
const {width, height} = Dimensions.get('window');

const Story: React.FunctionComponent<StoryNavigationType> = ({route}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {setIsOpen} = useDrawerContext();

  return (
    <ImageBackground
      source={
        route.params.image
          ? typeof route.params.image === 'number'
            ? route.params.image
            : {uri: route.params.image}
          : images.profileImage
      }
      style={styles.image}>
      <View
        style={{
          position: 'absolute',
          height: height,
          width: width,
          backgroundColor: 'black',
          opacity: 0.2,
        }}
      />
      <TouchableOpacity
        style={styles.back}
        activeOpacity={0.8}
        onPress={() => navigation?.goBack()}>
        <Back fill={theme.colors.onSecondary} width={30} height={30} />
        <Text style={[styles.headerText, {color: theme.colors.onSecondary}]}>
          Story
        </Text>
      </TouchableOpacity>
      <Text style={[styles.heading, {color: theme.colors.onSecondary}]}>
        {route.params?.heading}
      </Text>

      <ScrollView
        contentContainerStyle={styles.textContanier}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileContanier}>
          <Image
            source={
              route.params.userProfileImage
                ? typeof route.params.userProfileImage === 'number'
                  ? route.params.userProfileImage
                  : {uri: route.params.userProfileImage}
                : images.profileImage
            }
            style={styles.profileImage}
          />
          <View>
            <Text style={[styles.user, {color: theme.colors.scrim}]}>
              {route.params?.userName}
            </Text>
            <Text style={[styles.date, {color: theme.colors.scrim}]}>
              {route.params?.date}
            </Text>
          </View>
        </View>
        <Text style={styles.text}>{route.params?.description}</Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default Story;

const styles = StyleSheet.create({
  image: {
    height: height,
    width: width,
    resizeMode: 'contain',
  },
  textContanier: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    paddingBottom: height / 5,
    minHeight: height * 0.65,
    marginTop: 20,
    elevation: 5,
  },
  back: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    ...fonts.headerHeading,
    marginLeft: 10,
  },
  heading: {
    ...fonts.AuthHeading,
    marginTop: height / 5,
    marginHorizontal: 10,
  },
  date: {
    ...fonts.smallText,
    marginLeft: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
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
  text: {
    ...fonts.TouchableText,
    marginTop: 20,
  },
});
