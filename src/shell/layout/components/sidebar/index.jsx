import React from "react";

import { Link, useLocation } from "react-router-dom";
import { classNames } from "common/utils";

const Sidebar = ({ routes, children }) => {
  const { pathname } = useLocation();

  const isActive = (route) => {
    const base = (route?.link || route?.path)?.replace("/*", "");
    return pathname.startsWith(base);
  };

  const topLevelRoutes = routes;

  return (
    <div className="flex h-screen flex-col bg-slate-50 lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:h-screen lg:w-[220px] lg:flex-shrink-0 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
        <div className="flex h-16 items-center border-b border-slate-100 px-5">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="h-8 w-auto"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {topLevelRoutes?.map((route) => {
            const active = isActive(route);
            const Icon = route?.icon;

            return (
              <div key={route?.path}>
                <Link
                  to={route?.link || route?.path?.replace("/*", "")}
                  className={classNames(
                    active
                      ? "bg-teal-50 font-semibold text-teal-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150",
                  )}
                >
                  {Icon && (
                    <Icon
                      className={classNames(
                        active
                          ? "text-teal-700"
                          : "text-slate-400 group-hover:text-slate-600",
                        "h-5 w-5 flex-shrink-0 transition-colors duration-150",
                      )}
                    />
                  )}
                  <span>{route?.name}</span>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-600" />
                  )}
                </Link>

                {route?.subroutes && route?.routes?.some((r) => r?.sidebar) && active && (
                  <div className="ml-8 mt-1 flex flex-col gap-0.5">
                    {route?.routes?.map((subRoute) =>
                      subRoute?.sidebar ? (
                        <Link
                          key={subRoute?.path}
                          to={subRoute?.link || subRoute?.path}
                          className={classNames(
                            pathname === (subRoute?.link || subRoute?.path)
                              ? "font-medium text-teal-700"
                              : "text-slate-500 hover:text-slate-800",
                            "rounded-md px-3 py-1.5 text-xs transition-colors duration-150",
                          )}
                        >
                          {subRoute?.name}
                        </Link>
                      ) : null,
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <p className="text-xs text-slate-400">Real Estate</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 py-5 pb-24 lg:px-6 lg:py-6 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-200 bg-white lg:hidden">
        {topLevelRoutes?.map((route) => {
          const active = isActive(route);
          const Icon = route?.icon;

          return (
            <Link
              key={route?.path}
              to={route?.link || route?.path?.replace("/*", "")}
              className={classNames(
                active ? "text-teal-700" : "text-slate-400",
                "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors duration-150",
              )}
            >
              {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
              <span>{route?.name}</span>
              {active && (
                <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-12 rounded-full bg-teal-600" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
