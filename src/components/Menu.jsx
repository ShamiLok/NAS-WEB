import React, { useState } from "react";
import Theme from "./Theme";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="menu">
      <div
        id="burger__menu"
        className={menuOpen ? "open" : "close"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
      </div>

      <nav id="menu__nav" className={menuOpen ? "open" : "close"}>
        <ul>
          <li>Settings</li>
          <li>Exit</li>
        </ul>
        <div className="menu__empty"></div>
        <Theme />
        <div className="menu__footer">project in development</div>
      </nav>
    </div>
  );
};

export default Menu;
