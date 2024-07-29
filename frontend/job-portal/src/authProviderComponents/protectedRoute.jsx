import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProviderComponents/authProvider';
import AccessDeniedModal from '../authProviderComponents/accessDeniedModal';

const ProtectedRoute = ({ element: Component }) => {
    const { auth, loading } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!loading && !auth.isAuthenticated) {
            setShowModal(true);
        }
    }, [loading, auth]);

    const handleCloseModal = () => {
        setShowModal(false);
        setShouldNavigate(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (shouldNavigate) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (!auth.isAuthenticated) {
        return (
            <>
                {showModal && <AccessDeniedModal onClose={handleCloseModal} />}
            </>
        );
    }

    return <Component />;
};

export default ProtectedRoute;
