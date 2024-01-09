import React from "react";
import { RouterContext } from "./BrowserRouter";
// import matchPath from "../utils/matchPath";

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
  if (props?.path === "/world") return props.element;
  return null;
};
export default Route;
