import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(
    request: NextRequest
): Promise<NextResponse<unknown>> {
    const token = request.cookies.get('auth_token')?.value
    const path = request.nextUrl.pathname

    if ((path === '/' || path === '/login') && token != null) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (path !== '/login' && token == null) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/profile', '/register']
}
