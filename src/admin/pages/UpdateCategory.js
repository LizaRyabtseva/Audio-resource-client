import React, {useState, useEffect, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import classes from './Category.module.css';
import {useForm} from '../../shared/hooks/form-hook';
import {useHttpClient} from '../../shared/hooks/http-hook';
import Input from '../../shared/components/UIElements/Input';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import firstLetterCaps from '../../shared/util/firstLetterCaps';
import ModalError from '../../shared/components/UIElements/ModalError';
import {AuthContext} from '../../shared/context/auth-context';

const AddCategory = () => {
    const auth = useContext(AuthContext);
    const [loadedCategory, setLoadedCategory] = useState();
    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm( {
        title: {
            value: '',
            isValid: false
        },
    }, false);
    const categoryId = useParams().categoryId;
    const history = useHistory();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/admin/categories/${categoryId}`);
                setLoadedCategory(responseData.category);
                setFormData({
                    title: responseData.category.title.value,
                    isValid: true
                })
            } catch (err) {}
        };
        fetchCategories();
    }, [sendRequest, categoryId, setFormData]);

    const formSubmitHandler = async event => {
        event.preventDefault();

        console.log(formState.inputs.title.value);
        try {
            const formData = JSON.stringify({title: formState.inputs.title.value});
            await sendRequest(`http://localhost:5000/admin/updateCategory/${categoryId}`, 'PATCH', formData,
                {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + auth.token
                });
            history.push('/');
        } catch (err) {}
    }

    if (!loadedCategory && !error) {
        return (
            <div className={'container'}>
                <h2>Не удалось найти категорию!</h2>
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
                               label={'Название категории'}
                               validators={[VALIDATOR_REQUIRE()]}
                               errorText={error}
                               onInput={inputHandler}
                               initialValue={firstLetterCaps(loadedCategory.title)}
                               initialValid={true}
                        />
                        <hr/>
                        <div className={'d-flex justify-content-end'}>
                            <button type="submit" className={"btn " + classes.Button}>Изменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>

    )
};

export default AddCategory;