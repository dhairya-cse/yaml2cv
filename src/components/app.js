"use client"

import { yamlContentToMap, mergeMapsRecursive } from "@/utils/util";
import { Resume } from "./cv"
import YamlEditor from "./yaml-editor"
import { useState } from "react";

export function App({ cvYaml, configYaml }) {
    const [yamlContent, setYamlContent] = useState(cvYaml);

    const cvData = yamlContentToMap(yamlContent);
    const cv = cvData.get('cv');
    let config = cvData.get('config');
    const defaultConfig = yamlContentToMap(configYaml).get('config');

    config = mergeMapsRecursive(defaultConfig, config);

    const handleEditorChange = (value) => {
        setYamlContent(value); // Update parent state with editor changes
    };

    return <div className="flex h-screen overflow-hidden print:contents">
        <div className="flex-1 h-full overflow-y-auto pr-1 print:hidden">
            <YamlEditor value={yamlContent} onChange={handleEditorChange} />
        </div>
        <div className="h-full overflow-y-auto bg-white print:contents">
            <Resume cv={cv} config={config}></Resume>
        </div>
    </div>
}