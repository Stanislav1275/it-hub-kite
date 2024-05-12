import { Suspense } from 'react';
import { Projects } from '@/entities/project/ui/Projects';
import { getQueryClient } from '@/shared/lib/query';
import { getCurrentUserQueryOptions } from '@/entities/session/model/queries';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

async function ProjectsPage() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(getCurrentUserQueryOptions());

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Suspense fallback="...loading">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Projects />
                </HydrationBoundary>
            </Suspense>
        </main>
    );
}

export default ProjectsPage;
