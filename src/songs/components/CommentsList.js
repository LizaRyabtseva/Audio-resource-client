import React from 'react';
import CommentCard from "./CommentCard";
import firstLetterCaps from "../../shared/util/firstLetterCaps";

const CommentsList = props => {
    return (
        <React.Fragment>
            {props.comments.map(c => (
                <CommentCard key={c.id} user={`${firstLetterCaps(c.user.split(' ')[0])} ${firstLetterCaps(c.user.split(' ')[1])}`} date={`${c.year}.${c.month}.${c.day} ${c.hour}:${c.minutes}`} text={firstLetterCaps(c.text)}/>
            ))}
        </React.Fragment>
    )
};

export default CommentsList;