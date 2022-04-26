import React, { useEffect, useState } from 'react';
import UserLine from './components/userLine';
import API from './api';
import loading from './utils/loading';
import NavMenu from './components/navMenu';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';
import User from './components/user';

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
  loading();
  return (
    <div>
      <NavMenu/>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route exact path='/users' render={()=>(<UserLine
          onDelete={handleLineDelete}
          onToggleBookMark={handleToggleBookMark}
          users={Object.values(users)}
        />)} />
        <Route path='/users/:userId?' component={User}/>
      </Switch>
    </div>
  );
};

export default App;
