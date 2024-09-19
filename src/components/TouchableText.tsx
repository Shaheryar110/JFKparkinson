import {ColorValue, FlexStyle, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useTheme} from 'react-native-paper';
import {fonts} from '../constant';
type props = {
  text: string;
  alignSelf: FlexStyle['alignSelf'];
  onPress?: () => void;
  color?: ColorValue;
};
const TouchableText: React.FunctionComponent<props> = ({
  text,
  alignSelf,
  onPress,
  color,
}) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Animated.Text
        entering={FadeInDown.duration(1000)}
        style={[
          styles.text,
          {color: color ? color : theme.colors.tertiary, alignSelf: alignSelf},
        ]}>
        {text}
      </Animated.Text>
    </Pressable>
  );
};

export default TouchableText;

const styles = StyleSheet.create({
  text: {
    ...fonts.TouchableText,

    margin: 10,
  },
});
