import { useState } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import "./header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const goToAnchor = useNavigation();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleClick = (e, anchor) => {
    e.preventDefault();
    closeMenu();
    goToAnchor(anchor);
  };

  return (
    <header className={`header ${isOpen ? "header--open" : ""}`}>
      <nav className={`header__nav ${isOpen ? "open" : ""}`}>
        <ul className="header__nav-list">
          <li>
            <a
              href="#about"
              className="text-base header-link primary"
              onClick={(e) => handleClick(e, "about")}
            >
              О проекте
            </a>
          </li>
          <li>
            <a
              href="#material"
              className="text-base header-link primary"
              onClick={(e) => handleClick(e, "material")}
            >
              Обучающие материалы
            </a>
          </li>
          <li>
            <a
              href="#events"
              className="text-base header-link primary"
              onClick={(e) => handleClick(e, "events")}
            >
              Мероприятия
            </a>
          </li>
        </ul>
      </nav>

      <button
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="menu toggle"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Header;