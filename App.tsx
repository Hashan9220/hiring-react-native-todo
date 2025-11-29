import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNav from './src/nav/AppNav';
import { initDB } from './src/db/database';
import store from './src/redux/store';

export default function App() {
  useEffect(() => {
    initDB();  // Yes, this must run once
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
