"use client"

import { yamlContentToMap, mergeMapsRecursive } from "@/utils/util";
import { Resume } from "./cv"
import YamlEditor from "./yaml-editor"
import { useEffect, useState } from "react";

export function App({ cvYaml, configYaml }) {
    const [yamlContent, setYamlContent] = useState(cvYaml);
    const [resume, setResume] = useState();

    useEffect(() => {
        try {
            const cvData = yamlContentToMap(yamlContent);
            const cv = cvData.get('cv');
            let config = cvData.get('config');
            const defaultConfig = yamlContentToMap(configYaml).get('config');

            config = mergeMapsRecursive(defaultConfig, config);
            yamlContentToMap(yamlContent)
            const resumeEvaluated = <Resume cv={cv} config={config}></Resume>
            setResume(resumeEvaluated);
        }
        catch (error) {
            console.log(error);
        }
    }, [yamlContent])

    const handleEditorChange = (value) => {
        setYamlContent(value);
    };

    return <div className="flex h-screen overflow-hidden print:contents">
        <div className="flex-1 h-full overflow-y-auto bg-white border-r-slate-300 border-r-2 border-black print:hidden">
            <YamlEditor value={yamlContent} onChange={handleEditorChange} />
        </div>
        <div className="h-full overflow-y-auto bg-white print:contents" >
            {resume}
        </div>
    </div>
}