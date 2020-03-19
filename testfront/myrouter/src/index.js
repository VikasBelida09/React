import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Link,Switch,BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import user from './user';
import visit from './visit';
import * as serviceWorker from './serviceWorker';

const routing=(
   <Router>
      <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/user" component={user}/>    
            <Route path="/visit" component={visit}/>    
      </Switch> 
  </Router> 
)
ReactDOM.render(routing, document.getElementById('root'));


serviceWorker.unregister();
