import React from "react";
import SongCard from "./SongCard";


const SongsList = props => {

    return (
        <div className={'d-flex flex-wrap justify-content-center '}>
            {props.songs.map(s => (
                <SongCard key={s._id} id={s._id} title={s.title} artist={s.artist} category={s.category} image={`http://localhost:5000/${s.imgUrl}`}/>
            ))}
        </div>
    )
};

export default SongsList;