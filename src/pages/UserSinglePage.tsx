'use client';
import { useUserByIdQuery } from '@/entities/user/model/queries';
import { Skeleton } from '@/shared/ui/skeleton';
import { useParams } from 'next/navigation';
import { useCurrentUser } from '@/entities/session/model/queries';
import { SettingsIcon } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import Editor from '@/shared/lib/lexical/Editor';

export const UserSinglePage = () => {
    const { id, ...other } = useParams();
    console.log(other);
    const { data: user } = useUserByIdQuery(+id! as number);
    const { data: curUser } = useCurrentUser();
    const isOwner = curUser && user && user?.id === curUser?.id;
    return (
        <div>
            <Button>
                <Editor />
                <SettingsIcon />
            </Button>
        </div>
    );
};
export const UserPageSkeleton = () => <Skeleton />;
