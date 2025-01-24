"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentSuccess() {
    const router = useRouter();

    useEffect(() => {
        const { query } = router;
        if (query.oid && query.amt && query.refId) {
            alert(`Payment Successful! Transaction ID: ${query.oid}`);
        }
    }, [router]);

    return <div>Payment Success</div>;
}