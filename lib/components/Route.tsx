import React from "react";
import { RouterContext } from "./BrowserRouter";
import matchPath from "../utils/matchPath";

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
    const newPath = context.currentPath.substring(props?.path.length + 1);
    let element: React.ReactNode | null = null;
    let indexElement: React.ReactNode | null = null;
    React.Children.map(props.children, (child) => {
      if (!React.isValidElement<RouteProps>(child))
        throw new Error(
          "Route component can only have Route component as it's children"
        );
      const route = child.props as RouteProps;
      if (newPath === route.path) {
        element = route.element;
      }
      if (route.index) {
        indexElement = route.element;
      }
    });
    const isIndexElement = matchPath(props?.path, context.currentPath);
    if (element) context.setCurrentOutletElement(element);
    else if (isIndexElement) context.setCurrentOutletElement(indexElement);
    else console.warn("404 route not found ", context.currentPath);
  }, []);
  return null;
};
export default Route;
