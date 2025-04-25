"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { DataType, mapInput } from "@/types/algorithm-context";

interface CodeBlockProps {
  code: {
    python?: string;
    java?: string;
    c?: string;
  };
  input: DataType;
  algo: string;
}

export function CodeBlock({ code, input, algo }: CodeBlockProps) {
  const [language, setLanguage] = useState("python");

  const getFormattedCode = (code: string, input: DataType, algo: string) => {
    let updatedContent = code;
    switch (algo) {
      case "Min And Max":
        const array = input?.toString().split(",").map(Number);
        if (language === "python") {
          // Replace specific text (e.g., replace "old text" with "new text")
          updatedContent = code.replace(
            /arr\s*=\s*\[.*?\]/,
            `arr = ${JSON.stringify(array)}`
          );
        } else if (language === "java") {
          const newArrayString = `int[] arr = {${array?.join(", ")}};`;
          updatedContent = code.replace(
            /int\[\]\s*arr\s*=\s*\{.*?\};/,
            newArrayString
          );
        } else if (language === "c") {
          const newArrayString = `int arr[] = {${array}};`;
          updatedContent = code.replace(
            /int\s+arr\[\]\s*=\s*\{.*?\};/,
            newArrayString
          );
        }
        return updatedContent;

      case "Quick Sort":
        const array1 = input?.toString().split(",").map(Number);
        if (language === "python") {
          // Replace specific text (e.g., replace "old text" with "new text")
          updatedContent = code.replace(
            /arr\s*=\s*\[.*?\]/,
            `arr = ${JSON.stringify(array1)}`
          );
        } else if (language === "java") {
          const newArrayString = `int[] arr = {${array1?.join(", ")}};`;
          updatedContent = code.replace(
            /int\[\]\s*arr\s*=\s*\{.*?\};/,
            newArrayString
          );
        } else if (language === "c") {
          const newArrayString = `int arr[] = {${array1}};`;
          updatedContent = code.replace(
            /int\s+arr\[\]\s*=\s*\{.*?\};/,
            newArrayString
          );
        }
        return updatedContent;

      case "Selection Sort":
        const array4 = input?.toString().split(",").map(Number);
        if (language === "python") {
          // Replace specific text (e.g., replace "old text" with "new text")
          updatedContent = code.replace(
            /arr\s*=\s*\[.*?\]/,
            `arr = ${JSON.stringify(array4)}`
          );
        } else if (language === "java") {
          const newArrayString = `int[] arr = {${array4?.join(", ")}};`;
          updatedContent = code.replace(
            /int\[\]\s*arr\s*=\s*\{.*?\};/,
            newArrayString
          );
        } else if (language === "c") {
          const newArrayString = `int arr[] = {${array4}};`;
          updatedContent = code.replace(
            /int\s+arr\[\]\s*=\s*\{.*?\};/,
            newArrayString
          );
        }
        return updatedContent;

      case "Bubble Sort":
        const array2 = input?.toString().split(",").map(Number);
        if (language === "python") {
          // Replace specific text (e.g., replace "old text" with "new text")
          updatedContent = code.replace(
            /arr\s*=\s*\[.*?\]/,
            `arr = ${JSON.stringify(array2)}`
          );
        } else if (language === "java") {
          const newArrayString = `int[] arr = {${array2?.join(", ")}};`;
          updatedContent = code.replace(
            /int\[\]\s*arr\s*=\s*\{.*?\};/,
            newArrayString
          );
        } else if (language === "c") {
          const newArrayString = `int arr[] = {${array2}};`;
          updatedContent = code.replace(
            /int\s+arr\[\]\s*=\s*\{.*?\};/,
            newArrayString
          );
        }
        return updatedContent;

      case "Linear Search":
        if (
          typeof input === "object" &&
          input !== null &&
          "array" in input &&
          "target" in input
        ) {
          const target = input.target;
          const array3 = input?.array.toString().split(",").map(Number);
          if (language === "python") {
            // Replace specific text (e.g., replace "old text" with "new text")
            updatedContent = code
              .replace(/arr\s*=\s*\[.*?\]/, `arr = ${JSON.stringify(array3)}`)
              .replace(/target\s*=\s*\d+/, `target = ${target}`);
          } else if (language === "java") {
            const newArrayString = `int[] arr = {${array3?.join(", ")}};`;
            updatedContent = code
              .replace(/int\[\]\s*arr\s*=\s*\{.*?\};/, newArrayString)
              .replace(/int\s*target\s*=\s*\d+/, `target = ${target}`);
          } else if (language === "c") {
            const newArrayString = `int arr[] = {${array3}};`;
            updatedContent = code
              .replace(/int\s+arr\[\]\s*=\s*\{.*?\};/, newArrayString)
              .replace(/int\s*target\s*=\s*\d+/, `target = ${target}`);
          }
        }
        return updatedContent;

      case "Binary Search":
        if (
          typeof input === "object" &&
          input !== null &&
          "array" in input &&
          "target" in input
        ) {
          const target = input.target;
          const array3 = input?.array.toString().split(",").map(Number);
          if (language === "python") {
            // Replace specific text (e.g., replace "old text" with "new text")
            updatedContent = code
              .replace(/arr\s*=\s*\[.*?\]/, `arr = ${JSON.stringify(array3)}`)
              .replace(/target\s*=\s*\d+/, `target = ${target}`);
          } else if (language === "java") {
            const newArrayString = `int[] arr = {${array3?.join(", ")}};`;
            updatedContent = code
              .replace(/int\[\]\s*arr\s*=\s*\{.*?\};/, newArrayString)
              .replace(/int\s*target\s*=\s*\d+/, `target = ${target}`);
          } else if (language === "c") {
            const newArrayString = `int arr[] = {${array3}};`;
            updatedContent = code
              .replace(/int\s+arr\[\]\s*=\s*\{.*?\};/, newArrayString)
              .replace(/int\s*target\s*=\s*\d+/, `target = ${target}`);
          }
        }
        return updatedContent;

      case "Jump Search":
        if (
          typeof input === "object" &&
          input !== null &&
          "array" in input &&
          "target" in input
        ) {
          const target = input.target;
          const array3 = input?.array.toString().split(",").map(Number);
          if (language === "python") {
            // Replace specific text (e.g., replace "old text" with "new text")
            updatedContent = code
              .replace(/arr\s*=\s*\[.*?\]/, `arr = ${JSON.stringify(array3)}`)
              .replace(/target\s*=\s*\d+/, `target = ${target}`);
          } else if (language === "java") {
            const newArrayString = `int[] arr = {${array3?.join(", ")}};`;
            updatedContent = code
              .replace(/int\[\]\s*arr\s*=\s*\{.*?\};/, newArrayString)
              .replace(/int\s*target\s*=\s*\d+/, `target = ${target}`);
          } else if (language === "c") {
            const newArrayString = `int arr[] = {${array3}};`;
            updatedContent = code
              .replace(/int\s+arr\[\]\s*=\s*\{.*?\};/, newArrayString)
              .replace(/int\s*target\s*=\s*\d+/, `target = ${target}`);
          }
        }
        return updatedContent;

      case "Longest Common Subsequence":
        if (
          typeof input === "object" &&
          input !== null &&
          "string1" in input &&
          "string2" in input
        ) {
          const string1 = input.string1;
          const string2 = input.string2;

          if (language === "python") {
            // Replace specific text (e.g., replace "old text" with "new text")
            updatedContent = code
              .replace(/X\s*=\s*".*?"/, `X = "${string1}"`)
              .replace(/Y\s*=\s*".*?"/, `Y = "${string2}"`);
          } else if (language === "java") {
            updatedContent = code
              .replace(/String\s+X\s*=\s*".*?";/, `String X = "${string1}";`) // Replace X value
              .replace(/String\s+Y\s*=\s*".*?";/, `String Y = "${string2}";`);
          } else if (language === "c") {
            updatedContent = code
              .replace(/char\s+X\[\]\s*=\s*".*?";/, `char X[] = "${string1}";`) // Replace X value
              .replace(/char\s+Y\[\]\s*=\s*".*?";/, `char Y[] = "${string2}";`);
          }
        }
        return updatedContent;

      case "Prims":
        // Convert edges to Python format
        if (
          Array.isArray(input) &&
          input.every(
            (item) =>
              typeof item === "object" &&
              "from" in item &&
              "to" in item &&
              "weight" in item
          )
        ) {
          // **Find the number of vertices (max index + 1)**
          const V = Math.max(...input.flatMap((e) => [e.from, e.to])) + 1;

          // **Initialize adjacency matrix**
          const graph: number[][] = Array.from({ length: V }, () =>
            Array(V).fill(0)
          );

          // **Fill the matrix based on edges**
          input.forEach(({ from, to, weight }) => {
            graph[from][to] = weight;
            graph[to][from] = weight; // Since it's an undirected graph
          });

          if (language === "python") {
            const matrixText =
              "g.graph = [\n" +
              graph.map((row) => `    [${row.join(", ")}]`).join(",\n") +
              "\n]";
            // Replace existing edges
            updatedContent = code.replace(
              /g\.graph\s*=\s*\[\[[\s\S]*?\]\]/,
              matrixText
            );
            // Now insert the new edges at the correct place
          } else if (language === "java") {
            // **Convert matrix to Java format**
            const matrixText = `int graph[][] = new int[][] { ${graph
              .map((row) => `{ ${row.join(", ")} }`)
              .join(",\n                                      ")} };`;
            updatedContent = code.replace(
              /int graph\[\]\[\] = new int\[\]\[\] \{[\s\S]*?\};/,
              matrixText
            );
          } else if (language === "c") {
            const cMatrixText =
              `int graph[${V}][${V}] = {\n` +
              graph.map((row) => `    { ${row.join(", ")} }`).join(",\n") +
              "\n};";
            updatedContent = code.replace(
              /int\s+graph\[\w+\]\[\w+\]\s*=\s*\{[\s\S]*?\};/,
              cMatrixText
            );
          }
        }
        return updatedContent;
    }
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
                {getFormattedCode(content, input, algo)}
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
