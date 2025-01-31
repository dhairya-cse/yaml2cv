import { getCommonFlags } from '@/utils/server-utils';

export default async function Page({ params }) {
    const { canEdit, cvExists, loggedIn, profile } = await getCommonFlags(params);

    return <>
        {canEdit && cvExists && <a href={`/${profile}/edit`}>Edit</a>}
    </>

}