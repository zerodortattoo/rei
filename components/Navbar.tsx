import React from 'react';

export const Navbar: React.FC = () => {
  const links = ['Moeda', 'Contas', 'Software'];
  return (
    <nav className="bg-[#1c1c20] border-b border-[#27272a] overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-8 h-12 min-w-max">
          {links.map((link) => (
            <li key={link}>
              <a href="#" className="text-sm font-medium text-gray-400 hover:text-[#F5C518] transition-colors flex items-center gap-2">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};