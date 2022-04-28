import React, { useEffect, useState } from 'react';
import UserLine from './components/userLine';
import API from './api';
import NavMenu from './components/navMenu';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';
import User from './components/user';
import NotFound from './components/not-found';

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  },
  []);
  
  const handleLineDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };
  
  return (
    <div>
      <NavMenu />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route exact path='/users' render={()=>(
          <>
            <UserLine
              onDelete={handleLineDelete}
              onToggleBookMark={handleToggleBookMark}
              users={Object.values(users)}
            /> 
          </>)} />
        <Route path='/users/:userId?' component={User}/>
        <Route path='/404' component={NotFound}/>
        <Redirect to='/404'/>
      </Switch>
    </div>
  );
};

export default App;
