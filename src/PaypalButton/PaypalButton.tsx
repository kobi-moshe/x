import { useState } from "react";
import { Button } from "@mui/material";
import { PaypalButtonProps } from "./types";
import api from "../api";

export const PaypalButton: React.FC<PaypalButtonProps> = (props) => {
  const { amount, onConfirmClick, disabled, isHighlighted } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    try {
      setError("");
      // Send request to your NestJS backend to create the PayPal payment
      const response = await api.post("paypal/create-payment", {
        amount,
      });

      const { approvalUrl } = response.data;
      if (!approvalUrl) {
        setError("Failed to get approval URL. Please try again later.");
      } else {
        window.location.href = approvalUrl;
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const onClick = async () => {
    setIsLoading(true);
    try {
      await handlePayment();
      onConfirmClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        onClick={onClick}
        disabled={disabled || isLoading}
        color={isHighlighted ? "secondary" : "primary"}
        style={{
          padding: "8px 16px",
          textTransform: "none",
        }}
      >
        {isLoading ? "Processing..." : "Purchase"}
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
