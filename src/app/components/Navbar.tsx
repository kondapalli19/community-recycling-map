import Link from 'next/link';
import { FaRecycle } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-gray-50 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <FaRecycle className="text-green-600 text-2xl" />
            <span className="text-xl font-semibold text-gray-800">EcoTrack</span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 text-sm font-medium">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Home
            </Link>
            <Link href="/give-location" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Drop-off Map
            </Link>
            <Link href="/awareness" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Play & Learn
            </Link>
            <Link href="/footer" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Footer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
