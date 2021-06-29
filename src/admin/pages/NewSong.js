import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import ModalError from '../../shared/components/UIElements/ModalError';
import Input from '../../shared/components/UIElements/Input';
import {VALIDATOR_REQUIRE} from '../../shared/util/validators';
import classes from './Category.module.css';
import {useHttpClient} from '../../shared/hooks/http-hook';
import {useForm} from '../../shared/hooks/form-hook';
import ImageUpload from '../../shared/components/UIElements/ImageUpload';
import Button from '../../shared/components/UIElements/Button';
import {AuthContext} from '../../shared/context/auth-context';

const NewSong = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [formState, inputHandler] = useForm( {
        title: {
            value: '',
            isValid: false
        },
        artist: {
            value: '',
            isValid: false
        },
        category: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        },
        audio: {
            value: null,
            isValid: false
        }
    }, false);

    const { error, sendRequest, clearError } = useHttpClient();

    const formSubmitHandler = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title',formState.inputs.title.value);
        formData.append('artist',formState.inputs.artist.value);
        formData.append('category',formState.inputs.category.value);
        formData.append('image',formState.inputs.image.value);
        formData.append('audio',formState.inputs.audio.value);

        try {
            await sendRequest('http://localhost:5000/admin/addSong', 'POST', formData, {
                Authorization: "Bearer " + auth.token
            });
            history.push('/');
        } catch (err) {}
    }

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
                               validators={[VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                        />
                        <Input id={'artist'}
                               element={'input'}
                               type={'text'}
                               label={'Исполнитель'}
                               validators={[VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                        />
                        <Input id={'category'}
                               element={'input'}
                               label={'Категория'}
                               validators={[VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                        />
                        <ImageUpload id={'image'}
                                     fileTypes={'.jpg, .png, .jpeg'}
                                     onInput={inputHandler}
                        />
                        <ImageUpload id={'audio'}
                                     fileTypes={'.mp3'}
                                     onInput={inputHandler}
                        />
                        <hr/>
                        <div className={'d-flex justify-content-end'}>
                            <Button type="submit"
                                    className={classes.Button}
                                    disabled={!formState.isValid}
                            >Создать</Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NewSong;