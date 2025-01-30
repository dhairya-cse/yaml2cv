import { yamlContentToMap, mergeMapsRecursive, isArray } from "@/utils/util";
import { Resume } from "@/components/cv";
import { loadCvFile, loadConfigFile, cvFileExists, getLoggedInUser } from "@/utils/server-utils";
import { notFound, redirect } from "next/navigation";


export default async function Page({ params }) {
    const profile = (await params).profile;

    const loggedInUser = getLoggedInUser();
    const cvExists = await cvFileExists(profile);
    if (!cvExists) {
        if(loggedInUser === profile) {
            return redirect('/edit');
        }
        
        return <>Not Found</>;
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