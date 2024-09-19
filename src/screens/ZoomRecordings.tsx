import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Back, Design} from '../../assets/svg';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../constant';
import {Block, VedioCard} from '../components';

const ZoomRecordings: React.FunctionComponent = () => {
  const theme = useTheme();
  const navigation = useNavigation();
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
            <Text style={styles.text}>Recordings</Text>
          </View>
        </View>
      </View>
      <Block>
        <VedioCard />
        <VedioCard />
        <VedioCard />
        <VedioCard />
        <VedioCard />
      </Block>
    </>
  );
};

export default ZoomRecordings;

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
