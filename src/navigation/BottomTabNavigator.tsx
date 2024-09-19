import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Consultation, Events, Home, Post, Stories} from '../screens';
import * as SvgIcons from '../../assets/svg';
import {useTheme} from 'react-native-paper';
import {RootBottomTabParams} from '../Types/NavigationTypes.types';
type props = {
  state: any;
  navigation: any;
  descriptors: any;
};

const Tab = createBottomTabNavigator<RootBottomTabParams>();
const BottomTabBar: React.FunctionComponent<props> = ({
  state,
  navigation,
  descriptors,
}) => {
  const theme = useTheme();
  return (
    <View style={[styles.contanier, {backgroundColor: theme.colors.primary}]}>
      {state.routes.map(
        (
          route: {key: string | number; name: string},
          index: React.Key | null | undefined,
        ) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };
          const isFocused = state.index === index;
          let activeIcon, InactiveIcon;
          let Icon;
          if (route.name == 'Home') {
            activeIcon = 'Home';
            InactiveIcon = 'Home';
          } else if (route.name == 'Events') {
            activeIcon = 'Events';
            InactiveIcon = 'Events';
          } else if (route.name == 'Post') {
            activeIcon = 'Post';
            InactiveIcon = 'Post';
          } else if (route.name == 'Consultation') {
            activeIcon = 'Consultation';
            InactiveIcon = 'Consultation';
          } else if (route.name == 'Stories') {
            activeIcon = 'Stories';
            InactiveIcon = 'Stories';
          }
          Icon = SvgIcons[isFocused ? activeIcon : InactiveIcon];
          return (
            <Shadow
              key={index}
              inner={!isFocused}
              useArt
              style={{
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.6,
                shadowColor: theme.colors.shadow,
                shadowRadius: 10,
                borderRadius: 10,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    route.name === 'Home'
                      ? theme.colors.primaryContainer
                      : theme.colors.primary,
                  borderRadius: 10,
                  height: 50,
                  width: 50,
                }}
                activeOpacity={0.8}>
                <Icon />
              </TouchableOpacity>
            </Shadow>
          );
        },
      )}
    </View>
  );
};

const BottomTab: React.FunctionComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
        },
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Consultation" component={Consultation} />
      <Tab.Screen name="Stories" component={Stories} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

export default BottomTab;
