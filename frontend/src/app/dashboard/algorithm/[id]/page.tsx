import React from "react";
import path from "path";
import { promises as fs } from "fs";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import CodeBlock from "@/components/CodeBlock";
import { algorithm } from "@/types/algorithm-context";
import ArrayInput from "@/components/ArrayInput";
import StringInput from "@/components/StringInput";

export const getAlgorithmById = async (
  id: string
): Promise<algorithm | null> => {
  try {
    const docRef = doc(db, "algorithm", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as algorithm;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

// Define input components
const InputComponents: Record<string, React.FC<{ name: string }>> = {
  array: ({ name }) => <ArrayInput />,
  string: ({ name }) => <StringInput />,
};

// Function to read code file from local storage
async function getFileContent(codePath: string): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src/algorithmCode",
    `${codePath}.py`
  );
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading file:", error);
    return "Error: File not found";
  }
}

// Main Page Component
const AlgorithmPage = async ({ params }: { params?: { id?: string } }) => {
  if (!params || !params.id) {
    return <div className="text-center text-red-500">Invalid Algorithm ID</div>;
  }
  // const [submittedArray, setSubmittedArray] = useState<number[]>([]);

  // const handleArraySubmit = (numbers: number[]) => {
  //   setSubmittedArray(numbers); // Store the submitted array
  //   console.log("Received Array:", numbers); // Debugging output
  // };

  const { id } = params;
  const algorithm = await getAlgorithmById(id);
  const inputs = algorithm?.input;
  console.log(inputs);
  if (!algorithm) {
    return <div className="text-center text-red-500">Algorithm not found</div>;
  }

  const fileContent = await getFileContent(algorithm.codePath);

  return (
    <div>
      <div className="w-full h-fit p-8">
        <div>
          {(() => {
            const elements = [];

            for (const [type, count] of Object.entries(inputs ?? {}) as [
              string,
              number
            ][]) {
              if (!InputComponents[type]) {
                console.error(`Missing input component for type: ${type}`);
                continue; // Skip if component is missing
              }

              for (let index = 0; index < count; index++) {
                const name = `${type}_${index}`;
                const Component = InputComponents[type]; // Get the correct component

                elements.push(
                  <div key={name}>
                    <Component name={name} />
                  </div>
                );
              }
            }

            return <>{elements}</>;
          })()}
        </div>
      </div>
      <div className="flex p-10">
        <div className="w-1/2">
          <CodeBlock fileContent={fileContent} fileType="python" />
        </div>
        <div className="w-1/2 h-[700px] bg-white"></div>
      </div>
    </div>
  );
};

export default AlgorithmPage;
