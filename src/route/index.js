import React from 'react';
import ReactDOM from 'react-dom';
import { Router , Route , hashHistory } from 'react-router';
import Home from '../components/Home';
import Edit from '../components/Edit';
import Links from '../components/Links';
const route =(
    <Router history={hashHistory}>
        <Route path='/' component={Home}/>
        <Route path='edit' component={Edit}/>
        <Route path='/links' component={Links}/>
    </Router>
)

export default route;