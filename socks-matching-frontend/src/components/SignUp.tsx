import React, { useRef } from "react";
import {
	Box,
	Stack,
	Typography,
	Card,
	Button,
	FormControl,
	TextField,
} from "@mui/material";

const SignUp: React.FC = () => {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const confirmPassword = useRef<HTMLInputElement>(null);

	return (
		<>
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

						<Button variant="contained">Sign Up</Button>

						<Typography variant="body1" component="div" gutterBottom>
							Already have an account? <a href="/login">Log In</a>
						</Typography>
					</Stack>
				</Card>
			</Box>
		</>
	);
};

export default SignUp;
