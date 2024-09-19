import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Block,
  AuthTextInput,
  AuthButton,
  TouchableText,
  ProviderLoginButton,
} from '../components';
import Heading from '../components/Heading';
import {HelperText, Text, useTheme} from 'react-native-paper';
import {fonts, images} from '../constant';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Logo, TopDesign} from '../../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {SignUpNavigationType} from '../Types/NavigationTypes.types';
import {signUpProps} from '../Types/AuthTypes.types';
import {isValidEmail, isValidName} from '../utils/Validator';
import {signUp} from '../services/Auth';
import {useLoadingContext} from '../context/LoadingContext';
interface props {}
const SignUp: React.FunctionComponent<props> = () => {
  const theme = useTheme();
  const navigation = useNavigation<SignUpNavigationType['navigation']>();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {loading, setLoading} = useLoadingContext();
  const [isError, setIsError] = useState({
    email: false,
    name: false,
    password: false,
  });
  const [user, setUser] = useState<signUpProps>({
    name: '',
    email: '',
    password: '',
    isChecked: false,
  });
  const handleOnChangeText = (name: string, value: string | boolean) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  useEffect(() => {
    if (user.name !== '')
      setIsError({
        ...isError,
        name: !isValidName(user.name),
      });
    if (user.email !== '') {
      setIsError({
        ...isError,
        email: !isValidEmail(user.email),
      });
    }
    if (user.password !== '') {
      setIsError({
        ...isError,
        password: user.password.length <= 5 ? true : false,
      });
    }
  }, [user]);

  const handleSignUp = () => {
    setLoading(true);
    signUp(user)
      .then(res => console.log(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <Block>
      <TopDesign />
      <Text style={[styles.screenHeading, {color: theme.colors.onSecondary}]}>
        Sign up
      </Text>
      <View style={styles.logo}>
        <Image source={images.logoAnimation} style={styles.logoImage} />
      </View>
      <Heading heading="Welcome" />
      <AuthTextInput
        placeholder="Name"
        name="User"
        KeyboardType="name-phone-pad"
        onChangeText={(e: string) => handleOnChangeText('name', e)}
        errorText="Name is invalid "
        visible={isError.name}
      />
      <AuthTextInput
        placeholder="Your Email"
        name="Email"
        KeyboardType="email-address"
        onChangeText={(e: string) => handleOnChangeText('email', e)}
        errorText="Please enter a valid email"
        visible={isError.email}
      />
      <AuthTextInput
        placeholder="Password"
        name={secureTextEntry ? 'EyeOpen' : 'Eye'}
        secureTextEntry={secureTextEntry}
        onPress={() => setSecureTextEntry(!secureTextEntry)}
        onChangeText={(e: string) => handleOnChangeText('password', e)}
        errorText="Password must contain at least 6 characters"
        visible={isError.password}
      />
      <View style={styles.bottomTextContanier}>
        <BouncyCheckbox
          onPress={(isChecked: boolean) =>
            handleOnChangeText('isChecked', isChecked)
          }
        />
        <Text style={styles.bottomText}>I agree to the</Text>
        <TouchableText text="JFK Parkinson's" alignSelf="center" />
      </View>
      <View style={styles.bottomTextContanier}>
        <TouchableText
          text="Terms and Conditions"
          alignSelf="center"
          onPress={() => navigation.navigate('TermsAndConditions')}
        />
        <Text style={styles.bottomText}>And</Text>

        <TouchableText
          text="Privacy Policy"
          alignSelf="center"
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />
      </View>
      <HelperText
        type="error"
        visible={!user.isChecked}
        padding="none"
        style={styles.helper}>
        Please accept the terms and conditions
      </HelperText>
      <AuthButton
        heading="Sign Up"
        disabled={
          !user.isChecked ||
          isError.email ||
          isError.name ||
          isError.password ||
          loading
        }
        loading={loading}
        onPress={handleSignUp}
      />
      <View style={styles.bottomTextContanier}>
        <Text style={styles.bottomText}>Do not have an account?</Text>
        <TouchableText
          text="Sign in"
          alignSelf="center"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
      <View style={styles.bottomButton}>
        <ProviderLoginButton
          name="Google"
          color={theme.colors.elevation.level2}
        />
        <ProviderLoginButton
          name="Facebook"
          color={theme.colors.elevation.level2}
        />
      </View>
    </Block>
  );
};

export default SignUp;

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
  },
  screenHeading: {
    ...fonts.screenHeading,
    position: 'absolute',
    left: '37%',
    top: '4%',
  },

  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  helper: {alignSelf: 'center'},
  logoImage: {
    width: 160,
    height: 180,
  },
});
