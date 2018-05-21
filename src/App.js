//App.js
import React, { Component } from 'react';
import './index.css';
import Logreg from './components/Logreg';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";//this is for routing
import Allusers from './components/Allusers';
import Singleuser from './components/Singleuser';
import Home from './components/Home';
import Newlisting from './components/Newlisting';
import Singlepost from './components/Singlepost';
import Logout from './components/Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
            <Router>
            <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/logreg' component={Logreg} />
            <Route exact path='/Allusers' component={Allusers} />
            <Route path='/user/:_id' component={Singleuser} />
            <Route path='/post/:_id' component={Singlepost} />
            <Route path='/Newlisting' component={Newlisting} />
            <Route path='/Logout' component={Logout} />
            <Route render={function(){
                return (
                <p> Not Found
                <br />
                      <Link className='btn nav-link btn-success' to='/'>
                      Back to log and Reg
                      </Link>
                </p>
                )
            }} />
            </Switch>
            </Router>
      </div>
    );
  }
}

export default App;
