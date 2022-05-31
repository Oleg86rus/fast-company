import React from 'react';
import NavMenu from './components/ui/navMenu';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './components/layouts/main';
import Login from './components/layouts/login';
import Users from './components/layouts/users';

const App = () => {
 
  return (
    <div>
      <NavMenu />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userId?/:edit?' component={Users}/>
        <Redirect to='/'/>
      </Switch>
    </div>
  );
};

export default App;
