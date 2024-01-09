import React, { ReactElement } from "react";
import Route, { RouteProps } from "./Route";
import { RouterContext } from "./BrowserRouter";
interface RoutesProps {
  children: React.ReactElement;
}
interface Routes {
  STATIC: { [path: string]: React.ReactElement };
  DYNAMIC: { [path: string]: React.ReactElement };
}
const Routes: React.FC<RoutesProps> = ({ children }) => {
  const routes: Routes = {
    STATIC: {},
    DYNAMIC: {},
  };

  const context = React.useContext(RouterContext);
  if (context === null)
    throw new Error("Routes must be used within BrowserRouter");

  const [currentElement, setCurrentElement] =
    React.useState<React.ReactNode | null>(null);
  React.Children.map(children, (child: ReactElement) => {
    if (React.isValidElement<RouteProps>(child) && child.type !== Route)
      throw new Error("Routes can only have Route as children");
    const routeElement = child.props as RouteProps;
    if (routeElement.path.includes(":")) {
      routes.DYNAMIC[routeElement.path] = routeElement.element;
    } else {
      routes.STATIC[routeElement.path] = routeElement.element;
    }
  });
  const path =
    context.currentPath.length > 1 && context.currentPath.endsWith("/")
      ? context.currentPath.slice(0, context.currentPath.length - 1)
      : context.currentPath;
  React.useEffect(() => {
    if (routes.STATIC[path]) {
      const routeChildren = routes.STATIC[path].props.children;

      if (typeof routeChildren === "object") {
        setCurrentElement(routes.STATIC[path]);
      } else {
        setCurrentElement(routes.STATIC[path]);
      }
    } else if (routes.DYNAMIC[path]) {
      const routeChildren = routes.DYNAMIC[path].props.children;
      if (!routeChildren) {
        setCurrentElement(routes.DYNAMIC[path]);
      } else {
        setCurrentElement(routes.DYNAMIC[path]);
      }
    } else {
      console.warn(`404 route not found ${path}`);
      setCurrentElement(null);
    }
  }, [context.currentPath]);
  return (
    <>
      {children}
      {currentElement}
    </>
  );
};

export default Routes;
