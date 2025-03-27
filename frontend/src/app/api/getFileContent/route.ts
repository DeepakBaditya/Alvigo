import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Get `codePath` from request query parameters
    const { searchParams } = new URL(req.url);
    const codePath = searchParams.get("codePath");

    if (!codePath) {
      return NextResponse.json({ error: "Missing codePath" }, { status: 400 });
    }

    const directoryPath = path.join(
      process.cwd(),
      "src/algorithmCode",
      codePath
    );
    const extensions = { python: ".py", java: ".java", c: ".c" };
    const code: { python?: string; java?: string; c?: string } = {};

    // Read files in the given directory
    const files = await fs.readdir(directoryPath);

    for (const [key, ext] of Object.entries(extensions)) {
      const fileName = files.find((file) => file.endsWith(ext));
      if (fileName) {
        const filePath = path.join(directoryPath, fileName);
        code[key as keyof typeof extensions] = await fs.readFile(
          filePath,
          "utf-8"
        );
      }
    }

    return NextResponse.json({ code });
  } catch (error) {
    console.error("Error reading files:", error);
    return NextResponse.json({ error: "File not found" }, { status: 500 });
  }
}
