import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const apiBaseUrl = "https://mailbrief-be.vercel.app";

export const ensureFirebaseInitialized = () => {
  return new Promise((resolve) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, () => {
      resolve(true);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  });
};

// Create an Axios instance
const api = axios.create({
  baseURL: apiBaseUrl,
});

// Function to fetch the current token from Firebase
const fetchToken = async () => {
  await ensureFirebaseInitialized();
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken(true);
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  }
  return null;
};

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    if (!token) {
      token = await fetchToken();
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest._retryCount < 2
    ) {
      originalRequest._retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const token = await fetchToken();
        if (token) {
          const newRequest = {
            ...originalRequest,
            headers: {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`, // Ensure Authorization is properly updated
            },
          };

          // Retry the original request with the new token
          return api(newRequest);
        }
      } catch (e) {
        console.error("Error fetching token:", e);
        return Promise.reject(error);
      }
    } else if (originalRequest._retryCount >= 5) {
      return Promise.reject({
        response: {
          status: 500,
          message: "Maximum retry attempts reached. Please try again later.",
        },
      });
    }
    return Promise.reject(error);
  }
);

export default api;
