import {StyleSheet, View, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import {Block, AuthTextInput, AuthButton, TouchableText} from '../components';
import {Text, useTheme} from 'react-native-paper';
import {fonts, images} from '../constant';
import {Logo, TopDesign} from '../../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {ForgetPasswordNavigationType} from '../Types/NavigationTypes.types';
import {isValidEmail} from '../utils/Validator';
import {sentPasswordResetEmail} from '../services/Auth';
import {useLoadingContext} from '../context/LoadingContext';
interface props {
  navigation: any;
}
const ForgetPassword: React.FunctionComponent<props> = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<ForgetPasswordNavigationType['navigation']>();
  const [email, setEmail] = useState('');
  const {loading, setLoading} = useLoadingContext();
  const handleSentEmail = () => {
    setLoading(true);
    sentPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Password Reset Email sent',
          "If your account exist you will recive a password reset email to the email address associated with your account. Please follow the instructions provided in the email to reset your password. If you don't see the email in your inbox, please check your spam or junk folder as it may have been mistakenly filtered.",
        );
        navigation.navigate('SignIn');
      })
      .catch(err =>
        Alert.alert(
          err.code.slice(5, err.code.length),
          err.message.slice(22, err.message.length),
        ),
      )
      .finally(() => setLoading(false));
  };
  return (
    <Block>
      <TopDesign />
      <Text style={[styles.screenHeading, {color: theme.colors.onSecondary}]}>
        Forget Password
      </Text>
      <View style={styles.logo}>
        <Image source={images.logoAnimation} style={styles.logoImage} />
      </View>
      <TouchableText
        text="Please enter your email and you will recive a password reset link if your account exist"
        alignSelf="center"
      />
      <AuthTextInput
        placeholder="Your Email"
        name="Email"
        onChangeText={e => setEmail(e)}
        errorText="Please enter a valid email"
        visible={!isValidEmail(email)}
      />

      <AuthButton
        heading="Send Email"
        disabled={!isValidEmail(email)}
        loading={loading}
        onPress={handleSentEmail}
      />
      <View style={styles.bottomTextContanier}>
        <Text style={styles.bottomText}>Remember your password?</Text>
        <TouchableText
          text="Sign In"
          alignSelf="center"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </Block>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  bottomTextContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    ...fonts.TouchableText,
  },
  logo: {
    alignItems: 'center',
    marginHorizontal: 20,
    top: -30,
  },
  screenHeading: {
    ...fonts.screenHeading,
    position: 'absolute',
    left: '20%',
    top: '4%',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: 170,
    height: 140,
  },
});
