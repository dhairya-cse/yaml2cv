"use client"
import CodeMirror from "@uiw/react-codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { linter } from "@codemirror/lint";
import { EditorView, keymap } from "@codemirror/view";
import YAML from 'yaml';
import { useState, useCallback, useEffect, useContext } from "react";
import debounce from "lodash/debounce";
import { useError } from "./error-provider";


const AUTOSAVE_DELAY = 1000; // Delay in milliseconds

async function saveFile(content) {
  console.info("Saving the file")
  //TODO: implement this
  console.info("Saved the file")
}

const YamlEditor = ({ value, onChange }) => {
  const { pushError, clearErrors } = useError();
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
    const diagnostics = []
    clearErrors('editor')
    try {
      YAML.parse(doc);
    } catch (err) {

      const { message, pos, linePos } = err;

      pushError('editor', message);

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
    </div>
  );
};

export default YamlEditor;
