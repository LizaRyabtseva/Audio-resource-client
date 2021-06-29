import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = props => {
  if (props.href) {
    return (
      <a
        className={'btn ' + classes.A}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={'btn ' + classes.A}
        exact={props.exact}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={'btn ' + props.className}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
