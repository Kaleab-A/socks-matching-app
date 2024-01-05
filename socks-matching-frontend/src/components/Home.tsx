import React, { useContext, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Footer from "./Footer";
import Profile from "./Profile";
import Search from "./Search";
import Recent from "./Recent";

const Home: React.FC = () => {
	const authContextData = useContext(AuthContext);
	const [mainPageVal, setMainPageVal] = useState<number>(0);

	const handleSignOut = async () => {
		await authContextData?.logout();
	};

	return (
		<Container
			style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
		>
			<Box style={{ flex: 1 }}>
				<h1> Home </h1>

				{mainPageVal === 0 && <Profile />}
				{mainPageVal === 1 && <Search />}
				{mainPageVal === 2 && <Recent />}

				<Button onClick={handleSignOut} variant="contained">
					Sign Out
				</Button>
			</Box>
			<Footer value={mainPageVal} setValue={setMainPageVal} />
		</Container>
	);
};

export default Home;
