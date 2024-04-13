import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const authCheck = (Component) => {
    return (props) => {
        const { user } = useContext(AuthContext);
        // console.log(user)
        const navigate = useNavigate();

        useEffect(() => {
            if (!user?.photoURL) {
                navigate('/welcome');
            }
        }, [user, navigate]);

        return <Component {...props} />;
    };
};

export default authCheck;