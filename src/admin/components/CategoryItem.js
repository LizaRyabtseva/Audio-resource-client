import React from 'react';
import classes from './CategoryItem.module.css';
import Button from "../../shared/components/UIElements/Button";
import button from '../../shared/components/UIElements/Button.module.css';

const CategoryItem = props => {
    return (
        <li className={'list-group-item text-center ' + classes.Li }>
            <Button to={props.to} className={button.A}>{props.title}</Button></li>
    );
};

export default CategoryItem;