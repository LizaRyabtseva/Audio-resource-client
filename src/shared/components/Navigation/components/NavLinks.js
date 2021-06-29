import React, {useContext} from 'react';
import { NavLink, Link } from 'react-router-dom';
import {AuthContext} from "../../../context/auth-context";
import classes from './NavLinks.module.css';
import Search from "../../../../songs/pages/Search";

const NavLinks = props => {
    const auth = useContext(AuthContext);
    return (
        <React.Fragment>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav col-9 justify-content-start">
                    <li className={'nav-item'}>
                        <NavLink className={'nav-link fs-5 text ' + classes.Li} to={'/'} exact>Главное</NavLink>
                    </li>
                    <li className={'nav-item'}>
                        <NavLink className={'nav-link fs-5 text ' + classes.Li} to={'/api/search'} exact>Поиск</NavLink>
                    </li>
                    {auth.isLoggedIn && (
                        <li className={'nav-item'}>
                            <NavLink className={'nav-link fs-5 text ' + classes.Li} to={`/users/${auth.userId}/playlists`} >Мои коллекции</NavLink>
                        </li>
                    )}
                    {auth.isLoggedIn && (
                        <li className={'nav-item'}>
                            <NavLink className={'nav-link fs-5 text ' + classes.Li} to={`/users/${auth.userId}/newPlaylist`} >Новый плейлист</NavLink>
                        </li>
                    )}
                    {auth.role === 'admin' && (
                        <li className={'nav-item dropdown ' + classes.MenuHeader}>
                            <Link className={'nav-link fs-5 text dropdown-toggle ' + classes.Li} to="#"
                                    id="navbarDropdownMenuLink" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">Добавить
                            </Link>
                            <ul className={'dropdown-menu ' +classes.Menu } aria-labelledby="navbarDropdownMenuLink">
                                <li><NavLink className={'nav-link fs-5 text  ' +classes.Dropdown} to="/admin/newCategory">Категория</NavLink></li>
                                <li><NavLink className={'nav-link fs-5 text  ' +classes.Dropdown} to="/admin/newSong">Песня</NavLink></li>
                            </ul>
                        </li>
                    )}
                    {auth.role === 'admin' && (
                        <li className={'nav-item'}>
                            <NavLink className={'nav-link fs-5 text ' + classes.Li} to={'/admin/users'} >Пользователи</NavLink>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav col-3 justify-content-end">
                    {!auth.isLoggedIn && (
                        <li className={'nav-item'}>
                            <NavLink className={'nav-link fs-5 text ' + classes.Li} to={'/login'} exact>Вход</NavLink>
                        </li>
                    )}
                    {auth.isLoggedIn && (
                        <li className={'nav-item'}>
                            <NavLink className={'nav-link fs-5 text ' + classes.Li} to={'/logout'} onClick={auth.logout}>Выход</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </React.Fragment>
    )
};

export default NavLinks;