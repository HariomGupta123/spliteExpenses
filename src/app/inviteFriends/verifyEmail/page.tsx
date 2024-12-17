"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyEmail = () => {
    const router=useRouter()
    const [isVerifying, setIsVerifying] = useState(true);
    const [message, setMessage] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setMessage("Invalid or missing token.");
            setIsVerifying(false);
            return;
        }

        const verifyEmail = async () => {
            try {
                const response = await axios.post("/api/invite/verifyEmail", { token });
                setMessage(response.data || "Email verified successfully!");
                toast.success("Email verified successfully!");
                router.push("/")
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.message || "Verification failed. Please try again.";
                setMessage(errorMessage);
                toast.error(errorMessage);
            } finally {
                setIsVerifying(false);
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            {isVerifying ? (
                <p>Verifying your email...</p>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
};

export default VerifyEmail;
