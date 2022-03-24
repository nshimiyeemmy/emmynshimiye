import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="w-full mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2 py-20">
      <h2 className="text-4xl xl:text-7xl text-gray-800 font-bold text-center tracking-widest">
        404
      </h2>
      <div className="text-center">Page not found</div>
      <div className="py-10 text-center">
        <Link
          to={"/"}
          className="py-4 px-8 font-medium text-lg text-white bg-blue-600 rounded-lg"
        >
          Back To Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound
