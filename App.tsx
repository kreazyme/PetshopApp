import React from 'react';
import { Provider } from 'react-redux';
import Redux from "./src/redux/store/store"
import { AppNavigation } from './src';

const App = () => {

  return (
    <Provider store={Redux.store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
