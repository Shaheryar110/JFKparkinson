import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constant';
import {useTheme} from 'react-native-paper';
import {Heartattack, Hypertension} from '../../assets/svg';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');

type props = {
  heartRate: number;
  systolic: number;
  diastolic: number;
};

const BloodPressure: React.FunctionComponent<props> = ({
  heartRate,
  systolic,
  diastolic,
}) => {
  const theme = useTheme();
  return (
    <Pressable style={styles.contanier}>
      <View style={styles.innerContanier}>
        <Heartattack width={25} height={25} />
        <Text style={[styles.text, {color: theme.colors.scrim}]}>
          Heart Rate
        </Text>
        <Text style={[styles.counter, {color: theme.colors.scrim}]}>
          {heartRate ? heartRate : 0}
        </Text>
      </View>
      <View style={styles.bloodPressureContanier}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.counter, {color: theme.colors.scrim}]}>
            Blood Pressure
          </Text>
          <Hypertension width={25} height={25} />
        </View>
        <View>
          <Text style={[styles.counter, {color: theme.colors.scrim}]}>
            systolic
          </Text>
          <Text style={[styles.counter, {color: theme.colors.scrim}]}>
            {systolic ? systolic : 0}
          </Text>
        </View>
        <View>
          <Text style={[styles.counter, {color: theme.colors.scrim}]}>
            diastolic
          </Text>
          <Text style={[styles.counter, {color: theme.colors.scrim}]}>
            {diastolic ? diastolic : 0}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default BloodPressure;

const styles = StyleSheet.create({
  contanier: {
    width: width * 0.92,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  text: {
    ...fonts.AuthButton,
    marginHorizontal: 10,
  },
  counter: {
    ...fonts.AuthButton,
    marginRight: 10,
  },
  innerContanier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bloodPressureContanier: {},
});
