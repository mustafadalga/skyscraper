import { NextRequest, NextResponse } from "next/server";

import handleAxiosError from "@/(app)/_utilities/handleAxiosError";
import prisma from "@/(app)/_libs/prismadb";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.userID) {
            return NextResponse.json({ message: "Please login to share your challenge!" }, { status: 403 });
        }


        if (!body.gameID) {
            return NextResponse.json({ message: "gameID are required to share your challenge!" }, { status: 400 });
        }

        const challenge = await prisma.sharedChallenge.create({
            data: {
                userId: body.userID,
                gameId: body.gameID
            }
        });

        return NextResponse.json({
            message: "Your challenge URL was created successfully.",
            challengeID: challenge.id
        }, { status: 200 });

    } catch (error) {
        const {
            message,
            status
        } = handleAxiosError(error, "An error occurred while creating your challenge. Please try again later.");
        return NextResponse.json({ message }, { status });
    }
}


