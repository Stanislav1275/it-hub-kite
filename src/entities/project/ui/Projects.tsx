'use client';
import { CookieService } from '@/shared/lib/cookie/CookieService';
import { useCurrentUser } from '@/entities/session/model/queries';

export function Projects() {
    const token = CookieService.get('token');
    const { data: user } = useCurrentUser();
    console.log(token);
    console.log(user);
    return <div>{token || ''}</div>;
}
