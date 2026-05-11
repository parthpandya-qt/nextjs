"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


interface ProfilePage {
    params: Promise<{
        id: string;
    }>;
}

export default async function Profile({ params }: ProfilePage) {
    const router = useRouter();
    const { id } = await params;
    const logout = async () => {
            try{
                axios.get('/api/users/logout');
                toast.success("Logout successful!");
                router.push('/login');  
            }catch(error:any){
                console.log("Error occurred while logging out:", error);
            }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-200">

            <h1 className="text-3xl font-bold mb-4">
                Hi User
            </h1>

            <p className="text-xl bg-white px-4 py-2 rounded">
                User ID: {id}
            </p>
            <hr/>
            <button
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={logout}>
                Logout
            </button>
            
        </div>
    );
}