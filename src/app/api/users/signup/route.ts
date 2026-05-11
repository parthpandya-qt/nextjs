import {connect} from "@/dbconfig/dbConfig";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function POST(request:NextRequest) {

    try {
        const reqBody= await request.json();
        console.log(reqBody);
        const {name,email,password} = reqBody;
        if(!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const users = await User.findOne({email});
        if(users) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        if(!savedUser) {
            return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
        }
        console.log("User created successfully:", savedUser);
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error: any) {
        console.error("Signup error:", error.message);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}