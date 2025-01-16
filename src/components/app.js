"use client"

import { yamlContentToMap, mergeMapsRecursive } from "@/utils/util";
import { Resume } from "./cv"
import YamlEditor from "./yaml-editor"
import { useEffect, useState } from "react";

export function App({ cvYaml, configYaml, loggedIn, canEdit }) {
    const [yamlContent, setYamlContent] = useState(cvYaml);
    const [resume, setResume] = useState();
    const [error, setError] = useState(null);

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
            setError("Incorrect format for YAML, please check");
        }
    }, [yamlContent])

    const handleEditorChange = (value) => {
        setYamlContent(value);
    };

    if (canEdit) {
        return <div className="flex h-screen overflow-hidden print:contents">
            <div className="flex-1 h-full overflow-y-auto bg-white border-r-slate-300 border-r-2 border-black print:hidden">
                <YamlEditor value={yamlContent} onChange={handleEditorChange} />
            </div>
            <ResumeWithContainer resume={resume} />
        </div>
    } else {
        return resume;
    }
}

function EditorWithContainer({ yamlContent, handleEditorChange }) {
    return
}

function ResumeWithContainer({ resume }) {
    return <div className="h-full overflow-y-auto bg-white print:contents" >
        {resume}
    </div>
}