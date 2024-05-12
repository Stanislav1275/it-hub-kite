import { NextRequest, NextResponse } from 'next/server';

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
    return NextResponse.json({
        token: token,
    });
};
