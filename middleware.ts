import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(req:NextRequest){if(!req.nextUrl.pathname.startsWith('/admin')&&!req.nextUrl.pathname.startsWith('/api/'))return NextResponse.next();const auth=req.headers.get('authorization');if(auth?.startsWith('Basic ')){const decoded=atob(auth.slice(6));const [user,pass]=decoded.split(':');if(user==='admin'&&pass===process.env.ADMIN_PASSWORD)return NextResponse.next()}return new NextResponse('Authentication required',{status:401,headers:{'WWW-Authenticate':'Basic realm="HLEBBLACK Admin"'}})}
export const config={matcher:['/admin/:path*','/api/:path*']};
