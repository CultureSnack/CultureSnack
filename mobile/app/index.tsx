import React from 'react';
import Main from '../pages/Main';
import { StatusBar } from 'expo-status-bar';

export default function Page() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#0D1B2A" translucent={false} />
      <Main />
    </>
  );
}