import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import * as icons from '../../assets/svg';
interface props {
  name: string;
  color: string;
}
const ProviderLoginButton: React.FunctionComponent<props> = ({name, color}) => {
  const Icon: React.FC = icons[name];
  return (
    <Pressable style={[styles.contanier, {backgroundColor: color}]}>
      <Icon width={40} height={40} />
    </Pressable>
  );
};

export default ProviderLoginButton;

const styles = StyleSheet.create({
  contanier: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    margin: 16,
  },
});
