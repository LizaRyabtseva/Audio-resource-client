import React, {useEffect, useState} from 'react';
import SongsList from '../components/SongsList';
import Spinner from '../../shared/components/UIElements/Spinner';
import CategoryItem from '../../admin/components/CategoryItem';
import firstLetterCaps from '../../shared/util/firstLetterCaps';
import {useHttpClient} from '../../shared/hooks/http-hook';
import CategoriesList from "../../playlists/components/CategoriesList";

const Main = () => {
    const [songs, setSongs] = useState();
    const [categories, setCategories] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const {error, sendRequest} = useHttpClient();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/categories`);
                setCategories(responseData.categories);
                console.log(responseData);
            } catch (err) {}

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/songs`);
                setSongs(responseData.songs);
                setIsLoaded(true);
                console.log(responseData);
            } catch (err) {}
        };
        fetchCategories();
    }, [sendRequest])

    return (
        <React.Fragment>
            {!isLoaded && (
                <Spinner />
            )}
            {isLoaded && (
                <React.Fragment>
                    <CategoriesList categories={categories}/>
                    <SongsList songs={songs} />
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Main;