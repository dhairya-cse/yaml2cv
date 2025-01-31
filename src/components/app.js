"use client"

import { yamlContentToMap, mergeMapsRecursive, isArray } from "@/utils/util";
import { Resume } from "./cv"
import YamlEditor from "./yaml-editor"
import { useEffect, useState } from "react";


export function App({ cvYaml, configYaml }) {
    return <App_ cvYaml={cvYaml} configYaml={configYaml} />
}

export function App_({ cvYaml, configYaml }) {
    const [yamlContent, setYamlContent] = useState(cvYaml);
    const [resume, setResume] = useState();
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false); // Mark loading as complete
        }
    }, [yamlContent])

    const handleEditorChange = (value) => {
        setYamlContent(value);
    };

    if (loading) {
        return <>Loading...</>
    }

    return <AppContainer>
        <EditorWithContainer yamlContent={yamlContent} handleEditorChange={handleEditorChange} />
        <ResumeWithContainer resume={resume} />
    </AppContainer>
}

function AppContainer({ children, canEdit }) {
    return <div className="flex h-full overflow-hidden print:contents">
        {children}
    </div>
}


function EditorWithContainer({ yamlContent, handleEditorChange }) {
    return <div className="flex-1 h-full bg-white border-r-slate-300 border-r-2 border-black print:hidden">
        <YamlEditor value={yamlContent} onChange={handleEditorChange} />
    </div>
}

function ResumeWithContainer({ resume }) {
    return <div className="h-full overflow-y-auto bg-white print:contents" >
        {resume}
    </div>
}