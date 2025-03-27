import { ALGORITHMS } from "@/constants/algorithms"; // Adjust path if needed
import { algorithm } from "@/types/algorithm-context";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse JSON body
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Find the algorithm by ID
    const algorithm: Algorithm | undefined = ALGORITHMS.find(
      (alg) => alg._id === id
    );

    if (!algorithm) {
      return NextResponse.json(
        { error: "Algorithm not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ algorithm });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
