import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
);
