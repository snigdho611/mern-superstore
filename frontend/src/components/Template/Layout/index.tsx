import Sidebar from "components/Organisms/Sidebar";
import React, { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
