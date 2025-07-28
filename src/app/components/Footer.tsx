import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo and Mission */}
        <div>
          <h2 className="text-2xl font-bold mb-2">EcoTrack</h2>
          <p className="text-gray-400">
            Empowering communities to reduce plastic waste through awareness and action.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Drop-off Map</a></li>
            <li><a href="#" className="hover:text-white transition">Play & Learn</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/kondapalli19/community-recycling-map/tree/dev" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-gray-500 text-center py-4 text-sm">
        &copy; 2025 EcoTrack. Built for awareness and action.
      </div>
    </footer>
  );
}
