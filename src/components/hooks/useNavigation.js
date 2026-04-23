import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToAnchor = (anchor) => {
    if (location.pathname !== "/") {
      navigate(`/#${anchor}`);
    } else {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${anchor}`);
      }
    }
  };

  return goToAnchor;
}

export function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return null;
}