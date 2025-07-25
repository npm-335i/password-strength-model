import "./Modal.css";

export default function Modal({ heading, message, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") {
      onClose();
    }
  };

  return (
    <div
      id="modalOverlay"
      onClick={handleOverlayClick}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="modal-content">
          <h2 className="modal-heading">{heading}</h2>
          <p className="modal-message">{message}</p>
        </div>
      </div>
    </div>
  );
}
