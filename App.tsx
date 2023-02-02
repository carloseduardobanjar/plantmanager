import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications'

import Routes from './src/routes';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';
import { ThemeProvider } from './src/contexts/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(){
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    AsyncStorage.clear();
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      });
      return () => subscription.remove();

    // async function notifications(){
    //   await Notifications.cancelAllScheduledNotificationsAsync();

    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log("Notificações agendadas: ");
    //   console.log(data);

    // }
    // notifications();
  },[])

  if(!fontsLoaded){
    return <AppLoading />
  }

  return(
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  )
}
