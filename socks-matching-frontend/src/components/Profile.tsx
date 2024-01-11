import React, { useContext, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
	const authContextData = useContext(AuthContext);

	const handleSignOut = async () => {
		await authContextData?.logout();
	};

	return (
		<div>
			<h1>Profile</h1>
			<Button onClick={handleSignOut} variant="contained">
				Sign Out
			</Button>
		</div>
	);
};

export default Profile;
