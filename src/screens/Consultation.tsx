import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images, fonts, colors} from '../constant';
import {Surface, useTheme} from 'react-native-paper';
import {DoctorsCard, Loading, SponsorCards} from '../components';
import {Design, DrawerIcon, NotificationIcon} from '../../assets/svg';
import {useDrawerContext} from '../context/DrawerContex';
import {DoctorsDataResponse, getDoctorsData} from '../services/consultation';
import {ConsultationNavigationType} from '../Types/NavigationTypes.types';

const Consultation: React.FunctionComponent<ConsultationNavigationType> = ({
  navigation,
}) => {
  const {setIsOpen} = useDrawerContext();
  const theme = useTheme();
  const [doctorsData, setDoctorsData] = useState<DoctorsDataResponse[] | []>(
    [],
  );
  useEffect(() => {
    getDoctorsData()
      .then((data: DoctorsDataResponse[] | []) => setDoctorsData(data))
      .catch(err => console.log(err))
      .finally(() => {});
  }, []);
  return (
    <>
      <View style={{marginBottom: 60}}>
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
              onPress={() => setIsOpen(true)}>
              <DrawerIcon width={30} height={30} />
            </TouchableOpacity>
            <Text style={styles.text}>Consultation</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={{zIndex: 1000}}
            activeOpacity={0.8}>
            <NotificationIcon
              width={30}
              height={30}
              fill={theme.colors.onSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}>
        <Text style={[styles.headingSponsor, {color: theme.colors.scrim}]}>
          Sponsors
        </Text>
        <View style={{flexDirection: 'row'}}>
          <SponsorCards />
          <SponsorCards />
          <SponsorCards />
        </View>
        <View style={{flexDirection: 'row'}}>
          <SponsorCards />
          <SponsorCards />
          <SponsorCards />
        </View>
        <Text style={[styles.headingSponsor, {color: theme.colors.scrim}]}>
          Doctor's Corner
        </Text>
        {doctorsData.length > 0 ? (
          doctorsData?.map((item, index) => (
            <DoctorsCard
              time={item?.details}
              title={item?.name}
              onPress={() => {}}
              key={index}
              source={item?.image}
              index={index}
            />
          ))
        ) : (
          <Loading />
        )}
      </ScrollView>
    </>
  );
};

export default Consultation;

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
  headingSponsor: {
    ...fonts.sponsor,
    marginTop: 20,
  },
});
