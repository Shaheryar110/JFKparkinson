import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Block} from '../components';
import {colors, fonts} from '../constant';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Back, Design} from '../../assets/svg';

const PrivacyPolicy: React.FunctionComponent = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <View style={{marginBottom: 90}}>
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
              onPress={() => navigation.goBack()}>
              <Back width={30} height={30} fill={theme.colors.onSecondary} />
            </TouchableOpacity>
            <Text style={styles.text}>Privacy Policy</Text>
          </View>
        </View>
      </View>
      <Block contentContainerStyle={{paddingHorizontal: 20}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.point}>1.1. Personal Information:</Text>
          <Text style={styles.textContent}>
            We may collect personal information, such as your name, email
            address, and demographic information when you use our App. This
            information is used to provide and improve the services we offer.
          </Text>
          <Text style={styles.point}>1.2. Usage Information:</Text>
          <Text style={styles.textContent}>
            We may automatically collect certain information about your device
            and usage of the App, such as your IP address, device type,
            operating system, and app usage statistics. This information helps
            us understand how users interact with the App and allows us to
            improve its functionality.
          </Text>

          <Text style={styles.sectionTitle}>
            2. Use of Collected Information
          </Text>
          <Text style={styles.textContent}>
            - We may use the collected information to: - Provide and maintain
            the App's functionality and features. - Personalize your experience
            with the App. - Improve the App's performance and optimize content.
            - Communicate with you and respond to your inquiries or requests. -
            Send you promotional and marketing materials, subject to your
            preferences and applicable laws. - Ensure compliance with legal
            obligations and enforce our rights.
          </Text>

          <Text style={styles.sectionTitle}>3. Data Retention</Text>
          <Text style={styles.textContent}>
            - We will retain your personal information for as long as necessary
            to fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law.
          </Text>

          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.textContent}>
            - We implement reasonable security measures to protect the
            information we collect and maintain. However, please be aware that
            no security system is impenetrable, and we cannot guarantee the
            absolute security of your information.
          </Text>

          <Text style={styles.sectionTitle}>5. Third-Party Services</Text>
          <Text style={styles.textContent}>
            - The App may contain links to third-party websites or services that
            are not owned or controlled by us. We are not responsible for the
            privacy practices or content of these third-party services and
            encourage you to review their privacy policies.
          </Text>

          <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
          <Text style={styles.textContent}>
            - The App is not intended for use by children under the age of 16.
            We do not knowingly collect personal information from children under
            16. If we discover that we have collected personal information from
            a child under 16, we will take appropriate steps to delete such
            information.
          </Text>

          <Text style={styles.sectionTitle}>
            7. Changes to this Privacy Policy
          </Text>
          <Text style={styles.textContent}>
            - We reserve the right to update or modify this Privacy Policy at
            any time. Any changes will be effective immediately upon posting the
            updated Privacy Policy in the App. Your continued use of the App
            after the posting of any changes constitutes your acceptance of the
            updated Privacy Policy.
          </Text>

          <Text style={styles.sectionTitle}>8. Contact Us</Text>
          <Text style={styles.textContent}>
            - If you have any questions or concerns regarding this Privacy
            Policy, please contact us at (914) 837-6910 or email at
            JOHN@JFKPDADVOCATE.COM.
          </Text>
        </ScrollView>
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
  },
  title: {
    ...fonts.AuthHeading,
    marginBottom: 20,
    color: colors.black,
  },
  sectionTitle: {
    ...fonts.screenHeading,
    marginTop: 20,
    marginBottom: 10,
    color: colors.black,
  },
  point: {
    ...fonts.eventDetailsText,

    marginTop: 10,
    color: colors.black,
  },
  textContent: {
    ...fonts.deawerItem,
    lineHeight: 24,
  },
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
});

export default PrivacyPolicy;
