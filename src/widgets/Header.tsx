'use client';
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ThemeToggle } from '@/shared/ui/theme';
import { ErrorBoundary } from '@/shared/lib/errorhandling/ErrorBoundary';
import { Skeleton } from '@radix-ui/themes';
import { useAuthModal } from '@/entities/session/model/states';
// import { SiteLogoIcon } from '../../../shared/icons/site-logo';

// const AccountDropdownWrapper = dynamic(
//     () => import('entities/account/ui/AccountDropdown'),
//     {
//         loading: () => <AccountButton/>,
//         ssr: false,
//     }
// )
//
// const HeaderNavigation = dynamic(
//     () => import('./NavigationMenu'),
//     {
//         loading: () => null,
//         ssr: true,
//     }
// )
//
// async function AccountLoginWrapper() {
//     const session = await api.signin.getSession();
//
//     if (!session) {
//         return <AccountDropdownWrapper><AccountButton/></AccountDropdownWrapper>;
//         // return <LoginButton/>;
//     }
//
//     return <AccountDropdownWrapper><AccountButton/></AccountDropdownWrapper>;
// }
const AccountLoginButton = () => {
    'use client';
    const [_, setOpen] = useAuthModal();
    return <Button onClick={() => setOpen((v) => !v)}>register</Button>;
};
export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button size="icon" className="text-foreground" variant="ghost" asChild>
                        <Link href="/">
                            <div>1</div>
                        </Link>
                    </Button>
                    <div>
                        <AccountLoginButton />
                    </div>
                    {/*<HeaderNavigation />*/}
                </div>
                <div className="flex flex-row items-center gap-2">
                    <ThemeToggle />
                    <ErrorBoundary>
                        <Suspense fallback={<Skeleton className="rounded-full h-10 w-10" />}>
                            {/*<AccountLoginWrapper />*/}
                            <div>логин</div>
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </header>
    );
}
