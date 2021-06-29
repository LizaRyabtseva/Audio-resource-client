import React, {useContext, useEffect, useState} from 'react';
import classes from "../pages/Song.module.css";
import classesCard from "./SongCard.module.css";
import button from '../../shared/components/UIElements/Button.module.css';
import firstLetterCaps from "../../shared/util/firstLetterCaps";
import Button from "../../shared/components/UIElements/Button";
import Input from "../../shared/components/UIElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import CommentsList from "./CommentsList";
import {AuthContext} from "../../shared/context/auth-context";


const SongInfo = props => {
    const auth = useContext(AuthContext);

    let content;
    if (props.access == 10) {
        content = (
            <div className={'container'}>
                Вы превысили лимит. Зарегистрируйтесь или войдите в свой аккант, если хотите прослушивать музыку!
            </div>
        )
    } else {
        content = (
            <div className={'container '}>
                <div className="row g-0" >
                    <div className={'col-3 '}>
                        <img src={`http://localhost:5000/${props.song.imgUrl}`} className={'img-fluid ' +classes.Img } style={{width: '300px', height: '290px',}} alt="..."/>
                    </div>
                    <div className="col-md-9">
                        <div className={'card-body'}>
                            <h5 className={'card-title ' + classesCard.CardTitle}><small>Название: </small><h1>{props.song.title.split(' ').map(x => firstLetterCaps(x) + ' ')}</h1></h5>
                            <p className={'card-text ' + classesCard.CardText}><small>Исполнитель: </small>{props.song.artist.split(' ').map(x => firstLetterCaps(x) + ' ')}</p>
                            <p className={'card-text ' + classesCard.CardText}>{props.song.category.split(' ').map(x => firstLetterCaps(x) + ' ')}</p>
                            <p className={'card-text ' + classesCard.CardText}><small>Нравится: {props.song.likes} Просмотры: {props.song.previews}</small></p>
                            {auth.isLoggedIn && (
                                <Button className={button.Button} onClick={props.likeHandler}><svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="bi bi-heart" viewBox="0 0 16 16">
                                    <path
                                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                                </Button>
                            )}
                        </div>
                        {auth.role === 'admin' && (
                            <div style={{textAlign: 'center'}}>
                                <Button className={button.A} to={`/admin/updateSong/${props.song._id}`}>Изменить</Button>
                                <Button className={button.A} onClick={props.deleteHandler}>Удалить</Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={'row g-0 ' + classes.PlayerDiv}>
                    <audio className={classes.Player} src={`http://localhost:5000/${props.song.songUrl}`} controls />
                </div>
                <form onSubmit={props.formSubmitHandler}>
                    <div className={'d-flex'} style={{marginTop: '3rem'}}>
                        <div className={'col-5'}>
                            <Input id={'text'}
                                   element={'textarea'}
                                   rows={2}
                                   type={'text'}
                                   validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
                                   errorText={props.error}
                                   onInput={props.inputHandler}
                                   placeholder={'Оставьте комментарий'}
                            />
                        </div>
                        <div className={'col2 my-1 align-self-end'}>
                            <Button type="submit" className={'btn ' + button.Button} disabled={!auth.isLoggedIn}>Отправить</Button>
                        </div>
                    </div>
                </form>
                <div className={'col-8 '} style={{boxShadow: '3px 5px 11px 0px #100F0F'}}>
                    <CommentsList comments={props.song.comments}/>
                </div>
            </div>
        )
    }

    return (
        [content]
    )
};

export default SongInfo;