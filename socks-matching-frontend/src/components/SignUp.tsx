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

const SignUp: React.FC = () => {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const confirmPassword = useRef<HTMLInputElement>(null);

	const authContextData = useContext(AuthContext);

	const handleSignUp = async () => {
		if (
			email.current !== null &&
			password.current !== null &&
			confirmPassword.current !== null
		) {
			if (password.current.value !== confirmPassword.current.value) {
				alert("Passwords do not match");
				return;
			}

			const res = await authContextData?.signup(
				email.current.value,
				password.current.value
			);

			if (res) {
				alert("Sign up successful");
			} else {
				alert("Sign up failed");
			}
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
								Sign Up
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

							<FormControl>
								<TextField
									inputRef={confirmPassword}
									label="Confirm Password"
									type="password"
									id="confirm-password"
									variant="outlined"
								/>
							</FormControl>

							<Button variant="contained" onClick={handleSignUp}>
								Sign Up
							</Button>

							<Typography variant="body1" component="div" gutterBottom>
								Already have an account? <a href="/">Log In</a>
							</Typography>
						</Stack>
					</Card>
				</Box>
			)}
		</>
	);
};

export default SignUp;
