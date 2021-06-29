import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook';
import Spinner from '../../shared/components/UIElements/Spinner'
import {AuthContext} from '../../shared/context/auth-context';
import {useForm} from '../../shared/hooks/form-hook';
import SongInfo from '../components/SongInfo';

const Song = () => {
    const auth = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedSong, setLoadedSong] = useState([]);
    const [isLiked, setIsLiked] = useState();
    const [newComment, setNewComment] = useState();
    const songId = useParams().songId;
    const history = useHistory();
    const {error, sendRequest} = useHttpClient();
    const [access, setAccess] = useState();

    const [formState, inputHandler] = useForm( {
        text: {
            value: '',
            isValid: false
        },
        userId: {
            value: '',
            isValid: false
        },
        songId: {
            value: '',
            isValid: false
        }
    }, false);

    const likeHandler = async () => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/users/postLike`, 'POST',
                JSON.stringify({songId, userId: auth.userId}),  {'Content-Type': 'application/json'});
            setIsLiked(responseData.isLiked);
            console.log(responseData);
        } catch (err) {}
    };

    const deleteHandler = async () => {
        try {
            await sendRequest(`http://localhost:5000/admin/deleteSong/${songId}`, 'delete', null,
                {
                    Authorization: "Bearer " + auth.token
                });
            history.push('/');
        } catch (err) {}
    }

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/songs/${songId}`);
                setLoadedSong(responseData.song);
                setIsLoaded(true);
            } catch (err) {}
        }
        fetchSong();
    }, [newComment, isLiked, sendRequest, songId]);

    useEffect(() => {
        if (!auth.token) {
            const count = localStorage.getItem('HaveAccess');
            if (count < 10) {
                localStorage.setItem('HaveAccess', JSON.stringify(+count + 1));
            }
            setAccess(count);
        }
        console.log(access);
    }, [auth.token]);


    const formSubmitHandler = async event => {
        event.preventDefault();

        let comment = JSON.stringify({
            text: formState.inputs.text.value,
            date: new Date(),
            userId: auth.userId,
            songId: songId
        });

        try {
            const responseData = await sendRequest(`http://localhost:5000/api/comment/${songId}`, 'POST', comment, {
                'Content-Type': 'application/json'});
            setNewComment(responseData.comment);
        } catch (err) {}
    };

    let content= isLoaded ?
        (<SongInfo song={loadedSong}
                      formSubmitHandler={formSubmitHandler}
                      inputHandler={inputHandler}
                      likeHandler={likeHandler}
                      deleteHandler={deleteHandler}
                      error={error}
                      isLoggedIn={auth.isLoggedIn}
                      access={access}
            />) : null;


    return (
        <React.Fragment>
            {!isLoaded && (<Spinner />)}
            {content}
        </React.Fragment>
    )
}

export default Song;