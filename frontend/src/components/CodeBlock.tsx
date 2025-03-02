import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  fileContent: string;
  fileType: string;
}

export default function CodeBlock({ fileContent, fileType }: CodeBlockProps) {
  if (fileType !== "python") {
    return <p className="text-red-500">Unsupported file type</p>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Python Code</h2>
      <SyntaxHighlighter
        language="python"
        style={oneDark}
        className="rounded-lg h-full"
      >
        {fileContent}
      </SyntaxHighlighter>
    </div>
  );
}
