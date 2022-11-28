import React from 'react';
import { Provider } from 'react-redux';
import Redux from "./src/redux/store/store"
import { AppNavigation, LoginScreen, StartScreen } from './src';
import 'react-native-gesture-handler';

const App = () => {
  return (
    // <Provider store={Redux.store}>
    //   <AppNavigation />
    // </Provider>
    <StartScreen/>
  );
};

export default App;
