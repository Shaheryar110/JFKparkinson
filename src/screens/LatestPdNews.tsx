import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constant';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {Back, Design} from '../../assets/svg';
import {Block, VedioCard} from '../components';
import {HomeNavigationType} from '../Types/NavigationTypes.types';

const LatestPdNews = () => {
  const navigation = useNavigation<HomeNavigationType['navigation']>();
  const theme = useTheme();
  return (
    <>
      <View style={{marginBottom: 90}}>
        <View
          style={[styles.contanier, {backgroundColor: theme.colors.tertiary}]}
        />
        <View style={styles.design}>
          <Design />
        </View>
        <View style={styles.header}>
          <View style={styles.inner}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <Back width={30} height={30} fill={theme.colors.onSecondary} />
            </TouchableOpacity>
            <Text style={styles.text}>Articals</Text>
          </View>
        </View>
      </View>
      <Block>
        <Pressable onPress={() => navigation.navigate('Article')}>
          <VedioCard />
        </Pressable>

        <VedioCard />
        <VedioCard />
        <VedioCard />
        <VedioCard />
      </Block>
    </>
  );
};

export default LatestPdNews;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: '10%',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inner: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...fonts.headerHeading,
    marginLeft: 10,
    color: colors.white,
  },

  contanier: {
    width: 300,
    height: 300,
    borderRadius: 500,
    transform: [{scaleX: 1.5}],
    overflow: 'hidden',
    position: 'absolute',
    top: '-100%',
    left: 45,
  },
  design: {
    transform: [{scaleY: -1}, {rotate: '200 deg'}],
    position: 'absolute',
    top: -170,
    left: -190,
  },
});
