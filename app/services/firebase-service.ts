import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// TODO: Sign Up Service
const signUp = async (name: string, email: string, password: string) => {};

// TODO: Sign In Service
const login = async (email: string, password: string) => {};

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
