import React from "react";

interface RouteProps {
  children: React.ReactElement;
  path: string;
  index?: boolean;
  element: React.ReactElement;
}
const Route: React.FC<RouteProps> = (props) => {
  return <>{props.children}</>;
};

export default Route;
