import { TeamPartialAsUser } from '@/shared/models/team.model';
import { HoverCard, HoverCardTrigger } from '@/shared/ui/hover-card';
import { LinkCore } from '@/shared/ui/LinkCore';
import { Badge } from '@/shared/ui/badge';

export const TeamPreviewAsHover = (props: TeamPartialAsUser) => {
    const { id, role, name } = props;
    return (
        <HoverCard>
            <HoverCardTrigger></HoverCardTrigger>
        </HoverCard>
    );
};
export const TeamPreviewAsLink = (props: TeamPartialAsUser) => {
    const { id, name, role } = props;
    return (
        <LinkCore href={`/team/${id}`} key={id}>
            <Badge>{name}</Badge>
        </LinkCore>
    );
};
