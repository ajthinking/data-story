import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/main"
import { Provider } from "mobx-react";
import App from './components/App';

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));