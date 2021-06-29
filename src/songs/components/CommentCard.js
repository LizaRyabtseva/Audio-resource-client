import React from 'react';
import classes from './CommentCard.module.css'

const CommentCard = props => {
    return (
        <div className={'card ' + classes.Card}>
            <div className={'card-body ' + classes.CardBody}>
                <h6 className={'card-title'}>{props.user} <small className={classes.Small}>{props.date}</small></h6>
                <p className={'card-text'}>{props.text}</p>
            </div>
        </div>
    );
};

export default CommentCard;