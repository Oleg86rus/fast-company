import React, { useEffect } from 'react';
import NavMenu from './components/ui/navMenu';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './components/layouts/main';
import Login from './components/layouts/login';
import Users from './components/layouts/users';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './components/layouts/logOut';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadQualitiesList());
  }, []);
  return (
    <div>
      <AuthProvider>
        <NavMenu />
        <ProfessionProvider>
          <Switch>
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/users/:userId?/:edit?' component={Users}/>
            <Route exact path='/' component={Main} />
            <Route path='/logout' component={LogOut}/>
            <Redirect to='/'/>
          </Switch>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer/>
    </div>
  );
};

export default App;
