import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const requireAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const [authenticated, setAuthenticated] = useState(false);

        useEffect(() => {
            checkAuth();
        }, []);


        const checkAuth = async () => {
            try {
                await Auth.currentAuthenticatedUser();
                setAuthenticated(true);
                console.log("I am true")
            } catch(err) {
                setAuthenticated(false);
            }
        }
        return authenticated ?  <this.Component {...props}/> : <Navigate  to="/login" />;
    }

    return AuthenticatedComponent;
}

export default requireAuth;