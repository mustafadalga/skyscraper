import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authenticatedRoutes = [ "/", "/game", "/hall-of-wins" ]

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })
    const pathName = request.nextUrl.pathname;

    if (!token) {
        if (authenticatedRoutes.some(route => pathName == route)) {
            const callbackUrl = encodeURIComponent(`${request.nextUrl.origin}${pathName}`);
            const absoluteRedirectUrl = `${request.nextUrl.origin}/login?callbackUrl=${callbackUrl}`;
            return NextResponse.redirect(absoluteRedirectUrl);
        }
    }

    return NextResponse.next();
}