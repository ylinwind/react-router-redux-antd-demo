import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router , Route , hashHistory } from 'react-router';
import route from './route';
import reducer from './reducers';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
const store = createStore(reducer);
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={route}></Router>
    </Provider>,
    document.getElementById('container')
)