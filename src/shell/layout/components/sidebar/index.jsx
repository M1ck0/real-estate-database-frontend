import React from "react";

import { Link } from "react-router-dom";

const Sidebar = ({ routes, children }) => {
  return (
    <main className="flex-start flex h-screen bg-zinc-100 py-2">
      <aside className="sticky top-2 flex w-[200px] flex-col gap-2 bg-zinc-100 px-3 py-4">
        {routes?.map((route) => {
          return (
            <Link
              to={route?.link || route?.path}
              className="flex items-center gap-3 rounded-lg px-3 py-3 duration-300 hover:bg-white hover:shadow"
            >
              <route.icon className="w-6 text-black/70" />
              <p className="text-base font-semibold text-black">{route?.name}</p>
            </Link>
          );
        })}
      </aside>
      <div className="h-[calc(100vh-1rem)] w-[calc(100%-210px)] overflow-y-auto rounded-xl border bg-white px-5 py-4">
        {children}
      </div>
    </main>
  );
};

export default Sidebar;
