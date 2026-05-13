"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {useState} from "react";
import Link from "next/link";




export default function Profile() {
    const [data,setdata] = useState(null);
    const router = useRouter();
    
    const logout = async () => {
            try{
                await axios.get('/api/users/logout');
                toast.success("Logout successful!");
                router.push('/login');  
            }catch(error:any){
                console.log("Error occurred while logging out:", error);
            }
    }

    const getUserData = async () => {
        try{
            const response = await axios.get('/api/users/me');
            setdata(response.data.user._id);
            console.log("User data:", response.data);
        }catch(error:any){ toast.error(error?.response?.data?.error || "Failed to fetch user data"); }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-200">

            <h1 className="text-3xl font-bold mb-4">
                Hi User
            </h1>
            <div className="text-xl bg-white px-4 py-2 rounded">
                <p>profile page</p>
                <h2>{data === null ? "nothing to show" : <Link href={`/profile/${data}`}>View Profile</Link>}</h2>
            </div>
            
            <hr/>
            <button
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={logout}>
                Logout
            </button>
            <button
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={getUserData}>
                Get User Data
            </button>
            
        </div>
    );
}
