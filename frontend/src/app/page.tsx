import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedSubheading from "@/components/AnimatedSubHeading";
import logo from '../../public/logo.png';

export default function Home() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
            <Image
              src={logo}
              alt="Alvigo Logo"
              width={100} 
              height={50} 
              layout="responsive"    
              objectFit="cover" 
            />
              <span className="text-xl font-bold text-gray-800">Alvigo</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/sorting" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Algos</Link>
              <Link href="/pathfinding" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Visualizations</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side - Text Content */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Algorithm Visualizer</h1>
              <p className="text-xl text-gray-600 mb-8">
                Algorithm Visualizer animates algorithms step-by-step, making learning, debugging and exploration intuitive and interactive.
              </p>
            <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Explore Now <FaArrowRight className="ml-2" />
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              {/* Replace with your actual image */}
              <Image 
                src="/images/algorithm-visualization.png" // Update with your image path
                alt="Algorithm Visualization"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Features</h2>
          <div className="border-b-2 border-gray-200 w-20 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-medium text-gray-800 mb-3">Sorting Algorithms</h3>
            <p className="text-gray-600">
              Visualize bubble sort, merge sort, quick sort and more with interactive animations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-medium text-gray-800 mb-3">Pathfinding</h3>
            <p className="text-gray-600">
              See how Dijkstra's, A*, and other pathfinding algorithms work in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}