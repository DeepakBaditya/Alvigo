import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"; // Import icons from React Icons
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedSubheading from "@/components/AnimatedSubHeading";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Spotlight Background */}
      <div
        className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%)`,
        }}
      ></div>

      {/* Animate the heading with a slight drop-down effect */}
      <AnimatedHeading />

      <AnimatedSubheading />

      <div className="space-x-4 relative z-10 flex">
        {/* GitHub Button with GitHub Icon */}
        <a
          href="https://github.com/your-repo"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#808080] hover:text-black transition duration-300 flex items-center"
        >
          Login
        </a>

        {/* API Reference Button */}
        <button className="bg-white text-black border border-black px-6 py-3 rounded-lg font-semibold hover:border-white hover:text-black transition duration-300">
          Register
        </button>
      </div>

      {/* Get Started Link with Arrow Icon */}
      <Link
        href="/dashboard"
        className="mt-10 border border-transparent text-white px-6 py-4 w-48 h-15 text-lg rounded-3xl font-semibold hover:border-white  hover:scale-105 flex items-center justify-center relative z-10"
      >
        Explore
        <FaArrowRight className="ml-2" /> {/* Arrow Icon */}
      </Link>
    </div>
  );
}
