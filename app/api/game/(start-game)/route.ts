import { NextRequest, NextResponse } from "next/server";
import type { User } from ".prisma/client";
import getCurrentUser from "@/_actions/getCurrentUser";
import handleAxiosError from "@/_utilities/handleAxiosError";
import { generateGameData, IGameData, startNewGame } from "./utilities";

export async function POST(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser() as User;

        if (!currentUser) {
            return NextResponse.json({ message: "Please login to start a new game." }, { status: 403 });
        }

        const body = await request.json();
        const { difficulty, dimension } = body;

        if (!difficulty || !difficulty) {
            return NextResponse.json({ message: "Both difficulty and dimension are required to start a new game." }, { status: 400 });
        }

        const data: IGameData = await generateGameData(dimension, difficulty) as IGameData;
        await startNewGame(data);
        return NextResponse.json({ message: "New game started successfully." }, { status: 200 });

    } catch (error) {
        const { message, status } = handleAxiosError(error, "An unexpected error occurred. Please try again.");
        return NextResponse.json({ message }, { status });
    }
}





