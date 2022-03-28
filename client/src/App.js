import { Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import Alert from './components/layout/Alert';
import React, { useEffect, useState } from "react";
// Redux
import { Provider } from 'react-redux'
import store from './store';
// import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css'

const App = () => 
  <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

        </Switch>
      </section>
      </Fragment>
    </Router>
  </Provider>

export default App;
