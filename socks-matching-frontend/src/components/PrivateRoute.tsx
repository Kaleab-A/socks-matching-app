import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type PrivateRouteProps = {
	component: React.FC;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	component: Component,
	...rest
}) => {
	const context = useContext(AuthContext);

	return (
		<Route {...rest}>
			{context?.currentUser ? <Component /> : <Navigate to="/login" />}
		</Route>
	);
};
