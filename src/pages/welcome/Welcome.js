import React from "react";
import "./welcome.css";
import { useTranslation } from "react-i18next";
function Welcome() {
  const { t, i18n } = useTranslation();
  return (
    <div className="welcome-wrapper">
      <h1 className="welcome-title">{t("welcome")}</h1>
      <p className="p-welcome">{t("welcome-p")}</p>
      <h4 className="welcome-dev-by">
        Developed by:<b>Virtual biopsiess</b>
      </h4>
      <img
        className="welcome-background"
        src="https://images.unsplash.com/photo-1468779036391-52341f60b55d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1068&q=80"
      />
    </div>
  );
}

export default Welcome;
