import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationCRO from "./locales/cro/translationCRO.json";
import translationEN from "./locales/en/translationEN.json";

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const resources = {
  en: {
    translation: translationEN,
  },
  cro: {
    translation: translationCRO,
  },
};

i18n

  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
