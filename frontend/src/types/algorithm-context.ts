export interface Algorithm {
  _id: string;
  title: string;
  category: string;
  code: string;
  timecomplexity: string;
}

export type AlgorithmCard = {
  _id: string;
  title: string;
};

export type Category = {
  name: string;
  numberOfAlgorithms: number;
  algorithms: Pick<Algorithm, "_id" | "title">[];
};

import { Dispatch, SetStateAction } from "react";

// export type Algorithms = Algorithm[] |null

export type Algorithms = any[] | null;
export type SetAlgorithms = Dispatch<SetStateAction<Algorithms>>;
