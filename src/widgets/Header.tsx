'use client';
import { ReactNode, Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ThemeToggle } from '@/shared/ui/theme';
import { ErrorBoundary } from '@/shared/lib/errorhandling/ErrorBoundary';
import { Skeleton } from '@radix-ui/themes';
import { useAuthModal } from '@/entities/session/model/states';
import { useCurrentUser } from '@/entities/session/model/queries';
import { IconJarLogoIcon } from '@radix-ui/react-icons';
import { CurrentUserAvatar } from '@/entities/user/ui/UserAvatar';
import dynamic from 'next/dynamic';
import { useDetectIsMobileDevice } from '@/shared/lib/media/context';
import { UserNavigationMob } from '@/entities/user/ui/UserNavigationMob';
import { CurrentUserNav } from '@/entities/user/ui/CurrentUserNav';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';

const Sheet = dynamic(() => import('@/shared/ui/sheet').then((v) => v.Sheet));
const SheetContent = dynamic(() => import('@/shared/ui/sheet').then((v) => v.SheetContent));
const SheetTrigger = dynamic(() => import('@/shared/ui/sheet').then((v) => v.SheetTrigger));
const Drawer = dynamic(() => import('@/shared/ui/drawer').then((v) => v.Drawer));
const DrawerContent = dynamic(() => import('@/shared/ui/drawer').then((v) => v.DrawerContent));
const DrawerTrigger = dynamic(() => import('@/shared/ui/drawer').then((v) => v.DrawerTrigger));

const AuthButton = () => {
    'use client';
    const [_, setOpen] = useAuthModal();
    return <Button onClick={() => setOpen((v) => !v)}>Войти</Button>;
};
const AccountWrapper = () => {
    'use client';
    const { data: user } = useCurrentUser();
    const { isMobile } = useDetectIsMobileDevice();
    if (!user) return null;
    else if (!user?.id) return <AuthButton />;
    return !isMobile ? (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <Button asChild className="cursor-pointer">
                    <div className="h-9 w-9">
                        <CurrentUserAvatar variant="pointer" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <CurrentUserNav />
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Drawer>
            <DrawerTrigger>
                <Button asChild className="cursor-pointer">
                    <div className="h-9 w-9">
                        <CurrentUserAvatar variant="pointer" />
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="px-4 pt-4">
                <UserNavigationMob user={user} />
            </DrawerContent>
        </Drawer>
    );
};

export function Header({ actions }: { actions?: ReactNode }) {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button size="icon" className="text-foreground" variant="ghost" asChild>
                        <Link href="/">
                            <IconJarLogoIcon />
                        </Link>
                    </Button>
                    {/*<HeaderNavigation />*/}
                </div>
                <div className="flex flex-row items-center gap-2">
                    {actions}
                    <ThemeToggle />
                    <ErrorBoundary>
                        <Suspense fallback={<Skeleton className="rounded-full h-10 w-10" />}>
                            <AccountWrapper />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </header>
    );
}
