// Type for an individual algorithm
export type categoryAlgorithm = {
  id: string;
  name: string;
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
  input: Object;
  properties: properties;
};
