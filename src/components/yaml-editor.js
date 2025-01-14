"use client"
import CodeMirror from "@uiw/react-codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { linter, Diagnostic } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";
import YAML from 'yaml';
import { useState, useCallback } from "react";



const YamlEditor = ({ value, onChange }) => {
  const [errors, setErrors] = useState([]);

  const validateYaml = (doc) => {
    const diagnostics = [];
    try {
      YAML.parse(doc); // Parse YAML content
    } catch (err) {
      // Extract error details
      const { message, pos, linePos } = err;
      console.log(message, "pos", pos, linePos);

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
    <CodeMirror
      value={value}
      minWidth="45rem"
      extensions={[yaml(), yamlLinter, EditorView.lineWrapping]}
      onChange={onChange}
      theme="light"
    />
  );
};

export default YamlEditor;
