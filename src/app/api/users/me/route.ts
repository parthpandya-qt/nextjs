import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}  