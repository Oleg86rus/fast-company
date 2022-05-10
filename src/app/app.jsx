import React, { useEffect, useState } from 'react';
import UserListPage from './components/page/usersListPage/userListPage';
import API from './api';
import NavMenu from './components/ui/navMenu';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './components/layouts/main';
import Login from './components/layouts/login';
import Users from './components/layouts/users';
import NotFound from './components/page/not-found';
import EditUserPage from './components/page/editUserPage/editUserPage';

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
            <UserListPage
              onDelete={handleLineDelete}
              onToggleBookMark={handleToggleBookMark}
              users={Object.values(users)}
            /> 
          </>)} />
        <Route path='/users/:userId?/edit' component={EditUserPage}/>
        <Route path='/users/:userId?' component={Users}/>
        <Route path='/404' component={NotFound}/>
        <Redirect to='/404'/>
      </Switch>
    </div>
  );
};

export default App;
