"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(user);
    };

    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
        </h1>

        <form
            onSubmit={onLogin}
            className="space-y-4"
        >

           
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
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
                Login
            </button>

        </form>

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