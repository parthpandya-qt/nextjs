import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
export async function GET(request:NextRequest) {
    try{
        const response = NextResponse.json({message:"Logout successful"});
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;
    }catch(error:any){
        return NextResponse.json({error:"Error occurred while logging out"}, {status:400})
    }
}