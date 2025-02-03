"use client"
import CodeMirror from "@uiw/react-codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { linter } from "@codemirror/lint";
import { EditorView, keymap } from "@codemirror/view";
import YAML from 'yaml';
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { formatDistanceToNow } from "date-fns";
import { saveFileOnServer } from '@/app/server-actions'


const AUTOSAVE_DELAY = 5000; // Delay in milliseconds

const YamlEditor = ({ value, onChange }) => {
  const [lastSavedContent, setLastSavedContent] = useState(value);
  const [lastSavedTime, setLastSavedTime] = useState();
  const [isSaving, setIsSaving] = useState(false);

  const performSave = useCallback(
    async (newContent) => {
      if (newContent !== lastSavedContent && !isSaving) {
        setIsSaving(true);
        console.info("Saving the file")
        const res = await saveFileOnServer({ content: newContent })
        if (res.success) {
          setLastSavedContent(newContent);
          console.info("Saved the file")
          setLastSavedTime(new Date());
        }
        else {
          console.error("File not saved", res.error)
        }
        setIsSaving(false);
      }
    },
    [lastSavedContent, isSaving]
  );


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
    try {
      YAML.parse(doc);
    } catch (err) {

      const { message, pos, linePos } = err;

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

  const debouncedLinter =
    (view) => {
      const doc = view.state.doc.toString();
      return validateYaml(doc);
    }

  // Linter extension triggered only on keypress
  const yamlLinter = linter((view) => debouncedLinter(view));

  return (
    <div className="flex flex-col h-full">
      <div className="content flex-1 overflow-y-auto">
        <CodeMirror
          value={value}
          minWidth="45rem"
          extensions={[yaml(), yamlLinter, EditorView.lineWrapping, saveKeymap]}
          onChange={onChange}
          theme="light"
        />
      </div>
      {value && <p className="bg-slate-200">Last saved: {renderTime(lastSavedTime)}</p>}
    </div>
  );
};

export default YamlEditor;


const renderTime = (lastSavedTime) => {
  if (!lastSavedTime) {
    return "";
  }

  const now = new Date();

  if (now - lastSavedTime < 5000) {
    return "just now";
  }

  return formatDistanceToNow(lastSavedTime, { addSuffix: true });
};