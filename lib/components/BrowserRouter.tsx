import React from "react";
interface RouterContextProps {
  selectedComponent: React.ReactNode;
  currentOutletElement: React.ReactNode;
  currentPath: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  setCurrentOutletElement: React.Dispatch<
    React.SetStateAction<React.ReactNode>
  >;
  setSelectedComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export const RouterContext = React.createContext<RouterContextProps | null>(
  null
);

export default function BrowserRouter({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [selectedComponent, setSelectedComponent] =
    React.useState<React.ReactNode | null>(null);
  const [currentOutletElement, setCurrentOutletElement] =
    React.useState<React.ReactNode | null>(null);
  const [currentPath, setCurrentPath] = React.useState(
    window.location.pathname
  );
  React.useEffect(() => {
    const handlePopstate = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <RouterContext.Provider
      value={{
        setCurrentPath,
        currentPath,
        selectedComponent,
        setSelectedComponent,
        currentOutletElement,
        setCurrentOutletElement,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}
