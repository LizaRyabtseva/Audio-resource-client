import React, {useEffect, useState, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import ModalError from '../../shared/components/UIElements/ModalError';
import Input from '../../shared/components/UIElements/Input';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import classes from './Category.module.css';
import {useHttpClient} from '../../shared/hooks/http-hook';
import {useForm} from '../../shared/hooks/form-hook';
import Button from '../../shared/components/UIElements/Button';
import firstLetterCaps from '../../shared/util/firstLetterCaps';
import {AuthContext} from '../../shared/context/auth-context';

const UpdateSong = () => {
    const [loadedSong, setLoadedSong] = useState();
    const songId = useParams().songId;
    const auth = useContext(AuthContext);
    const history = useHistory();

    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm( {
        title: {
            value: '',
            isValid: false
        },
        artist: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/admin/songs/${songId}`);
                setLoadedSong(responseData.song);
                setFormData({
                    title: {
                        value: responseData.song.title.value,
                        isValid: true
                    },
                    artist: {
                        value: responseData.song.artist.value,
                        isValid: true
                    }
                }, true);
            } catch (err) {}
        };
        fetchSong();
    }, [sendRequest, songId, setFormData])


    const formSubmitHandler = async event => {
        event.preventDefault();

        const formData = JSON.stringify({
            title: formState.inputs.title.value,
            artist: formState.inputs.artist.value
        })
        try {
            await sendRequest(`http://localhost:5000/admin/updateSong/${songId}`, 'PATCH', formData, {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + auth.token
            });
            history.push('/');
        } catch (err) {}
    }

    if (!loadedSong && !error) {
        return (
            <div className={'container'}>
                <h2>Не удалось найти песню!</h2>
            </div>
        )
    };

    return (
        <React.Fragment>
            <ModalError error={error} onClear={clearError}/>
            <div className={'container d-flex justify-content-around'}>
                <div className={'col-9'}>
                    <form onSubmit={formSubmitHandler}>
                        <Input id={'title'}
                               element={'input'}
                               type={'text'}
                               label={'Название песни'}
                               validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                               initialValue={firstLetterCaps(loadedSong.title)}
                               initialValid={true}
                        />
                        <Input id={'artist'}
                               element={'input'}
                               type={'text'}
                               label={'Исполнитель'}
                               validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                               initialValue={firstLetterCaps(loadedSong.artist)}
                               initialValid={true}
                        />
                        <hr/>
                        <div className={'d-flex justify-content-end'}>
                            <Button type="submit" className={"btn " + classes.Button}>Изменить</Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateSong;