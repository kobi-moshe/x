import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "./firebase";
import api from "./api";
import { GoogleAuthProvider } from "firebase/auth";

export const verifyUser = async (): Promise<void> => {
  await api.get("auth/verify");
};

export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await verifyUser();
  } catch (error) {
    console.error(
      "Sign Up Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    await verifyUser();
  } catch (error) {
    console.error(
      "Sign In Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
};

// export const signInWithGoogle = async (): Promise<void> => {
//   try {
//     await signInWithPopup(auth, provider);
//     await verifyUser();
//   } catch (error) {
//     console.error(
//       "Google Sign-In Error:",
//       error instanceof Error ? error.message : "Unknown error"
//     );
//     throw error;
//   }
// };
// Function to sign in with Google using Firebase
export const signInWithGoogle = async (): Promise<void> => {
  try {
    // Sign in with Firebase and request Gmail permissions
    const result = await signInWithPopup(auth, provider);

    // Get the OAuth token and other credentials
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken; // Use this to fetch Gmail emails
    if (accessToken) {
      localStorage.setItem("gmailToken", accessToken);
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await auth.signOut();
    localStorage.removeItem("token");
  } catch (error) {
    console.error(
      "Sign Out Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
};
