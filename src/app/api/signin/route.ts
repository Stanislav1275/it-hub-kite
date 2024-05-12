import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { setContext } from '@/shared/lib/axios/instance';

// Define the POST handler for the file upload
export const POST = async (req: NextRequest, res: NextResponse) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU1NTE4NzcsImlhdCI6MTcxNTUwODY3NywidXNlcl9pZCI6MTAwfQ.uynbnKDauAqcnLoHAtKji5revCesRT4NhQaz-1JX7NI';
    // cookies().set('serverToken', token, {
    //     httpOnly: true,
    //     secure: true,
    //     expires: new Date(new Date().getTime() + 60 * 60 * 24 * 365 * 1000),
    //     sameSite: 'lax',
    //     path: '/',
    // });
    setContext({ cookie: cookies() });
    cookies().set('token', token);
    const response = NextResponse.json({
        token: token,
    });
    response.cookies.set('token', token);
    return response;
};
