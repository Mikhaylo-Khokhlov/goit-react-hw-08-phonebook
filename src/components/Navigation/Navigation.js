import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authSelectors } from '../../redux/auth';
import s from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <nav>
      <NavLink to="/" exact className={s.link} activeClassName={s.activeLink}>
        Главная
      </NavLink>

      {isLoggedIn && (
        <NavLink to="/contacts" exact style={s.link} activeStyle={s.activeLink}>
          Контакты
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
