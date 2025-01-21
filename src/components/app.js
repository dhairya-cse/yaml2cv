"use client"

import { yamlContentToMap, mergeMapsRecursive, isArray } from "@/utils/util";
import { Resume } from "./cv"
import YamlEditor from "./yaml-editor"
import { Suspense, useEffect, useState } from "react";
import { ErrorProvider, useError } from "./error-provider";


export function App({ cvYaml, configYaml, loggedIn, canEdit }) {
    return <ErrorProvider>
            <App_ cvYaml={cvYaml} configYaml={configYaml} loggedIn={loggedIn} canEdit={canEdit} />
    </ErrorProvider>
}

export function App_({ cvYaml, configYaml, loggedIn, canEdit }) {
    const [yamlContent, setYamlContent] = useState(cvYaml);
    const [resume, setResume] = useState();
    const [loading, setLoading] = useState(true);


    const {pushError, clearErrors} = useError()

    useEffect(() => {
        clearErrors('app');
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
            console.log("HERERERERE")
            pushError('app',"Incorrect format for YAML, please check");
            console.log(error);
        } finally {
            setLoading(false); // Mark loading as complete
        }
    }, [yamlContent])

    const handleEditorChange = (value) => {
        setYamlContent(value);
    };

    if(loading)
    {
        return <>Loading...</>
    }

    return <AppContainer canEdit={canEdit}>
            {canEdit ? <EditorWithContainer yamlContent={yamlContent} handleEditorChange={handleEditorChange} /> : <></>}
            <ResumeWithContainer resume={resume} />
            <Errors></Errors>
    </AppContainer>
}


function Errors() {
    const { getAllErrors} = useError()
    const errors = getAllErrors()
    if (!errors || !isArray(errors) || !errors.length) {
        return <></>;
    }

    return <pre className="fixed bottom-0 text-sm  bg-red-400 bg-opacity-95 p-1 w-full">
        <span className="font-bold">Error:</span>
        {errors.map((error, index) => <p key={`errors-${index}`}>{error}</p>)}
    </pre>
}

function AppContainer({ children, canEdit }) {
    if (canEdit) {
        return <div className="flex h-screen overflow-hidden print:contents">
            {children}
        </div>
    }
    else {
        return <>{children}</>
    }
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