"use client";

import React from "react";
import { useDataStore } from "../../store/useDataStore";
import { ArrowUp, ArrowLeft, ArrowUpLeft } from "lucide-react";

interface Step {
  i: number;
  j: number;
  value: number;
  direction: "diag" | "up" | "left";
  message: string;
}

interface BacktrackStep {
  i: number;
  j: number;
  char?: string;
  direction: "diag" | "up" | "left";
  isBacktrack: true;
}

type FullStep = Step | BacktrackStep;

interface LCSAnimationProps {
  currentStep: number;
}

export default function LCSAnimation({ currentStep }: LCSAnimationProps) {
  const data = useDataStore((state) => state.data);

  if (
    typeof data !== "object" ||
    data === null ||
    !("string1" in data) ||
    !("string2" in data)
  ) {
    return null;
  }

  const str1 = data.string1;
  const str2 = data.string2;

  const m = str1.length;
  const n = str2.length;

  const table: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );
  const dirTable: ("diag" | "up" | "left")[][] = Array.from(
    { length: m + 1 },
    () => Array(n + 1).fill("up")
  );

  const steps: Step[] = [];

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
        dirTable[i][j] = "diag";
        steps.push({
          i,
          j,
          value: table[i][j],
          direction: "diag",
          message: `Matched '${str1[i - 1]}' at (${i}, ${j}), taking diagonal.`,
        });
      } else if (table[i - 1][j] >= table[i][j - 1]) {
        table[i][j] = table[i - 1][j];
        dirTable[i][j] = "up";
        steps.push({
          i,
          j,
          value: table[i][j],
          direction: "up",
          message: `No match at (${i}, ${j}). Taking value from top.`,
        });
      } else {
        table[i][j] = table[i][j - 1];
        dirTable[i][j] = "left";
        steps.push({
          i,
          j,
          value: table[i][j],
          direction: "left",
          message: `No match at (${i}, ${j}). Taking value from left.`,
        });
      }
    }
  }

  const backtrackSteps: BacktrackStep[] = [];
  let bi = m;
  let bj = n;
  while (bi > 0 && bj > 0) {
    const dir = dirTable[bi][bj];
    if (dir === "diag") {
      backtrackSteps.push({
        i: bi,
        j: bj,
        char: str1[bi - 1],
        direction: dir,
        isBacktrack: true,
      });
      bi--;
      bj--;
    } else if (dir === "up") {
      backtrackSteps.push({ i: bi, j: bj, direction: dir, isBacktrack: true });
      bi--;
    } else {
      backtrackSteps.push({ i: bi, j: bj, direction: dir, isBacktrack: true });
      bj--;
    }
  }

  const fullSteps: FullStep[] = [...steps, ...backtrackSteps];

  const visibleTable = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill("")
  );
  const visibleDir = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(null)
  );
  const visibleBacktrack = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(false)
  );

  const constructedLCS: string[] = [];
  const redCells = new Set<string>(); // store "i,j" format

  for (
    let stepIndex = 0;
    stepIndex < currentStep && stepIndex < fullSteps.length;
    stepIndex++
  ) {
    const step = fullSteps[stepIndex];
    if ("value" in step) {
      visibleTable[step.i][step.j] = step.value;
      visibleDir[step.i][step.j] = step.direction;
    } else {
      visibleBacktrack[step.i][step.j] = true;
      if (step.char) {
        constructedLCS.unshift(step.char);
        redCells.add(`${step.i},${step.j}`);
      }
    }
  }

  const finalLCS = constructedLCS.join("");

  const currentInfo = (() => {
    if (currentStep === 0) return "Starting LCS computation...";
    const step = fullSteps[currentStep - 1];
    if (!step) return "";

    if ("value" in step) {
      return step.message;
    } else if ("char" in step && step.char) {
      return `Backtracking: Adding '${step.char}' to LCS.`;
    } else {
      return `Backtracking: Skipping cell at (${step.i}, ${step.j}).`;
    }
  })();

  const backtrackComplete = currentStep >= fullSteps.length;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 overflow-auto">
      <div className="text-sm mb-2 text-gray-600">
        Comparing <code>"{str1}"</code> and <code>"{str2}"</code>
      </div>

      <table className="border-collapse">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            {str2.split("").map((ch, j) => (
              <th key={j} className="px-2 py-1 text-sm text-gray-600">
                {ch}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: m + 1 }, (_, i) => (
            <tr key={i}>
              <td className="px-2 py-1 text-sm text-gray-600">
                {i > 0 ? str1[i - 1] : ""}
              </td>
              <td></td>
              {Array.from({ length: n + 1 }, (_, j) => {
                const value = visibleTable[i][j];
                const direction = visibleDir[i][j];
                const isBacktrack = visibleBacktrack[i][j];
                const isRed = redCells.has(`${i},${j}`);
                return (
                  <td
                    key={j}
                    className={`w-10 h-10 border relative text-center text-sm font-mono transition-all duration-200 ${
                      isRed
                        ? "bg-green-400 text-black font-bold"
                        : isBacktrack
                        ? "bg-red-400 text-black font-bold"
                        : value !== ""
                        ? "bg-blue-100 text-blue-800 font-semibold"
                        : "bg-gray-50"
                    }`}
                  >
                    {value}
                    {direction && (
                      <span className="absolute top-0 right-0 p-0.5 text-gray-400">
                        {direction === "diag" ? (
                          <ArrowUpLeft size={10} />
                        ) : direction === "up" ? (
                          <ArrowUp size={10} />
                        ) : (
                          <ArrowLeft size={10} />
                        )}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-700 font-medium">
        {currentInfo}
      </div>

      <div className="mt-2 text-base text-green-700 font-semibold">
        LCS So Far: {finalLCS || "—"}
      </div>

      {backtrackComplete && (
        <div className="mt-2 text-base text-purple-700 font-semibold">
          Thus, the longest common subsequence is{" "}
          <span className="underline">{finalLCS}</span>.
        </div>
      )}
    </div>
  );
}
