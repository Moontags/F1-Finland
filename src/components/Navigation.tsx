'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: 'Etusivu', href: '/' },
    { name: 'Sarjatilanne', href: '/standings' },
    { name: 'Kuljettajat', href: '/drivers' },
    { name: 'Radat', href: '/circuits' },
  ];

  return (
    <nav className="bg-dark-gray border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-f1-red">F1</span>
              <span className="text-2xl font-bold ml-2">Finland</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-f1-red text-white'
                    : 'text-gray-300 hover:bg-mid-gray hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-mid-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-f1-red"
            >
              <svg className={`h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-f1-red text-white'
                    : 'text-gray-300 hover:bg-mid-gray hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
