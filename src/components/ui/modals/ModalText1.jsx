import useBodyScrollLock from "./useBodyScrollLock";
import "./modals.css";

function ModalText1({ isOpen, onClose }) {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-info">
          <h3 className="subtitle">Виды семейного бюджета</h3>
          
          <div className="modal-details">
            <p className="text-base text">Тут будет текст 1</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ModalText1