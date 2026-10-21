import 'react-native-gesture-handler';
import { useCallback } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme, Theme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

import './src/i18n/config';
import { LanguageProvider } from './src/i18n/LanguageProvider';
import { AppProvider } from './src/state/AppProvider';
import { DataProvider } from './src/api/DataProvider';
import { RootNavigator } from './src/navigation/RootNavigator';
import { palette } from './src/theme';

const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: palette.bg,
    card: palette.bgSecondary,
    text: palette.text,
    border: palette.border,
    primary: palette.violet,
    notification: palette.magenta,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const onReady = useCallback(() => {}, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: palette.bg }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <AppProvider>
            <DataProvider>
              <NavigationContainer theme={navTheme} onReady={onReady}>
                <StatusBar style="light" />
                <RootNavigator />
              </NavigationContainer>
            </DataProvider>
          </AppProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
