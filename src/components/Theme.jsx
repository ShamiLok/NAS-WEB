import React, { useState, useEffect } from "react";

const Theme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "black") {
      setTheme("black");
    }
  }, []);

  useEffect(() => {
    const setVar = (varName, varValue) => {
      document.documentElement.style.setProperty(varName, varValue);
    };

    if (theme === "black") {
      setVar("--bg-block", "#222222");
      setVar("--bg-border", "#424242");
      setVar("--bg-hover", "#333333");
      setVar("--bg-body", "#141414");
      setVar("--bg-footer", "#333333");
      setVar("--color-text", "#e1e3e6");
    } else {
      setVar("--bg-block", "#fff");
      setVar("--bg-border", "#dce1e6");
      setVar("--bg-hover", "#f5f6f8");
      setVar("--bg-body", "#edeef0");
      setVar("--bg-footer", "#f0f2f5");
      setVar("--color-text", "#333333");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("black");
      localStorage.setItem("theme", "black");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="menu__theme">
      <span id="menu__theme_text">{theme === "black" ? "Enable light theme" : "Enable dark theme"}</span>
      <input type="checkbox" id="menu__theme_switch" onChange={toggleTheme} checked={theme === "black"} />
      <label htmlFor="menu__theme_switch"></label>
    </div>
  );
};

export default Theme;
