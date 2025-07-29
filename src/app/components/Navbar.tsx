'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const links = [
  { name: 'Home', hash: '#home' },
  { name: 'Drop-off Map', hash: '#drop-off' },
  { name: 'Play & Learn', hash: '#learn' },
  { name: 'Footer', hash: '#footer' },
];


export default function Navbar() {
  const [activeSection, setActiveSection] = useState('Home');

  return (
    <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0 z-50 bg-white/80 backdrop-blur-md rounded-xl shadow-md">
      <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-green-600 sm:w-[initial] sm:flex-nowrap sm:gap-5">
        {links.map((link) => (
          <motion.li
            className="h-3/4 flex items-center justify-center relative"
            key={link.hash}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              className={clsx(
                'flex w-full items-center justify-center !text-green-800 px-3 py-3 hover:text-green-800 transition',
                {
                  '!text-green-800 font-semibold': activeSection === link.name,
                }
              )}
              href={link.hash}
              onClick={() => {
                setActiveSection(link.name);
              }}
            >
              {link.name}
              {activeSection === link.name && (
                <motion.span
                  className="bg-green-100 rounded-full absolute inset-0 -z-10"
                  layoutId="activeSection"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
