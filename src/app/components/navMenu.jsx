import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const url = useLocation();

  return (
    <ul className="nav nav-tabs">
      {menus.map(el=>(
        <li key={el.id} className="nav-item">
          <Link className={url.pathname === el.link ? 'nav-link active': 'nav-link'} to={el.link}>{el.name}</Link>
        </li>
      ))}
    </ul>
  );
};
export default NavMenu;