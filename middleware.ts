import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authenticatedRoutes = [ "/", "/game", "/hall-of-wins" ]
const authenticatedApis = [
    (path: string) => path.startsWith("/api/game"),
];

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })
    const pathName = request.nextUrl.pathname;

    if (!token) {
        if (authenticatedRoutes.some(route => pathName == route)) {
            const url = new URL('/login', request.url);
            return NextResponse.redirect(url.toString());
        }

        if (authenticatedApis.some(fn => fn(pathName))) {
            return NextResponse.json({ message: "You are not authorized to access this resource." }, { status: 403 });
        }
    }

    return NextResponse.next();
}