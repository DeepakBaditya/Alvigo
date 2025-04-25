// Type for an individual algorithm
export type categoryAlgorithm = {
  id: string;
  name: string;
  description: string;
  properties: properties;
};

// Type for a category document
export type Category = {
  name: string;
  algorithms: categoryAlgorithm[];
};

// Type for the returned data (including the document ID)
export type CategoryWithId = {
  id: string; // Document ID
} & Category; // Combine with the Category type

export type properties = {
  timeComplexity: string;
  spaceComplexity: string;
};

export type algorithm = {
  id: string;
  name: string;
  category: string;
  codePath: string;
};

export type Edge = {
  from: number;
  to: number;
  weight: number;
};

export type mapInput = {
  string1: string;
  string2: string;
};

export type lineraSearchInput = {
  array: number[];
  target: number;
};

export type DataType =
  | string
  | number[]
  | mapInput
  | Edge[]
  | lineraSearchInput
  | null; // Can be a string, array, graph, or null
