import React from 'react'
import AppNavigation from './src/navigation'
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './src/redux/store';

const App = () => {
  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>
    <AppNavigation />
    //   </PersistGate>
    // </ Provider>
  );
};

export default App