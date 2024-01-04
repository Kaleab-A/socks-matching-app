import { Box, Input, Stack, Typography, Card, Button } from "@mui/material";
import React from "react";

const SignUp: React.FC = () => {
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
						width: "20%",
						paddingX: 3,
						paddingY: 8,
						backgroundColor: "#f5f5f5",
					}}
					variant="outlined"
				>
					<Stack spacing={2} alignItems="center">
						<Typography variant="h3" component="div" gutterBottom>
							Log in
						</Typography>
						<Input placeholder="Email" type="email" id="email" />
						<Input placeholder="Password" type="password" id="password" />
						<Input
							placeholder="Confirm Password"
							type="password"
							id="confirm-password"
						/>
						<Button variant="contained">Sign Up</Button>
					</Stack>
				</Card>
			</Box>
		</>
	);
};

export default SignUp;
