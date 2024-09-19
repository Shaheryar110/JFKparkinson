import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {Back, DrawerIcon, NotificationIcon} from '../../assets/svg';
import {colors, fonts} from '../constant';
import {useDrawerContext} from '../context/DrawerContex';
import {useNavigation} from '@react-navigation/native';
import {NotificationsNavigationType} from '../Types/NavigationTypes.types';
type Props = {
  title: string;
  backButton?: boolean;
};
const Header: React.FunctionComponent<Props> = ({title, backButton}) => {
  const theme = useTheme();
  const {setIsOpen} = useDrawerContext();
  const navigation = useNavigation<NotificationsNavigationType['navigation']>();
  return (
    <View
      style={[
        styles.contanier,
        {
          backgroundColor: theme.colors.tertiary,
          shadowColor: theme.colors.tertiary,
        },
      ]}>
      <View style={styles.inner}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => (backButton ? navigation.goBack() : setIsOpen(true))}>
          {backButton ? (
            <Back fill={theme.colors.onSecondary} />
          ) : (
            <DrawerIcon />
          )}
        </TouchableOpacity>
        <Text style={[styles.text, {color: theme.colors.onSecondary}]}>
          {title}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Notifications')}>
        <NotificationIcon fill={theme.colors.onSecondary} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  contanier: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    padding: 20,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  text: {
    ...fonts.headerHeading,
    marginLeft: 10,
    textAlignVertical: 'bottom',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
