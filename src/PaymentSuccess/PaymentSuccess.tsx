import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("token"); // PayPal returns the token in URL

  const navigate = useNavigate();

  const capturePayment = async () => {
    try {
      const { data } = await api.post("paypal/capture-payment", { orderId });
      if (data.success) {
        console.log("Payment successful:", data.captureResult);
        const price = localStorage.getItem("price");
        const credits = localStorage.getItem("creditsPurchased");
        await api.post("payments", {
          price: Number(price),
          credits: Number(credits),
        });
        localStorage.removeItem("price");
        localStorage.removeItem("creditsPurchased");
        // Show success message or navigate the user to another page
        navigate("/");
      } else {
        console.error("Payment capture failed:", data.message);
      }
    } catch (error) {
      console.error("Error capturing payment:", error);
    }
  };

  useEffect(() => {
    if (orderId) {
      capturePayment();
    }
  }, [orderId]);

  return <div>Processing payment...</div>;
};
