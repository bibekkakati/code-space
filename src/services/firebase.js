import firebase from "firebase";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_PROJECT_ID,
	projectId: process.env.REACT_APP_AUTH_DOMAIN,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
