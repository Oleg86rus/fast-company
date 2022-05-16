import React, { useEffect, useState } from 'react';
import UserListPage from './components/page/usersListPage/userListPage';
import API from './api';
import NavMenu from './components/ui/navMenu';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './components/layouts/main';
import Login from './components/layouts/login';
import Users from './components/layouts/users';
import NotFound from './components/page/not-found';

const App = () => {
 
  return (
    <div>
      <NavMenu />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userId?/:edit?' component={Users}/>
        <Route path='/404' component={NotFound}/>
        <Redirect to='/404'/>
      </Switch>
    </div>
  );
};

export default App;
