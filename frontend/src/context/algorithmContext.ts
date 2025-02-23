'use client'
import { SetAlgorithms } from "@/types/algorithm-context";
import { createContext, useState, useContext, Dispatch} from "react";

const AlgorithmContext = createContext<{algorithms: any[] | null, setAlgorithms: SetAlgorithms}>({ algorithms: null, setAlgorithms: () => {} });

export default AlgorithmContext;
