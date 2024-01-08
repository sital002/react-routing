import React from "react";
import Routes from "./Routes";

interface RouteProps {
  path: string;
  element: React.ReactElement;
  index?: boolean;
}
interface RouterContextProps {
  selectedComponent: React.ReactNode;
  setSelectedComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

interface ROUTESProps {
  STATIC: Record<string, RouteProps>;
  DYNAMIC: Record<string, RouteProps>;
}
export const RouterContext = React.createContext<RouterContextProps | null>(
  null
);

const ROUTES: ROUTESProps = {
  STATIC: {},
  DYNAMIC: {},
};
function findElement(path: string, allRoutes: ROUTESProps) {
  if (allRoutes.STATIC[path]) return allRoutes.STATIC[path].element;
  for (let key in allRoutes.DYNAMIC) {
    if (path.includes(key)) {
      return allRoutes.DYNAMIC[key].element;
    }
  }
}
export default function BrowserRouter({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [selectedComponent, setSelectedComponent] =
    React.useState<React.ReactNode | null>(null);

  React.useEffect(() => {
    const handlePopstate = () => {
      let path = window.location.pathname;
      if (path.length > 1) {
        path = path.endsWith("/") ? path.slice(0, path.length - 1) : path;
      }
      const initialElement = findElement(path, ROUTES);
      if (!initialElement)
        return console.warn(
          "404 cannot find the route",
          window.location.pathname
        );
      setSelectedComponent(initialElement);
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  // Initial Render
  React.useEffect(() => {
    const filteredChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Routes) {
        return child;
      }
      return null;
    });
    if (filteredChildren.length <= 0)
      console.warn("No Routes element is provided");
    if (filteredChildren.length > 1)
      throw new Error(
        "Cannot use more than one Routes component inside BrowserRouter"
      );
    const routes = filteredChildren[0] as React.ReactElement;
    routes.props.children.forEach((item: React.ReactElement) => {
      if (item.props.path.includes(":")) {
        const newPath = item.props.path.split(":")?.[0];
        ROUTES.DYNAMIC[newPath] = item.props;
      } else {
        ROUTES.STATIC[item.props.path] = item.props;
      }
    });
    let path = window.location.pathname;
    if (path.length > 1) {
      path = path.endsWith("/") ? path.slice(0, path.length - 1) : path;
    }
    const initialElement = findElement(path, ROUTES);
    if (!initialElement)
      return console.warn(
        "404 cannot find the route",
        window.location.pathname
      );
    setSelectedComponent(initialElement);
  }, []);

  return (
    <RouterContext.Provider value={{ selectedComponent, setSelectedComponent }}>
      {children}
    </RouterContext.Provider>
  );
}
