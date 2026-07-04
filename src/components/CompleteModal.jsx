export default function CompleteModal({ rewardCoins, rewardExp, penaltyCoins = 0, alreadyCompleted, onClose, onNext }) {
  if (alreadyCompleted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📌</div>
          <h2>이미 완료한 미션입니다</h2>
          <p>보상은 한 번만 받을 수 있어요.</p>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
        <h2>미션 클리어!</h2>
        <p>멋져요! 오늘의 파이썬 미션을 성공적으로 완료했어요.</p>
        <div style={{
          background: '#FAFAFF',
          borderRadius: '12px',
          padding: '20px',
          margin: '20px 0'
        }}>
          <p style={{ fontWeight: 700, color: '#263238', marginBottom: '12px' }}>획득 보상</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFD166' }}>
            +{rewardCoins} 플레이 코인
          </p>
          {penaltyCoins > 0 && (
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FF6B6B', marginTop: '4px' }}>
              -{penaltyCoins} 차감 코인 (오답 패널티)
            </p>
          )}
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4ECDC4', marginTop: '4px' }}>
            +{rewardExp} 코드 에너지
          </p>
        </div>
        <p>다음 미션에 도전해볼까요?</p>
        <div className="modal-actions">
          {onNext && (
            <button className="btn btn-primary" onClick={onNext}>
              다음 미션
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
