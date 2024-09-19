import {StyleSheet, View, Dimensions, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BackButton,
  Block,
  DatePicker,
  EmptyText,
  MeetingCard,
  Search,
} from '../components';
import {Design} from '../../assets/svg';
import {Text, useTheme} from 'react-native-paper';
const {height, width} = Dimensions.get('window');
import {EventsNavigationType} from '../Types/NavigationTypes.types';
import {GetMeetingResponse, getMeetings} from '../services/meetings';
import moment from 'moment';

const Events: React.FunctionComponent<EventsNavigationType> = ({
  navigation,
}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const [date, setDate] = useState<string>(
    moment().format('dddd, MMM D, YYYY'),
  );
  const [meetingData, setMeetingData] = useState<GetMeetingResponse[] | []>([]);
  const handleDate = (e: string) => {
    setDate(e);
  };

  useEffect(() => {
    getMeetings(date).then((data: GetMeetingResponse[] | []) =>
      setMeetingData(data),
    );

    return () => {};
  }, [date]);

  return (
    <>
      <View
        style={[
          styles.designContanier,
          {backgroundColor: theme.colors.tertiaryContainer},
        ]}>
        <View style={styles.design}>
          <Design width={width * 1.2} height={height * 0.5} />
        </View>
        <View style={styles.search}>
          <Search placeholder="Search here..." />
        </View>
        <View style={styles.back}>
          <BackButton pageName="Meetings" isDrawer={true} />
        </View>
        <DatePicker setDate={handleDate} date={date} />
      </View>
      <Block withoutScroll={true}>
        {meetingData.length > 0 ? (
          <Animated.FlatList
            showsVerticalScrollIndicator={false}
            data={meetingData}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            keyExtractor={(item, index) => `${index}`}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}
            renderItem={({item, index}) => {
              const inputRange = [-1, 0, 190 * index, 190 * (index + 2)];
              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = scrollY.interpolate({
                inputRange: [-1, 0, 190 * index, 190 * (index + 0.5)],
                outputRange: [1, 1, 0.9, 0],
              });
              return (
                <Animated.View style={{transform: [{scale}], opacity}}>
                  <MeetingCard
                    date={item.date}
                    time={item.time}
                    title={item.heading}
                    onPress={() =>
                      navigation.navigate('EventDetails', {id: item.id})
                    }
                  />
                </Animated.View>
              );
            }}
          />
        ) : (
          <EmptyText text="No Meetings on This Day"></EmptyText>
        )}
      </Block>
    </>
  );
};

export default Events;

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    right: 20,
    width: '45%',
  },
  back: {
    position: 'absolute',
    left: 20,
    width: '45%',
  },
  design: {
    position: 'absolute',
    top: -height * 0.3,
    left: -width * 0.1,
  },
  designContanier: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
