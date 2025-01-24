import React, { useState } from 'react';
import Model from '../componets/Model/Model';
import Button from '../componets/Button/Button';
import SettlementOption from './SettlementOption';
import axios from 'axios';

interface SettleProps {
  isOpen?: boolean;
  onClose: () => void;
}

const Settle: React.FC<SettleProps> = ({ isOpen, onClose }) => {
  const [isOpenPayment, setOpenPayment] = useState(false);
  // const [amount, setAmount] = useState(100); // Test amount
  const productId = "TEST_PRODUCT_ID";
  const successUrl = `http://localhost:3000/users/payment/success`; // Full success URL for localhost
  const failureUrl = `http://localhost:3000/users/payment/failure`;


  const [amount, setAmount] = useState(0);

  const handlePayment = async (e:any) => {
    e.preventDefault();

    const payload = {
      return_url: `${window.location.origin}/users/payment`,
      website_url: `${window.location.origin}`,
      amount: amount * 100, // Khalti expects amount in paisa (100 paisa = 1 NPR)
      purchase_order_id: Math.random().toString(36).substring(7), // Unique transaction ID
      purchase_order_name: 'Test Payment',
      customer_info: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '9800000000',
      },
    };

    try {
      const response = await axios.post(
        'https://a.khalti.com/api/v2/epayment/initiate/',
        payload,
        {
          headers: {
            Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Redirect to Khalti sandbox payment page
      window.location.href = response.data.payment_url;
    } catch (error:any) {
      console.error('Payment initiation failed:', error.response?.data || error.message);
      alert('Payment initiation failed. Please try again.');
    }
  };

  const handleOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleSave = () => {
    // Add logic for saving the data if required
  };

  return (
    <Model
      isOpen={isOpen}
      onClose={() => {
        setOpenPayment(false);
        onClose();
      }}
      heading='Settle Up'
    >
      {isOpenPayment ? (
        <SettlementOption />
      ) : (
        <div className="flex flex-col justify-center items-center space-y-2 mt-12 sm:mt-8 md:mt-8">
          <h2>Choose a payment method</h2>
          <Button
            onClick={handleOpenPayment}
            stytle={"w-[320px] sm:w-[350px] md:w-[350px]"}
          >
            Record as a cash Payment
          </Button>
          <Button
            // onClick={() => handlePayment()}  // Ensure handlePayment is called correctly
            stytle={"w-[320px] sm:w-[350px] md:w-[350px]"}
          >
            eSewa Payment
          </Button>
          <p className='text-sm font-thin text-gray-500'>
            When you use a payment service, your payment is shared with that
            company under its Privacy Policy and Terms, including any fees if
            applicable. Splitwise charges no additional fees.
          </p>
        </div>
      )}

      <hr className="border-gray-300 mt-3" />

      <div className='flex justify-end gap-4 mt-2'>
        <Button
          onClick={() => {
            onClose();
            setOpenPayment(false);
          }}
        >
          Cancel
        </Button>
        <Button
        //  onClick={() => handlePayment()}
         >Save</Button>
      </div>
      {/* <div>
        <h1>Pay with Khalti (Sandbox)</h1>
        <form onSubmit={handlePayment}>
          <label>
            Amount (NPR):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))} // Convert to number
              required
            />
          </label>
          <button type="submit">Pay Now</button>
        </form>
      </div> */}

    </Model>
  );
};

export default Settle;
