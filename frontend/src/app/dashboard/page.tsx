import { Category, CategoryWithId } from "@/types/algorithm-context";
import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CategoryCard from "@/components/CategoryCard";

async function getAllCategories(): Promise<CategoryWithId[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "category"));
    const categories: CategoryWithId[] = [];

    querySnapshot.forEach((doc) => {
      const categoryData = doc.data() as Category; // Cast doc.data() to the Category type
      categories.push({
        id: doc.id, // Include the document ID
        ...categoryData, // Spread the rest of the document data
      });
    });
    return categories; // Return the array of categories with IDs
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
}

const Dashboard = async () => {
  const categories = await getAllCategories();
  return (
    <div className="container mx-auto p-4">
      {/* Categories Horizontal Scroll Bar */}
      <div className="overflow-x-auto whitespace-nowrap mb-6">
        <div className="flex gap-4">
          {categories.map((category: Category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              algorithms={category.algorithms}
            />
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
                href={`dashboard/algorithm/${algorithm.id}`}
                key={algorithm.id}
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{algorithm.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
