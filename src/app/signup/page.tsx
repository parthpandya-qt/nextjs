"use client";

import Link from "next/link";
import { useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (
            user.name.length > 0 &&
            user.email.length > 0 &&
            user.password.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async (
        e: MouseEvent<HTMLButtonElement>
    ) => {
        try{
            setLoading(true);
            const responce = await axios.post('/api/users/signup', user);
            toast.success("Signup successful!");
            console.log(responce.data);
            router.push('/login');
        }catch(error:any) {
            toast.error("Error occurred while signing up:", error);
        }finally{
            setLoading(false);
        }
        e.preventDefault();

        console.log(user);

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    {loading ? "Processing":"Signup"}
                </h1>

                <div className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                name: e.target.value
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                email: e.target.value
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password: e.target.value
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={onSignup}
                        disabled={buttonDisabled}
                        type="button"
                        className={`w-full py-3 rounded-lg font-medium text-white transition ${
                            buttonDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {buttonDisabled
                            ? "Please fill all fields"
                            : "Signup"}
                    </button>
                </div>

                <p className="text-center text-gray-600 mt-5">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}
