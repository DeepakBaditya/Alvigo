'use client'
import React, { useState} from "react";
import AlgorithmContext from "./algorithmContext";
import { Algorithms } from "@/types/algorithm-context";

interface AlgorithmContextProviderProps {
    children: React.ReactNode
}

const AlgorithmContextProvider:React.FC<AlgorithmContextProviderProps>  = ({children}) => {
    const [algorithms, setAlgorithms] = useState<Algorithms>(null);
    return (
        <AlgorithmContext.Provider value={{ algorithms, setAlgorithms }}>
            {children}
        </AlgorithmContext.Provider>
    )
}

export default AlgorithmContextProvider;