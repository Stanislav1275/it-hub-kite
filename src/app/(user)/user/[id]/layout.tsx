import { Layout } from '@/widgets/Layout';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return <Layout>{children}</Layout>;
}
