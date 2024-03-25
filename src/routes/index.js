import React, { useEffect } from "react";

import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import isAuthenticated from "../services/isAuthenticated";

function DashboardRoute() {
    const navigate = useNavigate();
  
    useEffect(() => {
        async function checkLogin() {
            const isLogged = await isAuthenticated();
            
            if (!isLogged) {
                navigate("/signin");
            }
        }
        
        checkLogin();
    }, [navigate]);
  
    return isAuthenticated() ? <Dashboard /> : null;
}

export default function Routers() {
	return (
		<>
			<Router>
				<Routes>

					<Route index path="/" element={<Navigate to="/signin" />} />

					<Route path="/signin" element={<SignIn />} />
					<Route path="/dashboard/*" element={<DashboardRoute />} />
				</Routes>
			</Router>
		</>
	);
}