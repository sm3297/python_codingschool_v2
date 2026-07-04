import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { getStageProgress, getStageTotalCoins, isStageUnlocked, isStageClear, getUnlockCoins } from '../utils/progress';

export default function StageCard({ stage, completedMissions, coins, onLocked }) {
  const navigate = useNavigate();
  const unlocked = isStageUnlocked(stage.id, completedMissions, coins);
  const cleared = isStageClear(stage.id, completedMissions);
  const progress = getStageProgress(stage.id, completedMissions);
  const totalCoins = getStageTotalCoins(stage.id);
  const requiredCoins = getUnlockCoins(stage.id);

  const handleClick = () => {
    if (!unlocked) {
      onLocked && onLocked();
      return;
    }
    navigate(`/student/stage/${stage.id}`);
  };

  return (
    <div
      className={`stage-card ${!unlocked ? 'locked' : ''} ${cleared ? 'completed' : ''}`}
      onClick={handleClick}
    >
      {!unlocked && <div className="lock-overlay">🔒</div>}
      {cleared && <div className="complete-badge">✓</div>}

      <div className="stage-card-header">
        <span className="stage-icon">{stage.icon}</span>
        <span className="stage-number">{stage.id}단계</span>
        <h3>{stage.title}</h3>
      </div>

      <div className="stage-card-body">
        <p className="stage-topic">{stage.topic}</p>

        {unlocked ? (
          <>
            <div className="stage-progress">
              <div className="stage-progress-text">
                <span>진행률</span>
                <span>{progress.completed}/{progress.total}</span>
              </div>
              <ProgressBar percent={progress.percent} />
            </div>
            <p className="stage-reward">🪙 총 {totalCoins} 코인</p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              {cleared ? '다시 보기' : '입장하기'}
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: '0.85rem', color: '#90A4AE', marginBottom: '16px', lineHeight: '1.6' }}>
              {stage.id - 1}단계를 완료하고 {requiredCoins}코인을 모으면 열려요.
            </p>
            <button className="btn btn-sm" style={{
              width: '100%',
              background: '#EEF1F7',
              color: '#90A4AE',
              cursor: 'not-allowed'
            }} disabled>
              잠김
            </button>
          </>
        )}
      </div>
    </div>
  );
}
