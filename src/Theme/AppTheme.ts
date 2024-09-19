import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
  } from '@react-navigation/native';
  import {
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme,
  } from 'react-native-paper';
  
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });




  const lightTheme = {
    ...MD3LightTheme,
    colors: {
      primary: 'rgb(255, 129, 117)',
      onPrimary: 'rgb(211, 211, 211)',
      primaryContainer: 'rgb(244, 123, 114)',
      onPrimaryContainer: 'rgb(65, 0, 3)',
      secondary: 'rgb(206, 99, 206)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(255, 214, 248)',
      onSecondaryContainer: 'rgb(55, 0, 59)',
      tertiary: 'rgb(45, 216, 255)',
      onTertiary: 'rgb(213, 250, 255)',
      tertiaryContainer: 'rgb(232, 252, 255)',
      onTertiaryContainer: 'rgb(0, 31, 39)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(255, 251, 255)',
      onBackground: 'rgb(32, 26, 25)',
      surface: 'rgb(255, 251, 255)',
      onSurface: 'rgb(32, 26, 25)',
      surfaceVariant: 'rgb(245, 221, 219)',
      onSurfaceVariant: 'rgb(83, 67, 66)',
      outline: 'rgb(231, 231, 231)',
      outlineVariant: 'rgb(123, 123, 123)',
      shadow: 'rgb(132, 132, 132)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(54, 47, 46)',
      inverseOnSurface: 'rgb(251, 238, 236)',
      inversePrimary: 'rgb(255, 179, 173)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(250, 242, 245)',
        level2: 'rgb(247, 236, 239)',
        level3: 'rgb(244, 231, 234)',
        level4: 'rgb(243, 229, 232)',
        level5: 'rgb(241, 225, 228)',
      },
      surfaceDisabled: 'rgba(32, 26, 25, 0.12)',
      onSurfaceDisabled: 'rgba(32, 26, 25, 0.38)',
      backdrop: 'rgba(59, 45, 44, 0.4)',
    }, // Copy it from the color codes scheme and then use it here
  };
  const darkTheme = {
    ...MD3DarkTheme,
    colors: {
      primary: 'rgb(255, 179, 173)',
      onPrimary: 'rgb(95, 20, 19)',
      primaryContainer: 'rgb(244, 123, 114)',
      onPrimaryContainer: 'rgb(255, 218, 214)',
      secondary: 'rgb(255, 169, 250)',
      onSecondary: 'rgb(90, 0, 95)',
      secondaryContainer: 'rgb(123, 17, 129)',
      onSecondaryContainer: 'rgb(255, 214, 248)',
      tertiary: 'rgb(45, 216, 255)',
      onTertiary: 'rgb(0, 54, 66)',
      tertiaryContainer: 'rgb(0, 78, 94)',
      onTertiaryContainer: 'rgb(178, 235, 255)',
      error: 'rgb(255, 180, 171)',
      onError: 'rgb(105, 0, 5)',
      errorContainer: 'rgb(147, 0, 10)',
      onErrorContainer: 'rgb(255, 180, 171)',
      background: 'rgb(32, 26, 25)',
      onBackground: 'rgb(237, 224, 222)',
      surface: 'rgb(32, 26, 25)',
      onSurface: 'rgb(237, 224, 222)',
      surfaceVariant: 'rgb(83, 67, 66)',
      onSurfaceVariant: 'rgb(216, 194, 191)',
      outline: 'rgb(231, 231, 231)',
      outlineVariant: 'rgb(83, 67, 66)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(237, 224, 222)',
      inverseOnSurface: 'rgb(54, 47, 46)',
      inversePrimary: 'rgb(156, 65, 60)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(43, 34, 32)',
        level2: 'rgb(50, 38, 37)',
        level3: 'rgb(57, 43, 41)',
        level4: 'rgb(59, 44, 43)',
        level5: 'rgb(63, 47, 46)',
      },
      surfaceDisabled: 'rgba(237, 224, 222, 0.12)',
      onSurfaceDisabled: 'rgba(237, 224, 222, 0.38)',
      backdrop: 'rgba(59, 45, 44, 0.4)',
    },
  };

  export const CombinedDefaultTheme = {
    ...lightTheme,
    ...LightTheme,
    colors: {
      ...lightTheme.colors,
    },
  };
  export const CombinedDarkTheme = {
    ...darkTheme,
    ...DarkTheme,
    colors: {
      ...darkTheme.colors,
      ...DarkTheme.colors,
    },
  };