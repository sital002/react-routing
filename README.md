# A simple and light weight routing library for react

```bash
npm i @sital002/react-routing
```

## How to implement it

App.jsx

```jsx
import { BrowserRouter, Route, Routes } from "@sital002/react-routing";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
```

Navbar.jsx

```jsx
import { Link } from "@sital002/react-routing";

function Navbar() {
  return (
    <div>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
```

useRouter()

```jsx
import { useRouter } from "@sital002/react-routing";
import React from "react";

export default function Footer() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          router.push("/about");
        }}
      >
        About
      </button>
      <button
        onClick={() => {
          router.push("/contact");
        }}
      >
        Contact
      </button>

      <button
        onClick={() => {
          router.back();
        }}
      >
        Go back
      </button>
      <button
        onClick={() => {
          router.forward();
        }}
      >
        Go forward
      </button>
    </div>
  );
}
```
