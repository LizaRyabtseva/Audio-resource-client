import React, {useState, useEffect, useContext} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useHttpClient} from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/Spinner";
import firstLetterCaps from "../../shared/util/firstLetterCaps";
import SongsList from "../../songs/components/SongsList";
import Button from "../../shared/components/UIElements/Button";
import button from '../../shared/components/UIElements/Button.module.css';
import {AuthContext} from "../../shared/context/auth-context";


const Category = () => {
    const [loadedCategory, setCategory] = useState('');
    const [loadedSongs, setLoadedSongs] = useState([]);
    const categoryId = useParams().categoryId;
    const [isLoading, setIsLoading] = useState(false);
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {error, sendRequest} = useHttpClient();

    useEffect(() => {
        const fetchPlaylist = async () => {
            setIsLoading(true);
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/categories/${categoryId}`);
                setCategory(responseData.category);
                setLoadedSongs(responseData.songs);
                setIsLoading(false);
            } catch (err) {}
        };
        fetchPlaylist();
    }, [sendRequest]);

    const deleteHandler = async categoryId => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/admin/deleteCategory/${categoryId}`, 'DELETE', null,
                {
                    Authorization: 'Bearer ' + auth.token
                });
            console.log(responseData);
        } catch (err) {}
        history.push('/');
    };

    return (
        <React.Fragment>
            {isLoading && (
                <Spinner />
            )}
            {auth.role === 'admin' && (
                <Button className={'btn ' + button.A} onClick={() => deleteHandler(categoryId)}>Удалить</Button>
            )}
            {auth.role === 'admin' && (
                <Button className={button.Button} to={`/admin/updateCategory/${categoryId}`}>Изменить</Button>
            )}
            {loadedSongs.length > 0 ? (
                <div>
                    <h3 style={{textAlign: 'center'}}>{loadedCategory.split(' ').map(x => firstLetterCaps(x) + ' ')}</h3>
                    <SongsList songs={loadedSongs} />
                </div>
                ) : <div>Пока в категории нет песен!</div>}
        </React.Fragment>
    )
};

export default Category;