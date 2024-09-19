import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  ToastAndroid,
  ImageBackground,
  AppState,
  DevSettings,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Design,
  DrawerIcon,
  HomeDesign,
  NotificationIcon,
} from '../../assets/svg';
import {
  Block,
  EventHomeCard,
  TouchableText,
  HomeBanner,
  EmptyText,
  StepsCounter,
} from '../components';
import {colors, fonts, images} from '../constant';
import {useTheme} from 'react-native-paper';
import {useDrawerContext} from '../context/DrawerContex';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {HomeNavigationType} from '../Types/NavigationTypes.types';
import {GetMeetingResponse, getMeetings} from '../services/meetings';
import moment from 'moment';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';
import googleFit from 'react-native-google-fit';
import {onDisplayNotification} from '../services/Notifications';

const Home: React.FunctionComponent<HomeNavigationType> = () => {
  const {isOpen, setIsOpen} = useDrawerContext();
  const navigation = useNavigation<HomeNavigationType['navigation']>();
  const [meetingData, setMeetingData] = useState<GetMeetingResponse[] | []>([]);
  var currentDate = new Date();
  var previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  const opt = {
    startDate: previousDate.toISOString(), // required ISO8601Timestamp
    endDate: new Date().toISOString(), // required ISO8601Timestamp
    bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 2, // optional - default 1.
  };

  const theme = useTheme();
  const {width, height} = Dimensions.get('window');
  //moment().format('dddd, MMM D, YYYY')
  useEffect(() => {
    notifee.requestPermission().then(value => {
      console.log(value);
    });
  }, []);

  useEffect(() => {
    getMeetings('Wednesday, Jul 12, 2023').then(
      (data: GetMeetingResponse[] | []) => {
        setMeetingData(data);
      },
    );
    return () => {};
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      GoogleFit.checkIsAuthorized().then(() => {
        if (GoogleFit.isAuthorized) {
          GoogleFit.getDailySteps().then(res => {
            console.log(res);
          });
        }
      });
    }, []),
  );

  return (
    <Block>
      <View
        style={[styles.contanier, {backgroundColor: theme.colors.tertiary}]}>
        <ImageBackground source={images.gindolce} style={{flex: 1}}>
          <View
            style={{
              backgroundColor: theme.colors.tertiary,
              flex: 1,
              opacity: 0.9,
            }}
          />
        </ImageBackground>
      </View>
      <View style={styles.design}>
        <Design />
      </View>
      <View style={styles.header}>
        <Pressable style={styles.inner} onPress={() => setIsOpen(true)}>
          <DrawerIcon width={30} height={30} />
          <Text style={styles.text}>Home</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Notifications')}>
          <NotificationIcon
            width={30}
            height={30}
            fill={theme.colors.onSecondary}
          />
        </Pressable>
      </View>
      <HomeBanner />
      <StepsCounter steps={10} onPress={() => {}} />
      <View style={styles.headingContanier}>
        <Text style={styles.heading}>Parkinson's Support Group Events</Text>
        <TouchableText
          text="View all >>"
          alignSelf="flex-end"
          onPress={() => navigation.navigate('Events')}
        />
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        {meetingData.length > 0 ? (
          meetingData?.map((item, index) => (
            <EventHomeCard
              key={index}
              width={250}
              heading={item.heading}
              time={`${item.date} ${item.time}`}
              source={images.premier}
              onPress={() => navigation.navigate('EventDetails', {id: item.id})}
            />
          ))
        ) : (
          <EmptyText text="No Meetings on This Day"></EmptyText>
        )}
      </ScrollView>
      <View style={styles.headingContanier}>
        <Text style={styles.heading}>New On Parkinson's</Text>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 10}}>
        <EventHomeCard
          width={width * 0.43}
          heading="Stories"
          time="See Stories >"
          onPress={() => navigation.navigate('Stories')}
          source={images.healing}
        />
        <EventHomeCard
          width={width * 0.43}
          heading="Community "
          time="Join Community >"
          onPress={() => navigation.navigate('Post')}
          source={images.image1}
        />
      </View>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: '10%',
    marginHorizontal: '6%',
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
  heading: {
    ...fonts.homeHeading,
    maxWidth: '60%',
  },
  headingContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  contanier: {
    width: 300,
    height: 300,
    borderRadius: 500,
    transform: [{scaleX: 1.5}],
    overflow: 'hidden',
    position: 'absolute',
    top: -80,
    left: 45,
  },
  design: {
    transform: [{scaleY: -1}, {rotate: '-20 deg'}],
    position: 'absolute',
    top: -170,
    right: -250,
  },
  scroll: {
    paddingHorizontal: 10,
  },
});
