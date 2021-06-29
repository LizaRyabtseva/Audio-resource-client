import React, {useEffect, useState, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import ModalError from '../../shared/components/UIElements/ModalError';
import Input from '../../shared/components/UIElements/Input';
import {VALIDATOR_REQUIRE} from '../../shared/util/validators';
import classes from './Category.module.css';
import {useHttpClient} from '../../shared/hooks/http-hook';
import {useForm} from '../../shared/hooks/form-hook';
import Button from '../../shared/components/UIElements/Button';
import firstLetterCaps from '../../shared/util/firstLetterCaps';
import {AuthContext} from '../../shared/context/auth-context';
import Spinner from '../../shared/components/UIElements/Spinner';

const UpdateUser = () => {
    const [user, setUser] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const auth = useContext(AuthContext);
    const history = useHistory();
    const userId = useParams().userId;

    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm( {
        name: {
            value: '',
            isValid: false
        },
        role: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/admin/users/${userId}`, 'GET', null,
                    {
                        Authorization: "Bearer " + auth.token
                    });
                setUser(responseData.user);
                console.log(responseData);
                setFormData({
                    name: {
                        value: responseData.user.name.value,
                        isValid: true
                    },
                    role: {
                        value: responseData.user.role.value,
                        isValid: true
                    }
                }, true);
                setIsLoaded(true);
            } catch (err) {}
        };
        fetchSong();
    }, [sendRequest, setFormData, userId])


    const formSubmitHandler = async event => {
        event.preventDefault();

        const formData = JSON.stringify({
            name: formState.inputs.name.value,
            role: formState.inputs.role.value
        });

        try {
            await sendRequest(`http://localhost:5000/admin/updateUser/${userId}`, 'PATCH', formData, {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + auth.token
            });
            history.push('/');
        } catch (err) {}
    }

    return (
        <React.Fragment>
            {!isLoaded && (<Spinner />)}
            <ModalError error={error} onClear={clearError}/>
            {isLoaded && (
                <div className={'container d-flex justify-content-around'}>
                    <div className={'col-9'}>
                        <form onSubmit={formSubmitHandler}>
                            <Input id={'name'}
                                   element={'input'}
                                   type={'text'}
                                   label={'Имя пользоваетеля'}
                                   validators={[VALIDATOR_REQUIRE()]}
                                   errorText={error}
                                   onInput={inputHandler}
                                   initialValue={user.name.split(' ').map(x => firstLetterCaps(x)).join(' ')}
                                   initialValid={true}
                            />
                            <Input id={'role'}
                                   element={'input'}
                                   type={'text'}
                                   label={'Роль'}
                                   validators={[VALIDATOR_REQUIRE()]}
                                   errorText={error}
                                   onInput={inputHandler}
                                   initialValue={firstLetterCaps(user.role)}
                                   initialValid={true}
                            />
                            <hr/>
                            <div className={'d-flex justify-content-end'}>
                                <Button type="submit" className={classes.Button}>Изменить</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default UpdateUser;