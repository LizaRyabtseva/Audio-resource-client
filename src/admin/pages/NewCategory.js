import React, {useContext} from "react";
import {useHistory} from 'react-router-dom';
import classes from './Category.module.css';
import {useForm} from "../../shared/hooks/form-hook";
import {useHttpClient} from "../../shared/hooks/http-hook";
import Input from "../../shared/components/UIElements/Input";
import {VALIDATOR_REQUIRE} from "../../shared/util/validators";
import ModalError from "../../shared/components/UIElements/ModalError";
import Button from "../../shared/components/UIElements/Button";
import {AuthContext} from "../../shared/context/auth-context";

const NewCategory = () => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm( {
        title: {
            value: '',
            isValid: false
        },
    }, false);
    const history = useHistory();


    const formSubmitHandler = async event => {
        event.preventDefault();

        try {
            await sendRequest('http://localhost:5000/admin/addCategory', 'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + auth.token
                }
            );
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
                               label={'Название категории'}
                               validators={[VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                        />
                        <hr/>
                        <div className={'d-flex justify-content-end'}>
                            <Button type="submit"
                                    className={"btn " + classes.Button}
                                    disabled={!formState.isValid}
                            >Добавить</Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>

    )
};

export default NewCategory;