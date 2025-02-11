"use client";
import Image from "next/image";
import React, { useState } from "react";
import { User } from "@prisma/client";
import { HiPhoto, HiPencil, HiCheck } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface AccountProps {
    currentUser: User;
}

const Account = ({ currentUser }: AccountProps) => {
    const [formData, setFormData] = useState({
        avatar: currentUser?.image || "/default-avatar.jpg",
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        oldPassword: "",
        newPassword: "",
    });

    const [editMode, setEditMode] = useState({
        name: false,
        email: false,
        oldPassword: false,
        newPassword: false,
    });

    const mutation = useMutation({
        mutationFn: async (data: {
            id: string;
            image?: string;
            name?: string;
            email?: string;
            oldPassword?: string;
            password?: string;
        }) => {
            await axios.post("/api/account", data);
        },
        onSuccess: () => {
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        },
    });

    const handleUpload = (result: any) => {
        const imageUrl = result?.info?.secure_url;
        if (imageUrl) {
            setFormData((prev) => ({ ...prev, avatar: imageUrl }));
            mutation.mutate({ id: currentUser.id, image: imageUrl });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEdit = (field: keyof typeof editMode) => {
        setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            id: currentUser.id,
            name: formData.name,
            email: formData.email,
            ...(formData.newPassword && {
                oldPassword: formData.oldPassword,
                password: formData.newPassword,
            }),
        });
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Account</h2>
            <div className="flex flex-col gap-6">
                <div className="flex items-center flex-col gap-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden border">
                        <Image
                            src={formData.avatar}
                            alt="Avatar"
                            width={112}
                            height={112}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                    <CldUploadButton
                        options={{ maxFiles: 1 }}
                        onSuccess={handleUpload}
                        uploadPreset="tir5sico"
                    >
                        <div className="px-4 border rounded-md">
                            <HiPhoto size={30} width={30} className="text-sky-500 cursor-pointer" />

                        </div>
                    </CldUploadButton>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {["name", "email", "oldPassword", "newPassword"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field === "oldPassword"
                                    ? "Current Password"
                                    : field === "newPassword"
                                        ? "New Password"
                                        : `Your ${field.charAt(0).toUpperCase() + field.slice(1)
                                        }`}
                            </label>
                            <div className="flex items-center gap-2">
                                {!editMode[field as keyof typeof editMode] ? (
                                    <p className=" block w-full p-1 border rounded-md bg-gray-100">
                                        {field.includes("Password") ? "••••••••" : formData[field as keyof typeof formData]}
                                    </p>
                                ) : (
                                    <input
                                        type={field.includes("Password") ? "password" : "text"}
                                        name={field}
                                        value={formData[field as keyof typeof formData]}
                                        onChange={handleChange}
                                        className=" block w-full p-1 border rounded-md"
                                    />
                                )}
                                <button type="button" onClick={() => toggleEdit(field as keyof typeof editMode)}>
                                    {editMode[field as keyof typeof editMode] ? (
                                        <HiCheck size={20} className="text-green-500" />
                                    ) : (
                                        <HiPencil size={20} className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Account;
