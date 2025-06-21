import React from 'react';
import Main from '../pages/Main';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../utils/ThemeProvider';

export default function Page() {
  return (
    <ThemeProvider>
      <StatusBar style="light" backgroundColor="#0D1B2A" translucent={false} />
      <Main />
    </ThemeProvider>
  );
}
