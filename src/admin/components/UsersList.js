import React from "react";
import UserCard from "./UserCard";

const UsersList = props => {
    return (
        <div className={'d-flex flex-wrap justify-content-around'} style={{margin: '1rem'}}>
            {props.users.map(u => (
                <UserCard key={u._id} _id={u._id} name={u.name} email={u.email} role={u.role} isBanned={u.isBanned.toString()}/>
            ))}
        </div>
    )
}
export default UsersList;