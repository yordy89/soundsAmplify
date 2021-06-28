import React from 'react'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import ListSongs from './components/listSongs'
import Login from './components/Login'
import { Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import NavBar from 'components/NavBar'

import { createBrowserHistory } from 'history'

Amplify.configure(awsconfig)
const browserHistory = createBrowserHistory()

const App = () => {
  return (
    <Router history={browserHistory}>
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/songList' component={ListSongs} />
      </Switch>
    </Router>
  )
}

export default App

