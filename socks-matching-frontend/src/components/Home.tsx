import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Home: React.FC = () => {
	const authContextData = useContext(AuthContext);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (authContextData) {
			setLoading(false);
		}
	}, [authContextData]);

	const handleSignOut = async () => {
		await authContextData?.logout();
	};

	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					{authContextData?.currentUser ? (
						<>
							<h1>Home</h1>
							<Button variant="contained" onClick={handleSignOut}>
								Sign Out
							</Button>
						</>
					) : (
						// <Navigate to="/login" />
						<h1>Homealaksdoas</h1>
					)}
				</>
			)}
		</>
	);
};

export default Home;
