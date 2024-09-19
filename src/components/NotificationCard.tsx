import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, fonts, images} from '../constant';
import {useTheme} from 'react-native-paper';
import {convertToDate, formatDate} from '../utils/date';
const {width} = Dimensions.get('window');
type props = {
  title: string;
  body: string;
  onPress: () => void;
  time: number;
};
const NotificationCard: React.FunctionComponent<props> = ({
  title,
  body,
  onPress,
  time,
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.contanier}>
        <View>
          <Text style={[styles.notificationText, {color: theme.colors.scrim}]}>
            {title}
          </Text>
          <Text style={styles.content} numberOfLines={2}>
            {body}
          </Text>
          <Text style={styles.time}>{formatDate(time)}</Text>
        </View>
      </View>
      <View style={[styles.line, {backgroundColor: theme.colors.outline}]} />
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  contanier: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  content: {
    ...fonts.TouchableText,
    maxWidth: width * 0.8,
  },
  notificationText: {
    ...fonts.cardHeading,
    maxWidth: width * 0.8,
  },
  time: {
    ...fonts.smallText,
  },
  line: {
    height: 1,
    width: 0.9 * width,
    alignSelf: 'center',
  },
});
