import React from 'react';
import Button from "../../shared/components/UIElements/Button";
import classesButton from '../../shared/components/UIElements/Button.module.css';
import classes from '../components/CardItem.module.css';
import firstLetterCaps from "../../shared/util/firstLetterCaps";

const SongCardItem = props => {
    return (
        <div className={`card ${classes.Card}`}>
            <div className={'card-body'} style={{textAlign: 'center'}}>
                <h4 className={'card-title'} style={{textAlign: 'center'}}>
                    {firstLetterCaps(props.title)}
                </h4>
                <h5 className={'card-subtitle'}>
                    {firstLetterCaps(props.artist)}
                </h5>
                <h6 className={'card-subtitle ' + classes.CardSubtitle}>
                    {firstLetterCaps(props.category)}
                </h6>
                <Button to={`/admin/updateSong/${props.id}`} className={'btn ' + classesButton.Button}>Изменить</Button>
                <Button classname={'btn ' + classesButton.Button}>Удалить</Button>
            </div>
        </div>
    )
};

export default SongCardItem;