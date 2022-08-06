import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from '././Components/App';
import { ChakraProvider } from '@chakra-ui/react';
import {Provider} from "react-redux";
import { store } from './store';

//Create a root element in the DOM
//React DOM library is used to interact with the DOM
//By using redux provider, we connect the store to the app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App/>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
