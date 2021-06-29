import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from "../shared/components/UIElements/Input";
import Button from "../shared/components/UIElements/Button";
import ModalError from "../shared/components/UIElements/ModalError";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from "../shared/util/validators";
import classes from "../admin/pages/Category.module.css";
import {useHttpClient} from "../shared/hooks/http-hook";
import {AuthContext} from '../shared/context/auth-context';
import {useForm} from "../shared/hooks/form-hook";

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );
    const history = useHistory();

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const formSubmitHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {
            const formData = JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            })
            try {
                const responseData = await sendRequest('http://localhost:5000/login', 'POST', formData, {
                    'Content-Type': 'application/json'
                });

                auth.login(responseData.userId, responseData.role, responseData.token);
                history.push('/');
            } catch (err) {}
        } else {
            const formData = JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            });
            try {
                const responseData = await sendRequest('http://localhost:5000/signup', 'POST', formData, {
                    'Content-Type': 'application/json'
                });
                auth.login(responseData.userId, responseData.token, responseData.role);
                history.push('/');
            } catch (err) {}
        }
    }

    return (
        <React.Fragment>
            <ModalError error={error} onClear={clearError}/>
            <div className={'container d-flex justify-content-around'}>
                <div className={'col-9'}>
                    <form onSubmit={formSubmitHandler}>
                        {!isLoginMode && (
                            <Input id={'name'}
                                   element={'input'}
                                   type={'text'}
                                   label={'Ваше имя'}
                                   validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
                                   errorText={error}
                                   onInput={inputHandler}
                            />
                        )}
                        <Input id={'email'}
                               element={'input'}
                               type={'email'}
                               label={'Электронная почта'}
                               validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE(), VALIDATOR_EMAIL]}
                               errorText={error}
                               onInput={inputHandler}
                        />
                        <Input id={'password'}
                               element={'input'}
                               type={'password'}
                               label={'Пароль'}
                               validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                        />
                        <hr/>
                        <div className={'d-flex justify-content-end'}>
                            <Button type="submit"
                                    className={classes.Button}
                                    disabled={!formState.isValid}
                            >Отправить</Button>
                        </div>
                    </form>
                    <Button inverse onClick={switchModeHandler} className={classes.Button}>
                         {isLoginMode ? 'Регистрация' : 'Вход'}
                    </Button>
                </div>
            </div>

        </React.Fragment>
    )
};

export default Auth;