"use client"
import CodeMirror from "@uiw/react-codemirror";
import { yaml } from "@codemirror/lang-yaml";

const YamlEditor = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      maxHeight="100%"
      extensions={[yaml()]}
      onChange={onChange}
      theme="light"
    />
  );
};

export default YamlEditor;
