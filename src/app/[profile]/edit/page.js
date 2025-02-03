import { App } from '@/components/app'
import { redirect } from 'next/navigation';
import { loadCvFile, loadConfigFile, createNewCv, getCommonFlags } from '@/utils/server-utils'

export default async function Page({ params }) {
    const { loggedIn, canEdit, cvExists, profile } = await getCommonFlags(params);

    if (!loggedIn) {
        redirect('/login');
    }

    if(!cvExists) {
        return <div>CV Not found</div>
    }

    if (!canEdit) {
        return <div>You are not allowed to edit this <a href={`/${profile}`} className='text-sky-100'>CV</a></div>
    }

    if (!cvExists) {
        await createNewCv(profile);
    }

    let cvYaml = await loadCvFile(profile);
    let defaultConfigYaml = await loadConfigFile();
    return <App cvYaml={cvYaml} configYaml={defaultConfigYaml}></App>
}