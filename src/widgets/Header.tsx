import { Suspense } from 'react';
import { Button, Skeleton, ThemeToggle } from 'shared/ui';
import { ErrorBoundary } from 'shared/ui/ErrorBoundary';
import Link from 'next/link';
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
//     const session = await api.auth.getSession();
//
//     if (!session) {
//         return <AccountDropdownWrapper><AccountButton/></AccountDropdownWrapper>;
//         // return <LoginButton/>;
//     }
//
//     return <AccountDropdownWrapper><AccountButton/></AccountDropdownWrapper>;
// }

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button size="icon" className="text-foreground" variant="ghost" asChild>
                        <Link href="/">
                            <SiteLogoIcon className="h-8" />
                        </Link>
                    </Button>
                    <HeaderNavigation />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <ThemeToggle />
                    <ErrorBoundary>
                        <Suspense fallback={<Skeleton className="rounded-full h-10 w-10" />}>
                            <AccountLoginWrapper />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </header>
    );
}
