import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Block, SupportGroupCard} from '../components';
import {colors, fonts} from '../constant';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Back, Design} from '../../assets/svg';
import {GetSupportData} from '../Types/SupportData.types';
import {getSupportsGroup} from '../services/SupportGroups';

const SupportsGroup: React.FunctionComponent = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [supportData, setSupportData] = useState<GetSupportData[] | []>([]);
  useEffect(() => {
    getSupportsGroup().then(data => {
      setSupportData(data);
    });
  }, []);

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
            <Text style={styles.text}>Support Groups</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={supportData}
        renderItem={item => <SupportGroupCard heading={item?.item?.heading} />}
        keyExtractor={item => `${item.heading}`}
        numColumns={2}
        contentContainerStyle={styles.containerFlatList}
      />
    </>
  );
};

export default SupportsGroup;

const styles = StyleSheet.create({
  containerFlatList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
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
