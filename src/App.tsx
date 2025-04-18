import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthContext } from "./authContext";
import { useEffect, useState } from "react";
import { AuthPage } from "./common";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BriefsBoard } from "./BriefsBoard";
import { auth } from "./firebase";
import { User } from "firebase/auth";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/styles";
import { verifyUser } from "./authService";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { TermsConditions } from "./TermsConditions";
// import ReactGA from "react-ga4";
import { MainContainer } from "./MainContainer";
import { PaymentSuccess } from "./PaymentSuccess";

const App: React.FC = () => {
  const tokenStorage = localStorage.getItem("token");
  // ReactGA.initialize(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID);
  const [token, setToken] = useState(tokenStorage || "");

  const onTokenChange = async (user: User | null) => {
    if (user) {
      await verifyUser();
      const currentToken = await user.getIdToken();
      localStorage.setItem("token", currentToken);
      setToken(currentToken);
    } else {
      localStorage.removeItem("token");
      setToken("");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onTokenChange);
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ token }}>
        <Router>
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <AuthPage />}
            />
            <Route
              path="/briefs"
              element={token ? <BriefsBoard /> : <Navigate to="/" />}
            />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-center"
          newestOnTop
          hideProgressBar
          autoClose={2000}
          style={{ width: "fit-content", whiteSpace: "nowrap" }}
        />
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
