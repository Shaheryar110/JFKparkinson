import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {OnboardingArrow, OnboardingDesign} from '../../assets/svg';
import {Block} from '../components';
import {colors, fonts, images} from '../constant';
import {useTheme} from 'react-native-paper';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  BottomTabNavigationType,
  OnboardingNavigationType,
} from '../Types/NavigationTypes.types';

const {width, height} = Dimensions.get('window');
const Onbording: React.FunctionComponent = () => {
  const theme = useTheme();
  const [dots, setDots] = useState<string[]>(['1', '2', '3']);
  const navigation = useNavigation<OnboardingNavigationType['navigation']>();
  const [active, setActive] = useState(1);
  return (
    <View>
      <Image source={images.onbordingImage} style={styles.image}></Image>
      <Pressable
        style={styles.skip}
        onPress={() => navigation.navigate('BottomTab')}>
        <Text style={{color: theme.colors.primary}}>Skip</Text>
      </Pressable>
      <View style={styles.design}>
        <OnboardingDesign width={width} height={height * 0.6} />
      </View>
      <Text style={[styles.heading1, {color: theme.colors.onSecondary}]}>
        The JFK
      </Text>
      <Text style={[styles.heading2, {color: theme.colors.onSecondary}]}>
        PARKINSON'S ADVOCATE
      </Text>
      <View style={styles.dotsContanier}>
        {dots.map((dots, index) => {
          return (
            <Pressable
              style={[
                styles.dots,
                {
                  backgroundColor:
                    active === index + 1 ? theme.colors.primary : 'transparent',
                  borderWidth: active === index + 1 ? 0 : 1,
                  borderColor:
                    active === index + 1
                      ? 'transparent'
                      : theme.colors.onSecondary,
                },
              ]}
              key={index}
              onPress={() => setActive(index + 1)}
            />
          );
        })}
      </View>
      <Pressable
        style={styles.nextButton}
        onPress={() => {
          if (active >= 3) {
            navigation.navigate('BottomTab');
          } else {
            setActive(prev => prev + 1);
          }
        }}>
        <Text style={[styles.next, {color: theme.colors.onSecondary}]}>
          Next
        </Text>
        <OnboardingArrow />
      </Pressable>
    </View>
  );
};

export default Onbording;

const styles = StyleSheet.create({
  design: {
    position: 'absolute',
    bottom: -40,
  },
  image: {
    width: '100%',
  },
  skip: {
    ...fonts.AuthButton,
    position: 'absolute',
    right: 20,
    top: 40,
  },
  heading1: {
    ...fonts.homeHeading,
    position: 'absolute',
    bottom: height * 0.27,
    left: width * 0.43,
  },
  heading2: {
    ...fonts.homeHeading,
    position: 'absolute',
    bottom: height * 0.22,
    left: width * 0.2,
  },
  dotsContanier: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    bottom: '18%',
    left: '32%',
  },
  dots: {
    width: 15,
    height: 15,
    borderRadius: 20,
    borderWidth: 1,
    zIndex: 99,
  },
  next: {
    ...fonts.cardHeading,
    marginRight: 10,
  },
  nextButton: {
    position: 'absolute',
    bottom: '7%',
    right: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
