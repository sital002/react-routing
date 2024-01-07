import React from "react";

interface LinkProps extends React.ReactHTMLElement<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}
const Link: React.FC<LinkProps> = ({ to, children }) => {
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        if (window.location.pathname === to) return;
        window.history.pushState({ name: to }, to, to);
        window.dispatchEvent(new Event("popstate"));
      }}
    >
      {children}
    </a>
  );
};

export default Link;
