import { getCommonFlags } from '@/utils/server-utils';

export default async function Page({ params }) {
    const { canEdit, cvExists, loggedIn, profile } = await getCommonFlags(params);

    return <>
        {cvExists && <a href={`/${profile}`}>View</a>}
        {loggedIn && <a href='logout'>Log out</a>}
    </>
}