import { useRouter } from 'next/router';

const Success = () => {
    const router = useRouter();
    const { oid } = router.query; // Order ID returned by eSewa

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Order ID: {oid}</p>
        </div>
    );
};

export default Success;
