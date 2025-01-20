import { redirectToEsewa } from "./esewa";

const PaymentButton = () => {
  const handlePayment = () => {
    redirectToEsewa({
      amount: 1000, // Payment amount
      productId: 'product123', // Unique product identifier
    });
  };

  return (
    <>
      <button onClick={handlePayment}>
      Pay with eSewa
    </button>
    </>
  
  );
};

export default PaymentButton;
