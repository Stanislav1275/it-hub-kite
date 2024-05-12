import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/shared/ui/toaster';
import Providers from '@/config/providers';
import { ReactNode } from 'react';
import { ThemeToggle } from '@/shared/ui/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <header className='flex'>
                <ThemeToggle/>
            </header>
            {children}
        </Providers>
        <Toaster />

        </body>
        </html>
    );
}
