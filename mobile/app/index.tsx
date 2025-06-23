import React from 'react';
import { Provider } from 'react-redux';
import Main from '../pages/Main';
import { StatusBar } from 'expo-status-bar';
import store from '../store';

export default function Page() {
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor="#0D1B2A" translucent={false} />
      <Main />
    </Provider>
  );
}
