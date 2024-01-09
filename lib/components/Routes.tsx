import React, { ReactElement } from "react";
import Route, { RouteProps } from "./Route";
import { RouterContext } from "./BrowserRouter";
import matchPath from "../utils/matchPath";
interface RoutesProps {
  children: React.ReactElement;
}

interface Routes {
  STATIC: { [path: string]: React.ReactElement };
  DYNAMIC: { [path: string]: React.ReactElement };
}
const routes: Routes = {
  STATIC: {},
  DYNAMIC: {},
};
function findMatchingRoute(url: string): React.ReactElement | null {
  for (const staticPath in routes.STATIC) {
    if (matchPath(url, staticPath, routes.STATIC[staticPath])) {
      return routes.STATIC[staticPath];
    }
  }
  for (const dynamicPath in routes.DYNAMIC) {
    if (matchPath(url, dynamicPath, routes.DYNAMIC[dynamicPath])) {
      return routes.DYNAMIC[dynamicPath];
    }
  }
  return null;
}
const Routes: React.FC<RoutesProps> = ({ children }) => {
  const context = React.useContext(RouterContext);
  if (context === null)
    throw new Error("Routes must be used within BrowserRouter");

  const [currentElement, setCurrentElement] =
    React.useState<React.ReactElement | null>(null);

  React.useEffect(() => {
    React.Children.map(children, (child: ReactElement) => {
      if (React.isValidElement<RouteProps>(child) && child.type !== Route)
        throw new Error("Routes can only have Route as children");
      const routeElement = child.props as RouteProps;
      if (routeElement.path.includes(":")) {
        routes.DYNAMIC[routeElement.path] = child;
      } else {
        routes.STATIC[routeElement.path] = child;
      }
    });
  }, []);

  React.useEffect(() => {
    setCurrentElement(findMatchingRoute(context.currentPath));
  }, [context.currentPath]);
  if (currentElement?.props?.children?.length >= 1) {
    return (
      <>
        {currentElement?.props.element}
        {currentElement?.props.children}
      </>
    );
  }
  return currentElement?.props.element;
};

export default Routes;
