import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes, Outlet, useNavigate } from 'react-router-dom';

// Auth
import { onAuthStateChanged } from '@firebase/auth';
import { Auth } from './api/ApiConfig';

// Components
import LoginComponent from "./components/login/LoginComponent";
import WorkListComponent from "./components/workList/WorkListComponent";
import KanbanComponent from './components/kanban/KanbanComponent';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const PrivateRoute = ({ authenticated }) => {
    return !!authenticated ? <Outlet /> : <Navigate to="/login" />;
};

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <AppBar>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: "inline-flex" }}>
                    <Typography variant="h6" component="div">
                        To-do Clinicorp |
                    </Typography>
                    <Button color="inherit" onClick={() => handleNavigation('/')}>
                        Home
                    </Button>
                </Box>
                <Button color="inherit" onClick={() => Auth.signOut()} sx={{ flexGrow: 0 }}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
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
            {!!authenticated ? <Navbar /> : null}

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