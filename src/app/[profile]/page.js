import { yamlContentToMap, mergeMapsRecursive, isArray } from "@/utils/util";
import { Resume } from "@/components/cv";
import { loadCvFile, loadConfigFile, getCommonFlags } from "@/utils/server-utils";
import { redirect } from "next/navigation";
import { AppContainer, ResumeAppContainer } from "@/components/styled-comps";


export default async function Page({ params }) {
    const { canEdit, cvExists, profile } = await getCommonFlags(params);

    if (!cvExists) {
        if (canEdit) {
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

    return <AppContainer>
        <ResumeAppContainer>
            <Resume cv={cv} config={config}></Resume>
        </ResumeAppContainer>
    </AppContainer>

}