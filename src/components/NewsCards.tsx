import {StyleSheet, Text, View, Image, Dimensions, Linking} from 'react-native';
import React from 'react';
import {Button, Surface, useTheme} from 'react-native-paper';
import {colors, fonts, images} from '../constant';

type props = {
  heading: string;
  source: string;
  link: string;
};
const {width} = Dimensions.get('window');
const NewsCards: React.FunctionComponent<props> = ({heading, source, link}) => {
  const theme = useTheme();

  return (
    <Surface style={styles.contanier}>
      <View style={styles.inner}>
        <Text style={styles.text} numberOfLines={3}>
          {heading}
        </Text>
        <Button
          mode="elevated"
          textColor={theme.colors.onSecondary}
          style={{backgroundColor: theme.colors.primary}}
          onPress={() => Linking.openURL(link)}>
          Click Here
        </Button>
      </View>
      <Image
        source={
          source
            ? typeof source === 'number'
              ? source
              : {uri: source}
            : images.profileImage
        }
        style={styles.image}
      />
    </Surface>
  );
};

export default NewsCards;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  inner: {
    justifyContent: 'space-between',
  },
  text: {
    ...fonts.cardHeading,
    color: colors.black,
    width: width * 0.5,
  },
});
