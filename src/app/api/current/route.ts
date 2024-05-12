import { NextRequest, NextResponse } from 'next/server';

// Define the POST handler for the file upload
export const GET = async (req: NextRequest, res: NextResponse) => {
    const user = {
        name: 'stas',
        id: 100,
        username: 'stas',
    };
    return NextResponse.json({
        ...user,
    });
};
