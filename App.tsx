import React from 'react';
import { Provider } from 'react-redux';
import Redux from "./src/redux/store/store"
import { AppNavigation } from './src';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={Redux.store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
