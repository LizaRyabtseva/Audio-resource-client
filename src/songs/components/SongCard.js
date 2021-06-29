import React, {useState, useContext, useEffect} from "react";
import Button from "../../shared/components/UIElements/Button";
import button from '../../shared/components/UIElements/Button.module.css';
import classes from './SongCard.module.css'
import nav from "../../shared/components/Navigation/components/NavLinks.module.css";
import {Link} from "react-router-dom";
import firstLetterCaps from "../../shared/util/firstLetterCaps";
import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/Spinner";

const SongCard = props => {
    const auth = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {error, sendRequest} = useHttpClient();


    useEffect(() => {
        const fetchPlaylists = async () => {
            if (auth.isLoggedIn) {
                try {
                    const responseData = await sendRequest(`http://localhost:5000/users/${auth.userId}/playlists`);
                    setPlaylists(responseData.playlists);
                    setIsLoaded(true);
                } catch (err) {
                }
            } else {
                setPlaylists([]);
                setIsLoaded(true);
            }
        }
        fetchPlaylists();
    }, [sendRequest]);


    const addSongToPlaylistHandler = async playlistId => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/users/addSongToPlaylist`, 'POST', JSON.stringify({
                userId: auth.userId,
                songId: props.id,
                playlistId
            }), {'Content-Type': 'application/json'});
            console.log(responseData.message);
        } catch (err) {}
    }


    return (
        <React.Fragment>
        {!isLoaded && (<Spinner />)}
        {isLoaded && (
        <div className={'card mb-2 ' + classes.Card}>
            <h3>{error}</h3>
            <div className="row g-0">
                <div className={'col-1 ' + classes.ImgDiv}>
                    <img src={props.image} className={'card-img ' } alt="..."/>
                </div>
                <div className={'col-6 card-body'}>
                    <h5 className={'card-title fs-6 ' + classes.CardTitle}>
                        <small>Название:</small> {props.title.split(' ').map(x => firstLetterCaps(x) + ' ')}</h5>
                    <small>Исполнитель: </small>{props.artist.split(' ').map(x => firstLetterCaps(x) + ' ')}
                </div>
                <div className={'col-3 d-flex flex-wrap justify-content-end fs-6'}>
                    <Link to={`/api/songs/${props.id}`} className={'btn float-end fs-6 ' + button.A}>Слушать</Link>
                    {auth.isLoggedIn && (
                        <div style={{textAlign: 'center'}}>
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button"
                                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                        aria-expanded="false" style={{color: '#efe9e9'}}>Добавить в плейлист
                                </button>
                                <ul className={'dropdown-menu ' +nav.MenuHeader}  aria-labelledby="dropdownMenuButton1">
                                    {playlists.map(p => (
                                        <li key={p._id}>
                                            <button className={nav.Dropdown}
                                                  onClick={() => addSongToPlaylistHandler(p._id)} >{p.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        )}
        </React.Fragment>
    )
}

export default SongCard;