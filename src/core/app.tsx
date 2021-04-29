import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/main"
import { Provider as RealProvider } from "mobx-react";
import App from './components/App';

// TODO
const Provider: any = RealProvider

ReactDOM.render((
    <Provider store={store}>
        <App store={store} />
    </Provider>
), document.getElementById('app'));