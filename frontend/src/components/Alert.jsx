
const Alert = ({ type = "success", message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>

      {onClose && (
        <button
          className="alert-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;