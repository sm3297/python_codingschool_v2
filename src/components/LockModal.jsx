export default function LockModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
        <h2>아직 이 스테이지는 잠겨 있어요!</h2>
        <p>
          이전 스테이지의 미션을 완료하고<br />
          필요한 코인을 모으면 입장할 수 있어요.
        </p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
