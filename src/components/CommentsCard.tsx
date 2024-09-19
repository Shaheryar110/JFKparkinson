import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {fonts, images} from '../constant';
import {useTheme} from 'react-native-paper';

type props = {};
const {width} = Dimensions.get('window');
const CommentsCard: React.FunctionComponent<props> = () => {
  const theme = useTheme();
  return (
    <View style={styles.contanier}>
      <Image source={images.image1} style={styles.profileImage} />
      <View
        style={[
          styles.commentsContanier,
          {backgroundColor: theme.colors.onSecondary},
        ]}>
        <View style={styles.name}>
          <Text style={styles.userText}>Username</Text>
          <Text style={styles.time}>just now</Text>
        </View>
        <Text>reply</Text>
      </View>
    </View>
  );
};

export default CommentsCard;

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userText: {
    ...fonts.AuthInput,
  },
  contanier: {flexDirection: 'row', margin: 10},
  commentsContanier: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: width * 0.7,
    elevation: 5,
  },
  name: {flexDirection: 'row', alignItems: 'center'},
  time: {
    ...fonts.TouchableText,
    marginHorizontal: 10,
  },
});
