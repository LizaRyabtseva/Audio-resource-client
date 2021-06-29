import React, {useState} from 'react';
import {VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useForm} from "../../shared/hooks/form-hook";
import Input from "../../shared/components/UIElements/Input";
import Button from "../../shared/components/UIElements/Button";
import button from "../../shared/components/UIElements/Button.module.css";
import SongsList from "../components/SongsList";

const Search = () => {
    const [foundSongs, setFoundSongs] = useState([]);
    const { error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm({
            title: {
                value: "",
                isValid: false,
            },
        },false);

    const formSubmitHandler = async event => {
        event.preventDefault();

        try {
            const responseData = await sendRequest('http://localhost:5000/api/search', 'POST', JSON.stringify({
                title: formState.inputs.title.value
            }), { "Content-Type": "application/json" });
            setFoundSongs(responseData.songs);
        } catch (err) {}
    }

    return (
        <React.Fragment>
            <div className={'container d-flex justify-content-around'}>
                <div className={'col-10'}>
                    <form onSubmit={formSubmitHandler}>
                        <Input
                            id="title"
                            element="input"
                            type="text"
                            label="Название песни"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Search string cant be empty"
                            onInput={inputHandler}
                            initialValid={true}
                        />
                        <div className={'d-flex justify-content-end'}>
                            <Button className={button.Button} type="submit" disabled={!formState.isValid}>Искать</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                {foundSongs && foundSongs.length > 0 && (<SongsList  songs={foundSongs}/>)}
            </div>
        </React.Fragment>
    )
}

export default Search;