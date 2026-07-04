export default function ProgressBar({ percent, className = '' }) {
  return (
    <div className="progress-bar-container">
      <div
        className={`progress-bar-fill ${className}`}
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}
