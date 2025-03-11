import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const FreeTrialButton: React.FC = () => {
  return (
    <Button
      component={Link}
      variant="contained"
      to="/signup"
      style={{
        width: "fit-content",
        padding: "8px 16px",
        textTransform: "none",
        backgroundColor: "#52BD95",
      }}
    >
      Try For Free
    </Button>
  );
};
