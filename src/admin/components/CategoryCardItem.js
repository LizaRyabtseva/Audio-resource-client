import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Button from "../../shared/components/UIElements/Button";
import classesButton from '../../shared/components/UIElements/Button.module.css';
import classes from './CardItem.module.css';
import firstLetterCaps from "../../shared/util/firstLetterCaps";

const CategoryCardItem = props => {

    return (
        <div className={`card ${classes.Card}`}>
            <div className={'card-body'} style={{textAlign: 'center'}}>
                <h5 className={'card-title'} style={{textAlign: 'center'}}>
                    {firstLetterCaps(props.title)}
                </h5>
                <Button to={`/admin/updateCategory/${props.id}`} className={'btn ' + classesButton.Button}>Изменить</Button>
                <Button onClick={() => props.onDelete(props.id)} classname={'btn ' + classesButton.Button}>Удалить</Button>
                <Button to={`/admin/updateCategory/${props.key}`} className={'btn ' + classesButton.Button}>Просмотреть</Button>
            {/*    изменить ссылкц на просмотреть*/}
            </div>
        </div>
    )
};

export default CategoryCardItem;