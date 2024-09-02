import React from "react";

import "./sidebar.scss";

const Sidebar = ({ children }) => {
  return (
    <main className="sidebar-layout">
      <aside></aside>
      <div className="content">{children}</div>
    </main>
  );
};

export default Sidebar;
