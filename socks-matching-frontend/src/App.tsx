import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";

const App: React.FC = () => {
	return (
		<>
			<AuthContextProvider>
				<Router>
					<Routes>
						<Route path="/" element={<PrivateRoute component={Home} />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/login" element={<LogIn />} />
					</Routes>
				</Router>
			</AuthContextProvider>
		</>
	);
};

export default App;
