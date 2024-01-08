import React from "react";
import Route from "./Route";
import { RouterContext } from "./BrowserRouter";
interface RoutesProps {
  children: React.ReactElement | ReturnType<typeof Route>;
}
const Routes: React.FC<RoutesProps> = ({ children }) => {
  const context = React.useContext(RouterContext);
  if (!context)
    throw new Error(
      "RouterContext must be used inside BrowserRouter Component"
    );
  React.useEffect(() => {
    React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type !== Route)
        throw new Error("Routes can only have Route as children");
    });
  }, []);
  return <>{context.selectedComponent}</>;
};

export default Routes;
