// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import logo from '../../public/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-9l mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Description */}
          <div className="md:col-span-2">
            <Image
                className='mb-2'
                src={logo}
                alt="Alvigo Logo"
                width={50} 
                height={50}
                style={{ borderRadius: '50%' }} 
                />
                
            <p className="text-gray-600 mb-4">
              Alvigo provides interactive and intuitive algorithm visualization, making complex concepts easy to understand. 
              Accessible online for students, educators, and developers.
            </p>
            <p className="text-gray-500 text-sm">
              © Alvigo PVT LTD {currentYear}. All rights reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-white transition">About</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-white transition">Documentation</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-white transition">Tutorials</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-white transition">Community</Link></li>
            </ul>
          </div>

          {/* Follow Me Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
            <ul className="space-y-2">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition">Twitter</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;