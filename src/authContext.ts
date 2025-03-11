import { createContext } from "react";

type AuthContextType = {
  token: string;
};

export const AuthContext = createContext<AuthContextType>({ token: "" });
