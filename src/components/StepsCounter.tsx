import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constant';
import {useTheme} from 'react-native-paper';
import {Arrow, Shoes} from '../../assets/svg';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');

type props = {
  steps: number;
  onPress: () => void;
};

const StepsCounter: React.FunctionComponent<props> = ({steps, onPress}) => {
  const theme = useTheme();
  return (
    <Pressable style={styles.contanier} onPress={onPress}>
      <View style={styles.innerContanier}>
        <Shoes width={25} height={25} />
        <Text style={[styles.text, {color: theme.colors.scrim}]}>
          Today's Steps
        </Text>
      </View>
      <View style={styles.innerContanier}>
        <Text style={[styles.counter, {color: theme.colors.scrim}]}>
          {steps ? steps : 0}
        </Text>
        <Arrow
          width={15}
          height={15}
          style={{transform: [{rotate: '-90deg'}], marginBottom: 5}}
        />
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(230, 247, 255,1)', 'transparent']}
        start={{x: 0.5, y: 0.5}}
        end={{x: 0.7, y: 1}}
        style={styles.shine}
      />
    </Pressable>
  );
};

export default StepsCounter;

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
    marginLeft: 10,
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
});
