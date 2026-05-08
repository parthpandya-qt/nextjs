"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(user);
    };

    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Signup
        </h1>

        <form
            onSubmit={onSignup}
            className="space-y-4"
        >

            <input
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

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
                Signup
            </button>

        </form>

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