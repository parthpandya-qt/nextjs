import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request:NextRequest) {
    try{
        const token = request.cookies.get("token")?.value || '';
        if(!token){
            return null;
        }   
        const decodedData:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedData?.id;
    }catch(error:any){
        console.error("Error decoding token:", error.message);
        return null;
    }
}