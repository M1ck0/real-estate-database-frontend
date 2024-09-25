import React from "react";

import { Link } from "react-router-dom";

const Sidebar = ({ routes, children }) => {
  return (
    <main className="flex-start flex h-screen flex-col-reverse bg-zinc-100 px-2 py-2 lg:flex-row lg:px-0">
      <aside className="sticky top-2 flex h-[100px] w-full justify-between bg-zinc-100 px-3 py-4 lg:h-auto lg:w-[200px] lg:flex-col lg:justify-start lg:gap-2">
        {routes?.map((route) => {
          return (
            <Link
              to={route?.link || route?.path}
              className="flex flex-col items-center gap-3 rounded-lg px-3 py-3 duration-300 hover:bg-white hover:shadow lg:flex-row"
            >
              <route.icon className="w-6 flex-shrink-0 text-black/70" />
              <p className="text-base font-semibold text-black">{route?.name}</p>
            </Link>
          );
        })}
        {/* <img src="/assets/icons/logo.svg" className="mb-3 mt-auto w-[80%] pb-3" /> */}
      </aside>
      <div className="h-[calc(100vh-100px)] overflow-y-auto rounded-xl border bg-white px-5 py-4 lg:h-[calc(100vh-1rem)] lg:w-[calc(100%-210px)]">
        {children}
      </div>
    </main>
  );
};

export default Sidebar;
