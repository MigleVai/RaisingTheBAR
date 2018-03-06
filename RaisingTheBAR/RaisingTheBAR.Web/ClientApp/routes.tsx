import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import Login from './components/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Login } />
    <Route path='/login' component={ Login } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
