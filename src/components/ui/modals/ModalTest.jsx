import useBodyScrollLock from "./useBodyScrollLock";
import Test from "../test/Test"
import "./modals.css";

function ModalTest({ isOpen, onClose }) {
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
            <Test/>
        </div>

      </div>
    </div>
  )
}

export default ModalTest