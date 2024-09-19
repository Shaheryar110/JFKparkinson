import React, {ReactElement} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Dimensions,
  StatusBar,
  ViewStyle,
  ViewProps,
  FlexStyle,
} from 'react-native';
import {useTheme} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
import {colors} from '../constant';
interface props {
  contentContainerStyle?: ViewStyle;
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexStyle['alignItems'];
  children?: string | JSX.Element | JSX.Element[] | null;
  backgroundColor?: string;
  scrollStyle?: ViewStyle;
  withoutScroll?: boolean;
  navigation?: props;
  viewStyle?: ViewStyle;
}
const Block: React.FunctionComponent<props> = ({
  contentContainerStyle,
  justifyContent,
  alignItems,
  children,
  backgroundColor,
  scrollStyle,
  withoutScroll,
  navigation,
  viewStyle,
}) => {
  const theme = useTheme();
  const externalStyle: ViewStyle = {
    justifyContent: justifyContent || 'flex-start',
    alignItems: alignItems || 'stretch',
    backgroundColor: backgroundColor || theme.colors.background,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={1}
      style={[{flex: 1}, externalStyle]}>
      <StatusBar
        hidden={true}
        barStyle="dark-content"
        translucent={true}
        backgroundColor={theme.colors.background}
      />

      {withoutScroll ? (
        <View style={[viewStyle, {flex: 1}]}>{children}</View>
      ) : (
        <ScrollView
          style={[scrollStyle, {flex: 1}]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[contentContainerStyle, {paddingBottom: 90}]}
          keyboardShouldPersistTaps="never">
          {children}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Block;
