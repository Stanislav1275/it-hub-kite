import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/shared/models/user.model';
import { cookies } from 'next/headers';

// Define the POST handler for the file upload
export const GET = async (req: NextRequest, res: NextResponse) => {
    const user = {
        firstname: 'Станислав',
        id: 100,
        username: 'stas',
        lastname: 'Аристов',
        bio_info:
            '<code class="editor-code ltr" spellcheck="false" data-highlight-language="html" data-gutter="1\n' +
            '2\n' +
            '3" dir="ltr"><span class="editor-tokenPunctuation" data-lexical-text="true">&lt;</span><span class="editor-tokenProperty" data-lexical-text="true">div</span><span class="editor-tokenPunctuation" data-lexical-text="true">&gt;</span><br><span data-lexical-text="true">\t</span><span data-lexical-text="true">432423</span><br><span class="editor-tokenPunctuation" data-lexical-text="true">&lt;/</span><span class="editor-tokenProperty" data-lexical-text="true">div</span><span class="editor-tokenPunctuation" data-lexical-text="true">&gt;</span></code>',
        teams: [
            { name: 'ithub_team', id: 0, role: 'owner' },
            { name: 'lololaodads_team', id: 0, role: 'owner' },
            { name: 'neoflex', id: 1, role: 'owner' },
            { name: 'chxn6', id: 2, role: 'owner' },
            { name: 'chxn6', id: 32, role: 'owner' },
            { name: 'chxn632', id: 3, role: 'owner' },
            { name: 'chxn6321', id: 4, role: 'owner' },
            { name: 'chx312n312316', id: 5, role: 'owner' },
        ],
    } satisfies UserType;
    if (cookies().get?.('token')?.value)
        return NextResponse.json({
            ...user,
        });
    return NextResponse.json({ message: 'user not found' }, { status: 404 });
};
