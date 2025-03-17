import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function RefreshHandle({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                // Check if the token has expired
                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token'); // Remove expired token
                    setIsAuthenticated(false);
                    navigate('/login', { replace: true }); // Redirect to login
                } else {
                    setIsAuthenticated(true);
                    if (['/', '/login', '/signup'].includes(location.pathname)) {
                        navigate('/dashboard', { replace: false });
                    }
                }
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);


    return (
        null
    )
}

export default RefreshHandle;
