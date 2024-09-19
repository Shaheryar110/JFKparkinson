import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Block} from '../components';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Back, Design} from '../../assets/svg';
import {colors, fonts} from '../constant';

const TermsAndConditions: React.FunctionComponent = () => {
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
            <Text style={styles.text}>Terms</Text>
          </View>
        </View>
      </View>
      <Block contentContainerStyle={{paddingHorizontal: 20}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Terms and Conditions</Text>
          <Text style={styles.sectionTitle}>1. Use of the App</Text>
          <Text style={styles.point}>1.1. Eligibility:</Text>
          <Text style={styles.textContent}>
            You must be at least 16 years old to use the App. By using the App,
            you represent and warrant that you are at least 16 years old.
          </Text>
          <Text style={styles.point}>1.2. User Accounts:</Text>
          <Text style={styles.textContent}>
            To access certain features of the App, you may be required to create
            a user account. You are responsible for maintaining the
            confidentiality of your account credentials and are solely
            responsible for all activities that occur under your account.
          </Text>
          <Text style={styles.point}>1.3. Prohibited Conduct:</Text>
          <Text style={styles.textContent}>
            You agree not to engage in any activity that may interfere with or
            disrupt the functioning of the App, including but not limited to: -
            Attempting to gain unauthorized access to the App or its related
            systems or networks. - Using the App for any unlawful or
            unauthorized purpose. - Uploading or transmitting any content that
            is defamatory, abusive, harassing, obscene, or otherwise
            objectionable. - Engaging in any form of fraudulent activity or
            unauthorized advertising.
          </Text>

          <Text style={styles.sectionTitle}>2. Intellectual Property</Text>
          <Text style={styles.textContent}>
            - The App and its content, including but not limited to textContent,
            graphics, images, logos, trademarks, and software, are the
            intellectual property of JFK Parkinson's or its licensors and are
            protected by copyright and other intellectual property laws. - You
            may not reproduce, modify, distribute, or create derivative works of
            any part of the App without our prior written consent.
          </Text>

          <Text style={styles.sectionTitle}>3. Disclaimer of Warranties</Text>
          <Text style={styles.textContent}>
            - The App and its content are provided on an "as-is" and "as
            available" basis, without any warranties or representations, express
            or implied. We do not guarantee the accuracy, reliability, or
            availability of the App or its content.
          </Text>

          <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
          <Text style={styles.textContent}>
            - To the maximum extent permitted by applicable law, we shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or in connection with the use or
            inability to use the App, even if we have been advised of the
            possibility of such damages.
          </Text>

          <Text style={styles.sectionTitle}>5. Privacy</Text>
          <Text style={styles.textContent}>
            - Your privacy is important to us. Please refer to our Privacy
            Policy for information on how we collect, use, and disclose your
            personal information.
          </Text>

          <Text style={styles.sectionTitle}>6. Third-Party Links</Text>
          <Text style={styles.textContent}>
            - The App may contain links to third-party websites or resources. We
            are not responsible for the availability or accuracy of such
            external sites or resources and do not endorse or assume any
            responsibility for any content, advertising, products, or other
            materials on or available from such sites or resources.
          </Text>

          <Text style={styles.sectionTitle}>
            7. Modifications to the App and Terms
          </Text>
          <Text style={styles.textContent}>
            - We reserve the right to modify or discontinue the App, or any part
            thereof, with or without notice. - We may revise these Terms at any
            time. The updated Terms will be posted on this page, with the
            effective date clearly indicated. Your continued use of the App
            after the posting of any changes constitutes your acceptance of the
            revised Terms.
          </Text>

          <Text style={styles.sectionTitle}>
            8. Governing Law and Jurisdiction
          </Text>
          <Text style={styles.textContent}>
            - These Terms shall be governed by and construed in accordance with
            the laws of [Insert Jurisdiction]. Any disputes arising out of or in
            connection with these Terms shall be subject to the exclusive
            jurisdiction of the courts of [Insert Jurisdiction].
          </Text>

          <Text style={styles.sectionTitle}>9. Contact Us</Text>
          <Text style={styles.textContent}>
            - If you have any questions or concerns regarding these Terms,
            please contact us at (914) 837-6910 or email us at
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

export default TermsAndConditions;
