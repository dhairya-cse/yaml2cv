import { PrintComponent } from '@/components/print-comp';
import { getCommonFlags } from '@/utils/server-utils';

export default async function Page({ params }) {
    const { canEdit, cvExists, loggedIn, profile } = await getCommonFlags(params);

    return <>
        {canEdit && cvExists && <a href={`/${profile}/edit`}>Edit</a>}
        {!cvExists && <a href='/'>Home</a>}
        {cvExists && <PrintComponent/>}
        {loggedIn && <a href='logout'>Log out</a>}
        {!loggedIn && <a href='login'>Log out</a>}
    </>

}