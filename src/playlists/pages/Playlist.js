import React, {useState, useEffect, useContext} from "react";
import {useHistory, useParams} from 'react-router-dom';
import {useHttpClient} from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/Spinner";
import firstLetterCaps from "../../shared/util/firstLetterCaps";
import SongsList from "../../songs/components/SongsList";
import Button from "../../shared/components/UIElements/Button";
import button from '../../shared/components/UIElements/Button.module.css';
import {AuthContext} from "../../shared/context/auth-context";


const Playlist = () => {
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [loadedSongs, setLoadedSongs] = useState([]);
    const playlistId = useParams().playlistId;
    const [isLoading, setIsLoading] = useState(false);
    const auth = useContext(AuthContext);
    const {error, sendRequest} = useHttpClient();
    const history = useHistory();

    useEffect(() => {
        const fetchPlaylist = async () => {
            setIsLoading(true);
            try {
                const responseData = await sendRequest(`http://localhost:5000/users/${auth.userId}/playlists/${playlistId}`);
                setPlaylistTitle(responseData.title);
                setLoadedSongs(responseData.songs);
                setIsLoading(false);
            } catch (err) {}
        };
        fetchPlaylist();
    }, [sendRequest, auth.userId]);

    const playlistDeleteHandler = async playlistId => {
        try {
            await sendRequest(`http://localhost:5000/users/${auth.userId}/deletePlaylist/${playlistId}`,'DELETE');
            history.push('/');
        } catch (err) {}
    }

    return (
        <React.Fragment>
            {isLoading && (<Spinner />)}
            {auth.isLoggedIn && (
                <Button className={button.A} onClick={() => playlistDeleteHandler(playlistId)}>Удалить</Button>
            )}
            {loadedSongs.length > 0 ? (
                <div>
                    <h3 style={{textAlign: 'center'}}>{firstLetterCaps(playlistTitle)}</h3>
                    <SongsList songs={loadedSongs} />
                </div>
            ) : <div>Пока в плейлисте нет песен!</div>}
        </React.Fragment>
    )
};

export default Playlist;