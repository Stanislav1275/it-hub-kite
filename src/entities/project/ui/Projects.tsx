'use client';
import { CookieService } from '@/shared/lib/cookie/CookieService';

export function Projects() {
    const token = CookieService.get('token');
    // const { data: user } = useCurrentUser();
    // console.log(token);
    // console.log(user);
    return <div>{'fdsf'}</div>;
}
