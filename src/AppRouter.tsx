import * as http from './utils/http';
import { loggedIn } from './redux/userSlice';
import { useAppDispatch } from './redux/hooks';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import PageBase from "./pages/PageBase";
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import React from 'react';


const AppRouter = () => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
      const authCheck = async () => {
        // TODO: catch exception?
        const response = await http.authCheck();
        if(response.ok) {
          const data = await response.json();
          dispatch(loggedIn(data.user));
        }
      };
      authCheck();
    });

    return(<Router>
        <PageBase>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </PageBase>
    </Router>);
};

export default AppRouter;
