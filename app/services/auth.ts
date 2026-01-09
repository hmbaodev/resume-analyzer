import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// TODO: Sign Up Service
const signUp = async (name: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: name,
    });
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// TODO: Sign In Service
const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log("Error logging in:", error);
    throw error;
  }
};

// TODO: Sign Out Service
const logout = async () => {};

// TODO: Password Reset Service
const resetPassword = async (email: string) => {};

// TODO: Update User Profile Service
const updateUserProfile = async (
  name: string,
  email: string,
  photoURL: string
) => {};

export { signUp, login, logout, resetPassword, updateUserProfile };
