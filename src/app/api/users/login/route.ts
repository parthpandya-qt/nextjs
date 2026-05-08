import {connect} from "@/dbconfig/dbConfig";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import { NextResponse,NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

connect();


export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        console.log(reqBody)
        const {email , password}= reqBody;
        if(!email || !password){
            return  NextResponse.json({error:"all field is required"},{status:400})
        }
        const savedUser = await User.findOne({email})
        if(!savedUser){
            return NextResponse.json({error:"User not found"},{status:400})
        }
        const result = await bcryptjs.compare(savedUser.password,password)
        if(!result){
            return NextResponse.json({error:"Password is incorrect"},{status:400})
        }
        const tokenData={
            id:savedUser._id,
            name:savedUser.name,
            email:savedUser.email

        }
        
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1h"})

        const response = NextResponse.json(
            {
                message:"log in success",
                success:true
            }
        )
        response.cookies.set("token",token,{
            httpOnly:true,
            maxAge:3600
        })
        return response;

    }catch (error) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
