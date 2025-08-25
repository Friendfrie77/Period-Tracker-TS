import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {store} from './state/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'
import './styles/styles.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading ={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
