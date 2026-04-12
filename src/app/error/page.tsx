'use client';

import { ErrorPage } from '@/components/ui/not-found';
import { useSearchParams } from 'next/navigation';

export default function AuthErrorPageComponent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error') ?? 'An unknown error occurred. Please try again.';

    return <ErrorPage title={error} />;
}
