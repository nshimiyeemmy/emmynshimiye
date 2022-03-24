import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const links = [
    { text: "Buy electricity", to: "/buy" },
    { text: "Load token", to: "/load" },
    { text: "Check balance", to: "/balance" },
  ];

  return (
    <div className="bg-blue-800 text-white py-4 px-6 md:px-14 xl:px-20 flex justify-between">
      <Link to={"/"}>
        <h2 className="text-2xl lg:text-4xl">E-TOKEN Billing</h2>
      </Link>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {links.map((link, i) => (
            <Link
              key={link.text}
              to={link.to}
              className={`px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.to
              } ${i > 0 && "ml-4"}`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
