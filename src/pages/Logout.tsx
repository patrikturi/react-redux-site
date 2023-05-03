import React from "react";
import { Spinner } from "react-bootstrap";
import * as http from '../utils/http';
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../utils/location";
import { loggedOut } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        http.logout().then(() => {
            dispatch(loggedOut());
            navigate(HOME_PATH);
        });
    }, [navigate, dispatch]);

    return (<div>
        <Spinner animation="border" variant="primary" />
    </div>)
};

export default Logout;
