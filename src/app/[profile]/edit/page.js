import { App } from '@/components/app'
import path from 'path';
import fs from 'fs';

export default async function Page({ params }) {
    const profile = (await params).profile;
    const loggedInUser = 'dhairya'

    const loggedIn = !!loggedInUser;
    const canEdit = profile === loggedInUser;
    
    let cvYaml = loadFileContent('cv.yaml')
    let defaultConfigYaml = loadFileContent('config.yaml');
    return <App cvYaml={cvYaml} configYaml={defaultConfigYaml} loggedIn={loggedIn} canEdit={canEdit}></App>
}

function loadFileContent(fileName) {
    const filePath = path.join(process.cwd(), `/data/${fileName}`);
    return fs.readFileSync(filePath, 'utf8');
}