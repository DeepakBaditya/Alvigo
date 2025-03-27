"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface CodeBlockProps {
  code: {
    python?: string;
    java?: string;
    c?: string;
  };
  input: string;
}

export function CodeBlock({ code, input }: CodeBlockProps) {
  const [language, setLanguage] = useState("python");

  const getFormattedCode = (code: string, array: number[]) => {
    const arrayStr = `[${array.join(", ")}]`;
    let formattedCode = code;

    if (language === "python") {
      formattedCode += `\n\n# Example usage:\narr = ${arrayStr}\nmin_val, max_val = find_min_max(arr, 0, len(arr) - 1)\nprint(f"Min: {min_val}, Max: {max_val}")`;
    } else if (language === "java") {
      formattedCode += `\n\n    // Example usage:\n    public static void main(String[] args) {\n        int[] arr = {${array.join(
        ", "
      )}};\n        Pair result = findMinMax(arr, 0, arr.length - 1);\n        System.out.println("Min: " + result.min + ", Max: " + result.max);\n    }`;
    } else if (language === "c") {
      formattedCode += `\n\n// Example usage:\nint main() {\n    int arr[] = {${array.join(
        ", "
      )}};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    struct Pair result = findMinMax(arr, 0, n - 1);\n    printf("Min: %d, Max: %d\\n", result.min, result.max);\n    return 0;\n}`;
    }

    return formattedCode;
  };

  return (
    <Card className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Implementation</h2>
      <Tabs value={language} onValueChange={setLanguage}>
        <TabsList className="mb-4">
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="java">Java</TabsTrigger>
          <TabsTrigger value="c">C</TabsTrigger>
        </TabsList>
        {Object.entries(code).map(([lang, content]) => (
          <TabsContent key={lang} value={lang}>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code className="text-sm font-mono whitespace-pre">
                {getFormattedCode(content, [1, 2, 3, 4])}
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
