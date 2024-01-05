import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

type PrivateRouteProps = {
	component: React.FC;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	component: Component,
}) => {
	const context = useContext(AuthContext);

	return context?.loading ? (
		<Loading />
	) : context?.currentUser ? (
		<Component />
	) : (
		<Navigate to="/" />
	);
};

export default PrivateRoute;
