import { Link } from "react-router-dom";
import { useNavigation } from "../../../hooks/useNavigation";
import "./footer.css";

function Footer() {
  const goToAnchor = useNavigation();

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    goToAnchor(anchor);
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__column">
          <h3 className="subtitle white">О проекте</h3>
          <p className="text-sm white">
            Финансовый девичник и мальчишник — проект для развития финансовой
            грамотности молодых пар
          </p>
        </div>

        <div className="footer__column">
          <h3 className="subtitle white">Материалы</h3>
          <a
            href="#material"
            className="text-sm link white"
            onClick={(e) => handleAnchorClick(e, "material")}
          >
            Обучающие материалы
          </a>
          <br />
          <a
            href="#events"
            className="text-sm link white"
            onClick={(e) => handleAnchorClick(e, "events")}
          >
            Мероприятия
          </a>
          <br />
          <Link to="/finance/admin" className="text-sm link white">
            Панель разработчика
          </Link>
        </div>

        <div className="footer__column">
          <h3 className="subtitle white">Полезные ссылки</h3>
          <a
            href="https://fincult.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm link white"
          >
            Финансовая безопасность
          </a>
          <br />
          <a
            href="https://fincult.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm link white"
          >
            Финансовая грамотность
          </a>
          <br />
          <a
            href="https://www.cbr.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm link white"
          >
            Центральный банк России
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;