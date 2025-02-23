import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const categoryName = (await params).category;
  return (
    <div>All Question within category {categoryName} will render here</div>
  );
};

export default CategoryPage;
