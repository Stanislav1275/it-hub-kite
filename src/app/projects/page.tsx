import { Suspense } from 'react';
import { Projects } from '@/entities/project/ui/Projects';
import { ErrorBoundary } from '@/shared/lib/errorhandling/ErrorBoundary';
import { Layout } from '@/widgets/Layout';

async function ProjectsPage() {
    return (
        <Layout>
            <Suspense fallback="...loading">
                <ErrorBoundary>
                    <Projects />
                </ErrorBoundary>
            </Suspense>
        </Layout>
    );
}

export default ProjectsPage;
