import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../constant';
import {useTheme} from 'react-native-paper';
import {Back, DrawerIcon} from '../../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {useDrawerContext} from '../context/DrawerContex';
type props = {
  pageName: string;
  isDrawer: boolean;
};

const BackButton: React.FunctionComponent<props> = ({pageName, isDrawer}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {isOpen, setIsOpen} = useDrawerContext();
  return (
    <Pressable
      style={styles.constanier}
      onPress={() => {
        if (isDrawer) {
          setIsOpen(true);
          return;
        }
        if (navigation.canGoBack()) navigation.goBack();
      }}>
      {isDrawer ? (
        <DrawerIcon />
      ) : (
        <Back width={30} height={30} fill={theme.colors.onSecondary} />
      )}

      <Text style={[styles.text, {color: theme.colors.onSecondary}]}>
        {pageName}
      </Text>
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  text: {
    ...fonts.screenHeading,
    marginLeft: 20,
    marginTop: 5,
  },
  constanier: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
