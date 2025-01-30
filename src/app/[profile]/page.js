import { yamlContentToMap, mergeMapsRecursive, isArray } from "@/utils/util";
import { Resume } from "@/components/cv";
import { loadCvFile, loadConfigFile, cvFileExists } from "@/utils/server-utils";
import { notFound } from "next/navigation";


export default async function Page({ params }) {
    const profile = (await params).profile;
    const loggedInUser = 'dhairya'

    const cvExists = await cvFileExists(profile);
    if (!cvExists) {
        return <>Not Found</>
    }

    let cvYaml = await loadCvFile(profile);
    let defaultConfigYaml = await loadConfigFile();

    const cvData = yamlContentToMap(cvYaml);
    const cv = cvData.get('cv');
    let config = cvData.get('config');
    const defaultConfig = yamlContentToMap(defaultConfigYaml).get('config');
    config = mergeMapsRecursive(defaultConfig, config);

    return <Resume cv={cv} config={config}></Resume>
}