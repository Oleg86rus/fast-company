import React from 'react';
import NavMenu from './components/ui/navMenu';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './components/layouts/main';
import Login from './components/layouts/login';
import Users from './components/layouts/users';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './components/layouts/logOut';
import AppLoader from './components/ui/hoc/appLoader';


const App = () => {
  return (
    <div>
      <AppLoader>
        <NavMenu />
        <Switch>
          <Route path='/login' component={Login} />
          <ProtectedRoute path='/users/:userId?/:edit?' component={Users}/>
          <Route exact path='/' component={Main} />
          <Route path='/logout' component={LogOut}/>
          <Redirect to='/'/>
        </Switch>
      </AppLoader>
      <ToastContainer/>
    </div>
  );
};

export default App;
