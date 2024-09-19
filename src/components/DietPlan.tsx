import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {List, useTheme} from 'react-native-paper';
import {fonts} from '../constant';
import {Arrow, Email} from '../../assets/svg';

type props = {
  breakFast: string;
  lunch: string;
  dinner: string;
};

const DietPlan: React.FunctionComponent<props> = ({
  breakFast,
  lunch,
  dinner,
}) => {
  const theme = useTheme();
  return (
    <List.Section style={styles.contanier}>
      <List.Accordion
        onPress={() => console.log('Press')}
        title="Break Fast"
        right={props => {
          if (props.isExpanded)
            return (
              <View style={styles.arrow}>
                <Arrow />
              </View>
            );
          else {
            return <Arrow />;
          }
        }}
        style={[
          styles.accordionContanier,
          {borderColor: theme.colors.outline},
        ]}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Lunch"
        right={props => {
          if (props.isExpanded)
            return (
              <View style={styles.arrow}>
                <Arrow />
              </View>
            );
          else {
            return <Arrow />;
          }
        }}
        style={[
          styles.accordionContanier,
          {borderColor: theme.colors.outline},
        ]}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
      <List.Accordion
        title="Dinner"
        right={props => {
          if (props.isExpanded)
            return (
              <View style={styles.arrow}>
                <Arrow />
              </View>
            );
          else {
            return <Arrow />;
          }
        }}
        style={[
          styles.accordionContanier,
          {borderColor: theme.colors.outline},
        ]}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

export default DietPlan;

const styles = StyleSheet.create({
  contanier: {
    borderRadius: 20,
    padding: 15,
    marginHorizontal: '2%',
  },
  text: {
    ...fonts.cardHeading,
  },
  accordionContanier: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  arrow: {transform: [{rotateX: '180 deg'}]},
});
