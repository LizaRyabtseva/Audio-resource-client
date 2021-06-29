import React from 'react';
import Button from "../../shared/components/UIElements/Button";
import classes from './PlaylistCard.module.css';
import button from "../../shared/components/UIElements/Button.module.css";

const PlaylistCard = props => {
    return (
        <div className={'card ' + classes.Card}>
            <img src={`http://localhost:5000/${props.imgUrl}`} className={'card-img-top ' + classes.Img} alt="..."/>
            <h6 className={'card-title ' + classes.CardTitle}>{props.title}</h6>
            <Button to={props.to} className={button.A}>Слушать</Button>
        </div>
    )
};

export default PlaylistCard;