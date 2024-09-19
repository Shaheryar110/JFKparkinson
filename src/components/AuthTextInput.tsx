import {
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardTypeOptions,
} from 'react-native';
import React from 'react';
import {HelperText, Surface, useTheme} from 'react-native-paper';
import {fonts} from '../constant';
import Animated, {Easing, FadeInDown} from 'react-native-reanimated';
import * as icon from '../../assets/svg';
interface Props {
  placeholder: string;
  name: string;
  secureTextEntry?: boolean;
  onPress?: () => void;
  KeyboardType?: KeyboardTypeOptions;
  onChangeText: (e: string) => void;
  visible?: boolean;
  errorText?: string;
}
const AuthTextInput: React.FunctionComponent<Props> = ({
  placeholder,
  name,
  secureTextEntry,
  onPress,
  KeyboardType,
  onChangeText,
  visible,
  errorText,
}) => {
  const theme = useTheme();
  const Icon = icon[name];
  return (
    <Animated.View entering={FadeInDown.duration(1000).easing(Easing.linear)}>
      <Surface
        elevation={1}
        style={[styles.contanier, {backgroundColor: theme.colors.onSecondary}]}>
        <TextInput
          style={styles.input}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          selectionColor={theme.colors.tertiary}
          placeholderTextColor={theme.colors.onPrimary}
          keyboardType={KeyboardType}
          onChangeText={onChangeText}
        />
        <Pressable onPress={onPress}>
          <Icon width={20} height={20} />
        </Pressable>
      </Surface>
      <HelperText
        type="error"
        visible={visible}
        padding="none"
        style={styles.helper}>
        {errorText}
      </HelperText>
    </Animated.View>
  );
};

export default AuthTextInput;

const styles = StyleSheet.create({
  contanier: {
    marginVertical: 12,
    marginHorizontal: 32,
    borderRadius: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    ...fonts.AuthInput,
    height: 55,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    letterSpacing: 1.1,
  },
  helper: {marginHorizontal: 45},
});
