import React from 'react';
import Link from 'next/link';

import { publicRoutes } from 'infrastructure/router/routes';

const Navigation = () => {
  return (
    <nav className="flex w-full flex-row">
      {publicRoutes.general.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className="px-3 py-2 text-base font-medium text-blue-900 hover:bg-cyan-300"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
export default Navigation;
