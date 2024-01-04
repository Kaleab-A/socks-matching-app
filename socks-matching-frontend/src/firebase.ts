import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
	apiKey: process.env.REACT_API_KEY,
	authDomain: process.env.REACT_AUTH_DOMAIN,
	projectId: process.env.REACT_PROJECT_ID,
	storageBucket: process.env.REACT_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_ID,
	measurementId: process.env.REACT_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
