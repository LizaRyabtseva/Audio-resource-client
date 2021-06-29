import React, {useState, useEffect, useContext} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import Spinner from '../../shared/components/UIElements/Spinner';
import {AuthContext} from "../../shared/context/auth-context";
import UsersList from "../components/UsersList";

const User = () => {
    const [users, setUsers] = useState();
    const [isLoaded, setIsLoaded] = useState();
    const { error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const responseData = await sendRequest('http://localhost:5000/admin/users', 'GET', null,
                {
                Authorization: "Bearer " + auth.token
            });
            setUsers(responseData.users);
            setIsLoaded(true);
            console.log(responseData);
        }
        fetchUsers();
    }, [sendRequest]);


    return (
        <React.Fragment>
            {!isLoaded && (<Spinner />)}
            {isLoaded && (
                <UsersList users={users} />
            )}
        </React.Fragment>
    )
}

export default User;