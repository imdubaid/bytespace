import { SigningInLoader } from '@/components/auth/sign-in-loader';
import { normalizePath } from '@/utils/helpers';

type PageProps = {
    searchParams: Promise<{ path?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
    const { path } = await searchParams;
    const encodedPath = encodeURIComponent(normalizePath(path));
    const startUrl = `/api/sso/sign-in?path=${encodedPath}`;

    return <SigningInLoader startUrl={startUrl} />;
}
