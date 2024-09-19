import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Modal, useTheme} from 'react-native-paper';
import {colors, fonts} from '../constant';
import {convertToDate, getMonthDays, getYearMonths} from '../utils/date';
import {Arrow} from '../../assets/svg';
import moment from 'moment';

type props = {
  setDate: (e: string) => void;
  date: string;
};
const {height} = Dimensions.get('window');

const DatePicker: React.FunctionComponent<props> = ({setDate, date}) => {
  const theme = useTheme();
  const scrollViewRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenYear, setIsModalOpenYear] = useState(false);
  const [month, setMonth] = useState<string>(
    `${new Date().toLocaleString('default', {month: 'short'})}`,
  );
  const [monthValues, setMonthValues] = useState(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [pickedDate, setpickedDate] = useState<number>(
    Number(moment().format('D')),
  );
  const {width: screenWidth} = Dimensions.get('window');
  const [day, setDay] = useState<string>(moment().format('dddd'));
  const [days, setDays] = useState<
    {day: string; dayLong: string; date: number}[]
  >([]);
  useEffect(() => {
    const daysData = getMonthDays(monthValues, year);
    setDays(daysData);
    setDay(daysData[pickedDate - 1].dayLong);
  }, [month, year]);

  useEffect(() => {
    setDate(`${day}, ${month} ${pickedDate}, ${year}`);
  }, [pickedDate, month, year]);
  return (
    <>
      <View style={{marginTop: height * 0.2}}>
        <View style={styles.dateContanier}>
          <Text style={[styles.textDate, {color: theme.colors.scrim}]}>
            Date
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable onPress={() => setIsModalOpen(true)}>
              <Text style={styles.date}>{month}</Text>
            </Pressable>
            <Pressable onPress={() => setIsModalOpenYear(true)}>
              <Text style={styles.date}>{year}</Text>
            </Pressable>
            <Arrow />
          </View>
        </View>
        <View
          style={[
            styles.horizontalLine,
            {borderBottomColor: theme.colors.onTertiary},
          ]}
        />
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          contentContainerStyle={{width: screenWidth * 4.5, paddingVertical: 4}}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.days}>
            {days?.length > 0 &&
              days?.map((item, index: number) => {
                return (
                  <View key={index}>
                    <Text style={styles.day}>{item.day}</Text>
                    <Pressable
                      onPress={() => {
                        setpickedDate(item.date);
                        setDay(item.dayLong);
                      }}>
                      <Text
                        style={[
                          styles.number,
                          {
                            backgroundColor:
                              index + 1 === pickedDate
                                ? theme.colors.primary
                                : theme.colors.onSecondary,
                            elevation: 2,
                            color:
                              index + 1 === pickedDate
                                ? theme.colors.onSecondary
                                : theme.colors.scrim,
                          },
                        ]}>
                        {item.date}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <Modal visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <View style={styles.modalStyle}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {getYearMonths(year).map((month, index: number) => (
              <TouchableOpacity
                onPress={() => {
                  setMonth(month.shortName);
                  setIsModalOpen(false);
                  setMonthValues(month.value);
                }}
                key={index}>
                <Text style={styles.date}>{month.month}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <Modal
        visible={isModalOpenYear}
        onDismiss={() => setIsModalOpenYear(false)}>
        <View style={styles.modalStyle}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {[2023, 2024, 2025, 2026, 2027].map((item, index: number) => (
              <TouchableOpacity
                onPress={() => {
                  setYear(item);
                  setIsModalOpenYear(false);
                }}
                key={index}>
                <Text style={styles.date}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  textDate: {
    ...fonts.headerHeading,
  },
  date: {
    ...fonts.cardHeading,
    marginRight: 6,
    color: colors.black,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
  },
  day: {
    ...fonts.cardHeading,
    textAlign: 'center',
    width: 45,
    marginHorizontal: 4,
  },
  days: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },

  number: {
    ...fonts.screenHeading,
    textAlign: 'center',
    borderRadius: 30,
    width: 45,
    height: 45,
    marginHorizontal: 4,
    textAlignVertical: 'center',
  },
  dateContanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  modalStyle: {
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: 'flex-start',
    width: '70%',
    alignSelf: 'center',
    marginVertical: 20,
    padding: 10,
  },
});
