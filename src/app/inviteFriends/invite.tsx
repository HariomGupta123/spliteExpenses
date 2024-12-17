"use client";

import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../componets/Input/Input"; // Adjust the import path
import Button from "../componets/Button/Button"; // Adjust the import path

const EmailInvitationForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Added reset method
    } = useForm<FieldValues>({
        defaultValues: { email: "" },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            await axios.post("/api/invite", { recipientEmail: data.email });
            toast.success("Invitation sent successfully!");
            console.log("Email sent to:", data.email);
            reset(); // Clears the input field after successful submission
        } catch (error: any) {
            toast.error(
                `Error sending invitation: ${error.response?.data?.message || "Unexpected error"}`
            );
            console.error("Error details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "0 auto",
               textAlign:"center",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            <h2 className="bg-green-400 w-full  rounded-t-md ">Send Invitation</h2>
            <form onSubmit={handleSubmit(onSubmit)} className=" p-4 flex flex-col gap-2">
                <Input
                    id="email"
                    
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    placeholder="send invitation through Email"
                />
                <Button type="submit" disabled={isLoading}  >
                    {isLoading ? "Sending..." : "Send Invitation"}
                </Button>
            </form>
        </div>
    );
};

export default EmailInvitationForm;
