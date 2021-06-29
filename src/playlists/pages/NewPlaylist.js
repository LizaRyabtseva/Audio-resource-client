import React, {useContext} from 'react';
import Input from "../../shared/components/UIElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import Button from "../../shared/components/UIElements/Button";
import button from "../../admin/pages/Category.module.css";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useForm} from "../../shared/hooks/form-hook";
import {AuthContext} from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/UIElements/ImageUpload";
import ModalError from "../../shared/components/UIElements/ModalError";
import {useHistory} from "react-router-dom";

const NewPlaylist = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm( {
        title: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false);


    const formSubmitHandler = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title',formState.inputs.title.value);
        formData.append('image',formState.inputs.image.value);
        try {
            await sendRequest(`http://localhost:5000/users/${auth.userId}/newPlaylist`,
                'POST', formData);
            history.push('/');
        } catch (err) {}

    }

    return (
        <React.Fragment>
            <ModalError error={error} onClear={clearError}/>
            <div className={'container d-flex justify-content-around'}>
                <div className={'col-8'}>
                    <form onSubmit={formSubmitHandler}>
                        <Input id={'title'}
                               element={'input'}
                               type={'text'}
                               label={'Название плейлиста'}
                               validators={[VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                        />
                        <div className={'mb-3'}>
                            <ImageUpload id={'image'} fileTypes={'.jpg, .png, .jpeg'} onInput={inputHandler} />
                        </div>
                        <hr/>
                        <div className={'d-flex justify-content-end'}>
                            <Button type="submit"
                                    className={"btn " + button.Button}
                                    disabled={!formState.isValid}
                            >Создать</Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
};

export default NewPlaylist;