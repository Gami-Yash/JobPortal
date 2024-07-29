import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProviderComponents/authProvider';
import AccessDeniedModal from '../authProviderComponents/accessDeniedModal';

const AdminProtectedRoute = ({ element: Component }) => {
    const { auth, loading } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!loading && (!auth.isAuthenticated || !auth.isadmin)) {
            setShowModal(true);
        }
    }, [loading, auth]);

    const handleClose = () => {
        setShowModal(false);
        setRedirect(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (auth.isAuthenticated && auth.isadmin) {
        return <Component />;
    }

    if (redirect) {
        return <Navigate to={location.state?.from || '/'} state={{ from: location }} />;
    }

    return <>{showModal && <AccessDeniedModal onClose={handleClose} />}</>;
};

export default AdminProtectedRoute;
