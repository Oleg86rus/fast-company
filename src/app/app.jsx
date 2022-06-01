import React from 'react';
import NavMenu from './components/ui/navMenu';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './components/layouts/main';
import Login from './components/layouts/login';
import Users from './components/layouts/users';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';

const App = () => {
 
  return (
    <div>
      <NavMenu />
      <ProfessionProvider>
  
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/users/:userId?/:edit?' component={Users}/>
          <Route exact path='/' component={Main} />
          <Redirect to='/'/>
        </Switch>
      </ProfessionProvider>
      <ToastContainer/>
    </div>
  );
};

export default App;
