import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NavProfile from './navProfile';

const NavMenu = () => {
  const {currentUser} = useAuth();
  return (
    <nav className='navbar bg-light mb-3'>
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <NavLink exact className='nav-link' to='/'>Main</NavLink>
          </li>
          {currentUser && (<li className="nav-item">
            <NavLink exact className='nav-link' to='/users'>Users</NavLink>
          </li>)}
        </ul>
        <div className="d-flex">
          {currentUser ? <NavProfile/> : <NavLink exact className='nav-link' to='/login'>Login</NavLink>}
        </div>
      </div>
    </nav>
  );
};
export default NavMenu;