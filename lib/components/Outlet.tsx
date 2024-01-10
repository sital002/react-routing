import React from "react";
import { RouterContext } from "./BrowserRouter";

interface OutletProps {
  children: React.ReactElement;
}
const Outlet: React.FC<OutletProps> = ({ children }) => {
  if (children) throw new Error("Outlet component can't have children");
  const context = React.useContext(RouterContext);
  if (context === null)
    throw new Error("Outlet must be used within BrowserRouter");

  return <>{context.currentOutletElement}</>;
};

export default Outlet;
