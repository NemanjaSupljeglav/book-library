import Book from "../book/Book";
import Author from "../author/Author";
import Category from "../category/Category";
import Welcome from "../welcome/Welcome";
import React, { useRef, useEffect } from "react";

import { FaBook } from "react-icons/fa";
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
              <FaBook size="2em" />
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
                    to="/book"
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
                  <NavLink
                    activeClassName="is-active"
                    exact={true}
                    className="nav-link"
                    to="/"
                  />
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
          />
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
      <Route
        path="/category"
        component={() => {
          return <Category />;
        }}
      />
      <Route
        path="/author"
        component={() => {
          return <Author />;
        }}
      />
      <Route
        path="/book"
        component={() => {
          return <Book />;
        }}
      />
      <Route
        path="/"
        component={() => {
          return <Welcome />;
        }}
      />
    </Switch>
  );
}

export default Dashboard;
