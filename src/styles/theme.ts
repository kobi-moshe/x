import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Main color for primary buttons, etc.
    },
    secondary: {
      main: "#dc004e", // Main color for secondary buttons, etc.
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  spacing: 8, // Default spacing unit (e.g., 8px)
});
