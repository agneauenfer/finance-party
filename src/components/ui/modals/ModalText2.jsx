import useBodyScrollLock from "./useBodyScrollLock";
import Steps from "../steps/Steps";
import "./modals.css";

function ModalText2({ isOpen, onClose }) {
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
          <h3 className="subtitle" style={{textAlign: "center", marginBottom: "12px"}}>Как обсудить семейный бюджет?</h3>

          <div className="modal-details">
            <p className="text-base text">
              Финансовое свидание — это не просто разговор о деньгах, а
              возможность укрепить доверие, синхронизировать цели и избежать
              конфликтов. Вот пошаговый чек-лист, который поможет организовать
              такое обсуждение:
            </p>
          <Steps/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalText2;
