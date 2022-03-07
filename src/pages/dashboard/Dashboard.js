import Book from "../book/Book";
import Author from "../author/Author";
import Category from "../category/Category";
import Welcome from "../welcome/Welcome";
import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const navbarLinks = useRef(null);
  const handleNavbarButton = (e) => {
    navbarLinks.current.classList.toggle("menu-collapse");
  };

  const hideNavMenu = () => {
    if (!navbarLinks.current.classList.contains("menu-collapse")) {
      navbarLinks.current.classList.add("menu-collapse");
    }
  };
  function handleClick(lang) {
    console.log("proslo");
    localStorage.setItem("i18nextLng", lang);
    i18n.changeLanguage(lang);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar">
          <div className="navbar-container">
            <a href="/" className="brand-title" datacy="home-book-btn">
              <FaBook size="2em" />
            </a>
            <select
              defaultValue={localStorage.getItem("i18nextLng") || "en"}
              className="select_lang"
            >
              <option
                value="en"
                onClick={() => handleClick("en")}
                className="brand-title-text"
              >
                EN
              </option>
              <option
                value="cro"
                onClick={() => handleClick("cro")}
                className="brand-title-text"
              >
                HR
              </option>
            </select>
            <button
              onClick={(e) => {
                handleNavbarButton(e);
              }}
              className="navbar-toggler"
              datacy="navbar-toggler-btn"
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
                    datacy="book-btn"
                  >
                    {t("books")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="is-active"
                    exact={true}
                    className="nav-link"
                    to="/author"
                    datacy="author-btn"
                  >
                    {t("authors")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="is-active"
                    exact={true}
                    className="nav-link"
                    to="/category"
                    datacy="category-btn"
                  >
                    {t("categorys")}
                  </NavLink>
                  <NavLink
                    activeClassName="is-active"
                    exact={true}
                    className="nav-linkk"
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
