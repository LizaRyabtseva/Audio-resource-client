import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavLinks.module.css';

const NavigationItem = props => {
    return (
        <li className={'nav-item'}>
            <NavLink className={'nav-link fs-5 text ' + classes.Li} to={props.link} exact={props.exact}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;

