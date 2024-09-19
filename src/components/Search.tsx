import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {SearchIcon} from '../../assets/svg';
import {colors} from '../constant';
type props = {
  placeholder: string;
};
const Search: React.FunctionComponent<props> = ({placeholder}) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.contanier, {backgroundColor: theme.colors.onSecondary}]}>
      <SearchIcon />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        selectionColor={theme.colors.scrim}
        numberOfLines={1}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 30,
  },
  contanier: {
    marginTop: 30,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
