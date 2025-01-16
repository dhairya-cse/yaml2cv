"use client"
import CodeMirror from "@uiw/react-codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { linter } from "@codemirror/lint";
import { EditorView, keymap } from "@codemirror/view";
import YAML from 'yaml';
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";


const AUTOSAVE_DELAY = 1000; // Delay in milliseconds

async function saveFile(content) {
  console.info("Saving the file")
  //TODO: implement this
  console.info("Saved the file")
}

const YamlEditor = ({ value, onChange }) => {
  const [error, setError] = useState(null);
  // TODO: use error context provider for centralised handling!
  const [lastSavedContent, setLastSavedContent] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const performSave = useCallback(
    async (newContent) => {
      if (newContent !== lastSavedContent && !isSaving) {
        setIsSaving(true);
        try {
          await saveFile(newContent);
          setLastSavedContent(newContent);
        } catch (error) {
          console.error("Save failed:", error);
        } finally {
          setIsSaving(false);
        }
      }
    },
    [lastSavedContent, isSaving]
  );

  // Debounced Save
  const debouncedSave = useCallback(
    debounce((newContent) => {
      performSave(newContent);
    }, AUTOSAVE_DELAY),
    [performSave]
  );

  // Handle Manual Save (Cmd + S)
  const saveKeymap = keymap.of([
    {
      key: "Mod-s",
      run: () => {
        performSave(value); // Immediate save on manual trigger
        return true; // Prevent browser's default "Save As" dialog
      },
    },
  ]);

  useEffect(() => {
    if (value) {
      debouncedSave(value); // Trigger autosave on value change
    }
    return () => debouncedSave.cancel(); // Cleanup debounce on unmount
  }, [value, debouncedSave]);

  const validateYaml = (doc) => {
    const diagnostics = [];
    try {
      YAML.parse(doc); // Parse YAML content
      setError(null);
    } catch (err) {
      // Extract error details
      const { message, pos, linePos } = err;

      setError(message);

      if (pos !== undefined && linePos) {
        diagnostics.push({
          from: pos[0],
          to: pos[1],
          severity: "error",
          message: message || "Unknown YAML Error",
        });
      }
    }
    return diagnostics;
  };

  const debouncedLinter = useCallback(
    (view) => {
      const doc = view.state.doc.toString();
      return validateYaml(doc);
    },
    [validateYaml]
  );

  // Linter extension triggered only on keypress
  const yamlLinter = linter((view) => debouncedLinter(view));

  return (
    <div className="content">
      <CodeMirror
        value={value}
        minWidth="45rem"
        extensions={[yaml(), yamlLinter, EditorView.lineWrapping, saveKeymap]}
        onChange={onChange}
        theme="light"
      />
      {error ? <pre className="fixed bottom-0 text-sm  bg-red-400 bg-opacity-95 p-1 w-full"><span className="font-bold">Error:</span> {error}</pre> : <></>}
    </div>
  );
};

export default YamlEditor;
