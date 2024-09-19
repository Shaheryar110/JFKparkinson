import {Image, StyleSheet, Text, View, Dimensions, Linking} from 'react-native';
import React from 'react';
import {colors, fonts, images} from '../constant';
import AuthButton from './AuthButton';
import {Button, useTheme} from 'react-native-paper';

type Props = {
  heading: string;
  text: string;
  url: string;
};
const {width, height} = Dimensions.get('window');
const PeopleInTheNewsCards: React.FunctionComponent<Props> = ({
  heading,
  text,
  url,
}) => {
  const theme = useTheme();
  return (
    <View style={styles.contanier}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.content}>{text}</Text>
      <Button
        mode="elevated"
        style={{width: 150, marginVertical: 10}}
        textColor={colors.white}
        buttonColor={theme.colors.tertiary}
        onPress={() => Linking.openURL(url)}>
        Click here
      </Button>
    </View>
  );
};

export default PeopleInTheNewsCards;

const styles = StyleSheet.create({
  image: {
    height: height / 3.5,
    borderRadius: 20,
    width: width * 0.95,
    alignSelf: 'center',
    marginVertical: 10,
  },
  heading: {
    ...fonts.homeHeading,
    color: colors.black,
  },
  content: {
    ...fonts.TouchableText,
    color: colors.black,
  },
  contanier: {
    margin: 10,
  },
});
