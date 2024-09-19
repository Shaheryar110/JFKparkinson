import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Back, Design} from '../../assets/svg';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../constant';
import {Block, Loading, VedioCard} from '../components';
import {ArticlesNavigationType} from '../Types/NavigationTypes.types';
import {getArticals} from '../services/Articals';
import {GetArticalResponse} from '../Types/Articals';

const Articals: React.FunctionComponent = () => {
  const theme = useTheme();
  const navigation = useNavigation<ArticlesNavigationType['navigation']>();
  const [articals, setArticals] = useState<GetArticalResponse[] | []>([]);

  useEffect(() => {
    getArticals().then((data: GetArticalResponse[]) => {
      setArticals(data);
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
            <Text style={styles.text}>Articals</Text>
          </View>
        </View>
      </View>
      <Block>
        {articals.length > 0 ? (
          articals.map((item, index) => {
            return (
              <Pressable
                onPress={() => navigation.navigate('Article', {details: item})}
                key={index}>
                <VedioCard heading={item.heading} />
              </Pressable>
            );
          })
        ) : (
          <Loading />
        )}
      </Block>
    </>
  );
};

export default Articals;

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
