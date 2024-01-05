import React, { useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import {
	Box,
	Stack,
	Typography,
	Card,
	Button,
	FormControl,
	TextField,
} from "@mui/material";
import Loading from "./Loading";

const LogIn: React.FC = () => {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const authContextData = useContext(AuthContext);

	const handleLogIn = async () => {
		if (email.current && password.current) {
			await authContextData?.login(email.current.value, password.current.value);
		}
	};

	return (
		<>
			{authContextData?.loading ? (
				<Loading />
			) : authContextData?.currentUser ? (
				<Navigate to="/home" />
			) : (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<Card
						sx={{
							width: "25%",
							minWidth: "300px",
							paddingX: 2,
							paddingY: 6,
							backgroundColor: "#f5f5f5",
						}}
						variant="outlined"
					>
						<Stack spacing={2} alignItems="center">
							<Typography variant="h3" component="div" gutterBottom>
								Log in
							</Typography>
							<FormControl>
								<TextField
									inputRef={email}
									label="Email"
									type="email"
									id="email"
									variant="outlined"
								/>
							</FormControl>

							<FormControl>
								<TextField
									inputRef={password}
									label="Password"
									type="password"
									id="password"
									variant="outlined"
								/>
							</FormControl>

							<Button variant="contained" onClick={handleLogIn}>
								Log In
							</Button>

							<Typography variant="body1" component="div" gutterBottom>
								Already have an account? <a href="/signup">Sign Up</a>
							</Typography>
						</Stack>
					</Card>
				</Box>
			)}
		</>
	);
};

export default LogIn;
