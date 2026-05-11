"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            setLoading(true);
            const responce = await axios.post('/api/users/login', user);
            toast.success("Login successful!");
            console.log(responce.data);
            router.push('/profile');
        }catch(error:any) {
            toast.error(error?.response?.data?.error || "Error occurred while logging in");
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
            if(user.email && user.password){
                setButtonDisabled(false);
            }else{
                setButtonDisabled(true);
            }
    },[user])

    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {loading ? "Processing":"Login"}
        </h1>


           <div className="flex flex-col gap-4">
            
            <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                        onClick={onLogin}
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
                            : "Login"}
                    </button>
            </div>

        <p className="text-center text-gray-600 mt-5">
            Don't have an account?{" "}
            <Link
                href="/signup"
                className="text-blue-600 hover:underline"
            >
                Signup
            </Link>
        </p>

    </div>

</div>
    );
}