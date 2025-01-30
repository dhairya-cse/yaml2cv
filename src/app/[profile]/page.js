import path from 'path';
import fs from 'fs';
import { yamlContentToMap, mergeMapsRecursive, isArray } from "@/utils/util";
import { Resume } from "@/components/cv";


export default async function Page({ params }) {
    const profile = (await params).profile;
    const loggedInUser = 'dhairya'

    let cvYaml = loadFileContent('cv.yaml')
    let defaultConfigYaml = loadFileContent('config.yaml');

    const cvData = yamlContentToMap(cvYaml);
    const cv = cvData.get('cv');
    let config = cvData.get('config');
    const defaultConfig = yamlContentToMap(defaultConfigYaml).get('config');
    config = mergeMapsRecursive(defaultConfig, config);

    return <Resume cv={cv} config={config}></Resume>
}

function loadFileContent(fileName) {
    const filePath = path.join(process.cwd(), `/data/${fileName}`);
    return fs.readFileSync(filePath, 'utf8');
}