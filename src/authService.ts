import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCustomToken,
} from "./firebase";
import api, { apiBaseUrl } from "./api";

export const verifyUser = async (): Promise<void> => {
  await api.post("auth/verify");
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

// Function to sign in with Google using Firebase
export const signInWithGoogle = async (): Promise<void> => {
  try {
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=908421014283-07c2rqi65hmg22s6vmss7tvc82q0bsl1.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(
      "http://localhost/auth/google/callback"
    )}&response_type=code&scope=openid email profile https://www.googleapis.com/auth/gmail.readonly&access_type=offline&prompt=consent`;

    window.open(oauthUrl, "_blank", "width=500,height=600");
    window.addEventListener("message", async (event) => {
      if (event.origin !== apiBaseUrl) return;
      const { firebaseToken } = event.data;
      await signInWithCustomToken(auth, firebaseToken);
    });
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
