"use client"

import { yamlContentToMap, mergeMapsRecursive } from "@/utils/util";
import { Resume } from "./cv"
import YamlEditor from "./yaml-editor"
import { useEffect, useState } from "react";
import { EditorContainer, ResumeAppContainer, AppContainer } from '@/components/styled-comps'

export function App({ cvYaml, configYaml }) {
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
        <EditorContainer>
            <YamlEditor value={yamlContent} onChange={handleEditorChange} />
        </EditorContainer>
        <ResumeAppContainer>
            {resume}
        </ResumeAppContainer>
    </AppContainer>
}