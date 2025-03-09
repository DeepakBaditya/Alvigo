import { Category } from "@/types/algorithm-context";
import Link from "next/link";

async function getCategories() {
  const res = await fetch("http://localhost:3000/api/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

const Dashboard = async () => {
  const categories = await getCategories();
  return (
    <div className="container mx-auto p-4">
      {/* Categories Horizontal Scroll Bar */}
      <div className="overflow-x-auto whitespace-nowrap mb-6">
        <div className="flex gap-4">
          {categories.map((category: Category) => (
            <div
              key={category.name}
              className="min-w-[200px] p-4 bg-blue-500 text-white text-center rounded-lg shadow-md cursor-pointer hover:bg-blue-600"
            >
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm">
                {category.numberOfAlgorithms} Algorithms
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories with Algorithm Cards */}
      {categories.map((category: Category) => (
        <div key={category.name} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.algorithms.map((algorithm) => (
              <Link
                href={`dashboard/algorithm/${algorithm._id}`}
                key={algorithm._id}
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{algorithm.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
