import { getCommonFlags } from '@/utils/server-utils';
import { PrintComponent } from '@/components/print-comp';

export default async function Page({ params }) {
    const { canEdit, cvExists, loggedIn, profile } = await getCommonFlags(params);

    return <>
        {cvExists && <a href={`/${profile}`}>View</a>}
        {cvExists && <PrintComponent/>}
        {!cvExists && <a href='/'>Home</a>}
        {loggedIn && <a href='logout'>Log out</a>}
    </>
}