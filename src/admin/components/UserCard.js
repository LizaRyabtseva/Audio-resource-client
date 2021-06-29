import React, {useContext} from "react";
import classes from "./usersCard.module.css";
import Button from "../../shared/components/UIElements/Button";
import button from '../../shared/components/UIElements/Button.module.css';
import firstLetterCaps from "../../shared/util/firstLetterCaps";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import {useHistory} from "react-router-dom";
import ModalError from "../../shared/components/UIElements/ModalError";

const UserCard = props => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();

    const banHandler = async () => {
        if (props.isBanned.toString() === 'true' ) {
            try {
                await sendRequest('http://localhost:5000/admin/user/ban', 'POST',
                    JSON.stringify({
                        userId: props._id,
                        type: 'unban'
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + auth.token
                    });
                history.push('/');
            } catch (err) {}
        } else {
            try {
                await sendRequest('http://localhost:5000/admin/user/ban', 'POST',
                    JSON.stringify({
                        userId: props._id,
                        type: 'ban'
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + auth.token
                    });
                history.push('/');
            } catch (err) {}
        }
    };


    return (
        <React.Fragment >
            <ModalError error={error} onClear={clearError} />
            <div className={'card ' + classes.Card}>
                <div className="card-body">
                    <h5 className="card-title">Имя: {props.name.split(' ').map(x => firstLetterCaps(x) + ' ')}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Почта: {props.email}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Роль: {props.role}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Забанен: {props.isBanned}</h6>
                    <Button to={`/admin/updateUser/${props._id}`} className="card-link">Изменить</Button>
                    {props.isBanned.toString() === 'true' ? (
                        <Button className={button.A} onClick={banHandler}>Разбанить</Button>
                    ) : (
                        <Button className={button.A} onClick={banHandler}>Забанить</Button>
                    )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserCard;