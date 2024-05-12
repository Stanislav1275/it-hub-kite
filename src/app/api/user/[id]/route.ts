import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/shared/models/user.model';

export const GET = async (req: NextRequest, res: NextResponse) => {
    const user = {
        firstname: 'Станислав',
        id: 100,
        username: 'stas',
        lastname: 'Аристов',
        bio_info: '<div>Frontend разработчик с опытом 50 лет, живу на мальдивах</div>',
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

    return NextResponse.json({ message: 'user not found' }, { status: 404 });
};
