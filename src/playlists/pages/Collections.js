import React, {useState, useEffect, useContext} from 'react';
import PlaylistCard from "../components/PlaylistCard";
import {useHttpClient} from "../../shared/hooks/http-hook";
import Spinner from '../../shared/components/UIElements/Spinner'
import CategoriesList from "../components/CategoriesList";
import PlaylistsList from "../components/PlaylistsList";
import {AuthContext} from "../../shared/context/auth-context";


const Collections = () => {
    const auth = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {error, sendRequest} = useHttpClient();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const responseData = await sendRequest(`http://localhost:5000/users/${auth.userId}/playlists`);
                setPlaylists(responseData.playlists);
            } catch (err) {}

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/categories`);
                setCategories(responseData.categories);
            } catch (err) {}
            setIsLoading(false);
        };
        fetchData();
    }, [sendRequest, auth.userId]);



    return (
        <React.Fragment>
            {isLoading && (
                <Spinner />
            )}
            {categories.length > 0 && (
                <CategoriesList categories={categories} />
            )}
            {playlists.length > 0 && (
                <PlaylistsList playlists={playlists} userId={auth.userId} />
            )}
        </React.Fragment>
    )
};

export default Collections;