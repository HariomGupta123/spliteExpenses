"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    if (query.pidx) {
      // Verify payment with Khalti API
      verifyPayment(query.pidx);
    }
  }, [router]);

  const verifyPayment = async (pidx:any) => {
    try {
      const response = await axios.post(
        'https://a.khalti.com/api/v2/epayment/lookup/',
        { pidx },
        {
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'Completed') {
        alert('Payment Successful!');
      } else {
        alert('Payment Verification Failed!');
      }
    } catch (error) {
      console.error('Payment verification failed:', error.response?.data || error.message);
      alert('Payment verification failed. Please try again.');
    }
  };

  return <div>Payment Success</div>;
}