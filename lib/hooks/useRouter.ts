import React from "react";
import { RouterContext } from "../BrowserRouter";

function useRouter() {
  const context = React.useContext(RouterContext);
  if (context === null)
    throw new Error("useRouter must be used inside Browser");

  const router = {
    push: (path: string) => {
      if (typeof path !== "string") throw new Error("Path must be string");
      if (window.location.pathname === path) return;
      window.history.pushState(path, path, path);
      window.dispatchEvent(new Event("popstate"));
    },
    forward: () => {
      window.history.forward();
    },
    back: () => {
      window.history.back();
    },
  };

  return router;
}

export default useRouter;
