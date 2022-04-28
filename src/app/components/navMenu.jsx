import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  const menus = [
    {
      id: 0,
      name: 'Main',
      link: '/'
    },
    {
      id: 1,
      name: 'Login',
      link: '/login'
    },
    {
      id: 2,
      name: 'Users',
      link: '/users'
    }
  ];

  return (
    <ul className="nav nav-tabs">
      {menus.map(el=>(
        <li key={el.id} className="nav-item">
          <NavLink exact className='nav-link' to={el.link}>{el.name}</NavLink>
        </li>
      ))}
    </ul>
  );
};
export default NavMenu;