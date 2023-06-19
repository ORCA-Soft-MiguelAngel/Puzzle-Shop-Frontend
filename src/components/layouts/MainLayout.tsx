import React, { FunctionComponent } from "react";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => (
  <div>
    <Header />
    <div>{children}</div>
  </div>
);

export default MainLayout; 
