import useBodyScrollLock from "./useBodyScrollLock";
import "./modals.css";
import Slider from "../slider/Slider";

function ModalText1({ isOpen, onClose }) {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-info">
          <h3 className="subtitle" style={{textAlign: "center", marginBottom: "12px"}}>Виды семейного бюджета</h3>
          <p className="text-base">
            Ее деньги — это ее деньги, а его деньги — это их деньги? Когда оба
            на это согласны, схема рабочая. Но что если конкретной паре это
            неудобно? Если не знаете, какой вариант семейного бюджета вам
            подходит больше, читайте этот текст. Впрочем, если знаете, все равно
            читайте — вдруг найдется более предпочтительный вариант?
          </p>
          <p className="text-base">
            Условно можно выделить три модели: раздельный бюджет, общий и смешанный. Разберем все плюсы и минусы.
          </p>

          <div className="modal-details">
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalText1;
