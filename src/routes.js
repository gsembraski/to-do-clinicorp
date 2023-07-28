import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes, Outlet } from 'react-router-dom';

// Auth
import { onAuthStateChanged } from '@firebase/auth';
import { Auth } from './api/ApiConfig';

// Components
import LoginComponent from "./components/login/LoginComponent";
import WorkListComponent from "./components/workList/WorkListComponent";
import KanbanComponent from './components/kanban/KanbanComponent';

const PrivateRoute = ({ authenticated }) => {
    return !!authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default function RouteConfig() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check the user's authentication status on mount
        const unsubscribe = onAuthStateChanged(Auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
            setLoading(false);
        });

        // Cleanup the subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                {/* Public route accessible without authentication */}
                {/* <Route exact path="/" component={Home} /> */}

                {/* Public route accessible without authentication */}
                <Route path="/login" element={<LoginComponent />} />

                {/* Private route accessible only with authentication */}
                <Route exact path='/' element={<PrivateRoute authenticated={authenticated} />}>
                    <Route exact path='/' element={<WorkListComponent />} />
                    <Route exact path='/kanban/:id' element={<KanbanComponent />} />
                </Route>
            </Routes>
        </Router>
    );
};