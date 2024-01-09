import React from "react";
import { RouterContext } from "./BrowserRouter";

export interface RouteProps {
  children: React.ReactElement;
  path: string;
  index?: boolean;
  element: React.ReactElement;
}
const Route: React.FC<RouteProps> = (props) => {
  const context = React.useContext(RouterContext);
  if (context === null)
    throw new Error("Route component cannot be used outside BrowserRouter");
  React.useEffect(() => {
    React.Children.map(props.children, (child) => {
      const routes = child.props as RouteProps;
      // console.log(routes.path, context.currentPath);
      if (context.currentPath.includes(routes.path)) {
        // console.log(context.currentPath.includes(routes.path), routes.element);
        return context.setCurrentOutletElement(routes.element);
      } else if (routes.index) {
        return context.setCurrentOutletElement(routes.element);
      }
    });
  }, [context.currentPath]);
  return null;
};
export default Route;
