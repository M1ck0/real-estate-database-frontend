import React from "react";

import { Link } from "react-router-dom";

const Sidebar = ({ routes, children }) => {
  return (
    <main className="flex flex-start bg-zinc-100 p-2">
      <aside className="h-screen w-[200px] bg-zinc-100 p-4 sticky top-2">
        {routes?.map((route) => {
          return (
            <Link to={route?.link || route?.path}>
              <p className="text-lg text-black">{route?.name}</p>
            </Link>
          );
        })}
      </aside>
      <div className="bg-white px-5 py-4 rounded-xl border w-[calc(100%-200px)] min-h-[calc(100vh-1em)]">
        {children}
      </div>
    </main>
  );
};

export default Sidebar;
