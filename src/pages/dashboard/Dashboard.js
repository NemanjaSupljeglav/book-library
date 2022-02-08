import Book from "../book/Book";
import Author from "../author/Author";
import Category from "../category/Category";
import React, { useRef, useEffect } from "react";
import {
  BrowserRouter,
  NavLink,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const navbarLinks = useRef(null);
  const handleNavbarButton = (e) => {
    navbarLinks.current.classList.toggle("menu-collapse");
  };

  const hideNavMenu = () => {
    if (!navbarLinks.current.classList.contains("menu-collapse")) {
      navbarLinks.current.classList.add("menu-collapse");
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar">
          <div className="navbar-container">
            <a href="/" className="brand-title">
              Books
            </a>
            <button
              onClick={(e) => {
                handleNavbarButton(e);
              }}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div ref={navbarLinks} className="navbar-links menu-collapse">
              <ul className="links-list">
                <li className="nav-item">
                  <NavLink
                    activeClassName="is-active"
                    exact={true}
                    className="nav-link"
                    to="/"
                  >
                    Books
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="is-active"
                    exact={true}
                    className="nav-link"
                    to="/author"
                  >
                    Authors
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="is-active"
                    exact={true}
                    className="nav-link"
                    to="/category"
                  >
                    Categorys
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <AllRoutes
            hideMenu={() => {
              hideNavMenu();
            }}
          ></AllRoutes>
        </div>
      </BrowserRouter>
    </div>
  );
}

function AllRoutes({ hideMenu }) {
  let location = useLocation();
  useEffect(() => {
    hideMenu();
  }, [location]);

  return (
    <Switch>
      <Route path="/category" component={Categorys}></Route>
      <Route path="/author" component={Authors}></Route>
      <Route path="/" component={Books}></Route>
    </Switch>
  );
}

function Books() {
  return (
    <>
      <Book />
    </>
  );
}

function Authors() {
  return (
    <>
      <Author />
    </>
  );
}

function Categorys() {
  return (
    <>
      <Category />
    </>
  );
}
export default Dashboard;
