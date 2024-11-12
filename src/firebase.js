import { initializeApp } from "firebase/app";
import { getDatabase, set, ref as databaseRef } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd2lC9VwV39FO0fJAbErsLKTmMT-zLnhA",
  authDomain: "sibers-chat.firebaseapp.com",
  databaseURL:
    "https://sibers-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sibers-chat",
  storageBucket: "sibers-chat.firebasestorage.app",
  messagingSenderId: "23913749667",
  appId: "1:23913749667:web:d9984fbc0a29460d26f316",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// Register
const registerUser = async (avatarUrl, username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // User successfully created
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,
      photoURL: avatarUrl,
    });
    const userRef = databaseRef(getDatabase(), `users/${user.uid}`);
    await set(userRef, {
      id: user.uid,
      displayName: username,
      avatarUrl: avatarUrl,
    });

    return user.displayName;
  } catch (error) {
    console.error(error);
    alert("Failed to register user.");
  }
};

// Auth
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    return user.displayName;
  } catch (error) {
    console.error(error);
    alert("Incorrect password or email");
  }
};

//Logout
const logout = async () => {
  try {
    await signOut(auth);
    // User signed out
  } catch (error) {
    console.error(error);
  }
};

export default { registerUser, loginUser, logout };
