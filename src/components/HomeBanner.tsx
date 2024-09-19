import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  Animated,
  useWindowDimensions,
  Easing,
} from 'react-native';
import {colors, images} from '../constant';
import {useTheme} from 'react-native-paper';

const image = [
  images.gindolce,
  images.healing,
  images.image1,
  images.image2,
  images.premier,
];

const HomeBanner = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scroll = useState(new Animated.Value(0))[0];
  const {width: windowWidth} = useWindowDimensions();
  const theme = useTheme();

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prevStep => (prevStep + 1) % image.length);
      Animated.timing(scroll, {
        toValue: windowWidth * activeStep,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      });
      scrollX.setValue(activeStep * windowWidth);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.scrollContainer}>
      <Animated.ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        contentOffset={{x: activeStep * windowWidth, y: 0}}
        scrollEventThrottle={1}>
        {image.map((image, imageIndex) => {
          return (
            <View style={{width: windowWidth, height: 200}} key={imageIndex}>
              <Image source={image} style={styles.card}></Image>
            </View>
          );
        })}
      </Animated.ScrollView>
      <View style={styles.indicatorContainer}>
        {image.map((image, imageIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={imageIndex}
              style={[
                styles.normalDot,
                {
                  width,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    resizeMode: 'cover',
    width: '93%',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
});

export default HomeBanner;
