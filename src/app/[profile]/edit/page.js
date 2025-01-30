import { App } from '@/components/app'
import { redirect } from 'next/navigation';
import { loadCvFile, loadConfigFile, getLoggedInUser, cvFileExists, createNewCv } from '@/utils/server-utils'

export default async function Page({ params }) {
    const profile = (await params).profile;
    const loggedInUser = getLoggedInUser();

    const loggedIn = !!loggedInUser;

    if (!loggedIn) {
        redirect('/login');
    }

    const canEdit = profile === loggedInUser;

    if (!canEdit) {
        return <div>You are not allowed to edit this <a href={`/${profile}`} className='text-sky-100'>CV</a></div>
    }


    const cvExists = await cvFileExists(profile);

    if (!cvExists) {
        await createNewCv(profile);
    }
    
    let cvYaml = await loadCvFile(profile);
    let defaultConfigYaml = await loadConfigFile();
    return <App cvYaml={cvYaml} configYaml={defaultConfigYaml}></App>
}