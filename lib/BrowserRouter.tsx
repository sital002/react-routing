import React from "react";
import Routes from "./Routes";


interface RouteProps {
  path: string,
  element: React.ReactElement,
  index?: boolean
}
interface RouterContextProps {
  selectedComponent: React.ReactNode;
  setSelectedComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}
export const RouterContext = React.createContext<RouterContextProps | null>(
  null
);

function findElement(path: string, allRoutes: { path: string, element: React.ReactElement, index?: boolean }[]) {
  const initialElement = allRoutes.find((item) => item.path === path)?.element;
  return initialElement;
}
export default function BrowserRouter({ children }: { children: React.ReactElement | React.ReactElement[] }) {
  const [selectedComponent, setSelectedComponent] = React.useState<React.ReactNode | null>(null);
  const allRoutes: RouteProps[] = []

  React.useEffect(() => {
    const handlePopstate = () => {
      const path = window.location.pathname.match(/\/\w+/g)?.[0];
      const initialElement = findElement(path || window.location.pathname, allRoutes);
      if (!initialElement) return console.warn("404 cannot find the route", window.location.pathname)
      setSelectedComponent(initialElement);
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  React.useEffect(() => {
    const filteredChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Routes) {
        return child;
      }
      return null;
    });
    if (filteredChildren.length <= 0) console.warn("No Routes element is provided")
    if (filteredChildren.length > 1) throw new Error("Cannot use more than one Routes component inside BrowserRouter")
    const routes = filteredChildren[0] as React.ReactElement
    routes.props.children.forEach((item: React.ReactElement) => {
      allRoutes.push({
        path: item.props.path,
        element: item.props.element
      })
    })
    const path = window.location.pathname.match(/\/\w+/g)?.[0];
    const initialElement = findElement(path || window.location.pathname, allRoutes);
    if (!initialElement) return console.warn("404 cannot find the route", window.location.pathname)
    setSelectedComponent(initialElement)
  }, [])


  return (
    <RouterContext.Provider value={{ selectedComponent, setSelectedComponent }}>
      {children}
    </RouterContext.Provider>
  );
}
