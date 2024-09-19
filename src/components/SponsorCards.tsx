import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {colors} from '../constant';
const {width, height} = Dimensions.get('window');
const SponsorCards: React.FunctionComponent = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.contanier,
        {
          borderColor: theme.colors.outlineVariant,
          backgroundColor: theme.colors.onSecondary,
        },
      ]}>
      <Text>SponsorCard</Text>
    </View>
  );
};

export default SponsorCards;

const styles = StyleSheet.create({
  contanier: {
    borderWidth: 0.5,
    width: width / 4,
    height: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginTop: 16,
    marginRight: '7.5%',
  },
});
