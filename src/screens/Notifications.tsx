import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, fonts} from '../constant';
import {useTheme} from 'react-native-paper';
import {Back, Design} from '../../assets/svg';
import {Block, NotificationCard} from '../components';
import {useNavigation} from '@react-navigation/native';
import {getNotifications} from '../services/Notifications';
import {useUserContext} from '../context/UserContex';
import {GetNotification} from '../Types/Notification.types';
import {NotificationsNavigationType} from '../Types/NavigationTypes.types';

const Notifications: React.FunctionComponent<NotificationsNavigationType> = ({
  navigation,
}) => {
  const theme = useTheme();
  const {user} = useUserContext();
  const [notifications, setNotifications] = useState<GetNotification[] | []>(
    [],
  );
  useEffect(() => {
    if (user) getNotifications(user).then(data => setNotifications(data));
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
            <Text style={styles.text}>Notifications</Text>
          </View>
        </View>
      </View>
      <Block>
        {notifications.length > 0
          ? notifications.map((item, index) => (
              <NotificationCard
                key={index}
                title={item.title}
                body={item.body}
                onPress={() => {
                  if (item.id)
                    navigation.navigate('EventDetails', {id: item.id?.trim()});
                }}
                time={item.createdAt?.seconds}
              />
            ))
          : null}
      </Block>
    </>
  );
};

export default Notifications;

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
