import React from "react";
import Link from "next/link";
import { publicRoutes } from "infrastructure/router/routes";

const Navigation = () => {
  return (
    <nav className="flex flex-row w-full">
      {publicRoutes.general.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className="hover:bg-cyan-300 py-2 px-3 text-base font-medium text-blue-900"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
export default Navigation;
