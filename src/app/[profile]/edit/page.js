import { App } from '@/components/app'
import { redirect } from 'next/navigation';
import { loadCvFile, loadConfigFile } from '@/utils/server-utils'

export default async function Page({ params }) {
    const profile = (await params).profile;
    const loggedInUser = 'dhairya';

    const canEdit = profile === loggedInUser;

    const loggedIn = !!loggedInUser;

    if (!loggedIn) {
        redirect('/login');
    }

    if (!canEdit) {
        return <div>You are not allowed to edit this <a href={`/${profile}`} className='text-sky-100'>CV</a></div>
    }

    let cvYaml = await loadCvFile(profile);
    let defaultConfigYaml = await loadConfigFile();
    return <App cvYaml={cvYaml} configYaml={defaultConfigYaml}></App>
}