import React, { createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
	UserCredential,
} from "firebase/auth";
import { auth } from "../firebase";

type AuthContextType = {
	currentUser: User | undefined;
	setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	isAdmin: boolean;
	setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
	signup: (email: string, password: string) => Promise<UserCredential>;
	login: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User>();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser(undefined);
			}
		});
		return unsubscribe;
	}, []);

	const signup = async (email: string, password: string) => {
		return await createUserWithEmailAndPassword(auth, email, password);
	};

	const login = async (email: string, password: string) => {
		return await signInWithEmailAndPassword(auth, email, password);
	};

	const logout = async () => {
		return await signOut(auth);
	};

	const value: AuthContextType = {
		currentUser,
		setCurrentUser,
		isAdmin,
		setIsAdmin,
		signup,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
