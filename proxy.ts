import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth"; // Серверный инстанс Better Auth

const authRoutes = ["/auth/sign-in", "/auth/sign-up"];
const initializeRoute = "/initialize";

export async function proxy(request: NextRequest) {
	const {pathname} = request.nextUrl;
	
	
	if (pathname.startsWith("/api") || pathname.includes(".")) {
		return NextResponse.next();
	}
	
	
	const session = await auth.api.getSession({
		headers: request.headers,
	});
	
	
	if (!session) {
		if (authRoutes.includes(pathname) || pathname === "/") {
			return NextResponse.next();
		}
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}
	
	
	if (authRoutes.includes(pathname)) {
		return NextResponse.next();
	}
	
	const hasDream = session.user.hasActiveDream;
	
	if (!hasDream && pathname !== initializeRoute) {
		return NextResponse.redirect(new URL(initializeRoute, request.url));
	}
	
	if (hasDream && pathname === initializeRoute) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	
	return NextResponse.next();
}

// Конфигурация матчера остается почти такой же
export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};