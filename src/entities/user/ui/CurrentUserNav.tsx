import { useCurrentUser } from '@/entities/session/model/queries';
import { CurrentUserAvatar } from '@/entities/user/ui/UserAvatar';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/shared/ui/dropdown-menu';
import { Large, P } from '@/shared/ui/typography';
import { TeamPreviewAsLink } from '@/entities/team/ui/TeamListPreview';
import Link from 'next/link';

export const CurrentUserNav = () => {
    const { data: user } = useCurrentUser();
    const { username, teams = [], firstname, lastname } = user ?? {};
    const finalTeams = teams?.sort(({ name: { length: len1 } }, { name: { length: len2 } }) => len1 - len2);
    const url = `/user/${user?.id || ''}`;
    return (
        <div className="flex flex-col  min-w-[200px] max-w-[320px] p-4">
            <DropdownMenuItem className="flex items-center">
                <Link href={url} className="hover:text-muted-foreground underline flex gap-3 items-center">
                    <CurrentUserAvatar variant="pointer" />
                    <P style={{ lineClamp: 1, margin: 0 }}>{`@${username}`}</P>
                </Link>
                <P style={{ lineClamp: 1, margin: 0 }}>{`${String.fromCharCode(160)}- ${firstname} ${lastname}`}</P>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-transparent flex flex-col py-2">
                <Link href={`${url}/team`} className="hover:text-muted-foreground">
                    <Large className="flex items-start justify-start">Команды:</Large>
                </Link>
                <div className="flex flex-wrap gap-1">{finalTeams?.map((team) => <TeamPreviewAsLink key={team.id} {...team} />)}</div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={`${url}/projects`} className="hover:text-muted-foreground">
                    <Large>Проекты</Large>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={`${url}/resume`} className="hover:text-muted-foreground">
                    <Large>Резюме</Large>
                </Link>
            </DropdownMenuItem>
        </div>
    );
};
