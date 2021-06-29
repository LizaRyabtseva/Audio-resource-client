import React from 'react';
import PlaylistCard from "./PlaylistCard";

const PlaylistsList = props => {
    return (
        <div className={'d-flex flex-wrap justify-content-start'}
             style={{width: '53%', marginLeft: '12rem', paddingTop: '2rem', backgroundColor: '#282626', boxShadow: '3px 5px 11px 0px #100F0F'}}>
            {props.playlists.map(p => (
                <PlaylistCard title={p.title} id={p._id} imgUrl={p.imgUrl} key={p._id} to={`/users/${props.userId}/playlists/${p._id}`}/>
            ))}
        </div>
    )
}

export default PlaylistsList;