import { App } from '@/components/app'
import path from 'path';
import fs from 'fs';

export default function Hello() {
    let cvYaml = loadFileContent('cv.yaml')
    let defaultConfigYaml = loadFileContent('config.yaml');
    return <App cvYaml={cvYaml} configYaml={defaultConfigYaml}></App>
}

function loadFileContent(fileName) {
    const filePath = path.join(process.cwd(), `/data/${fileName}`);
    return fs.readFileSync(filePath, 'utf8');
}