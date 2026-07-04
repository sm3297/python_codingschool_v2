import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../api/userApi';
import { getUserId } from '../utils/auth';
import { stages } from '../data/stages';
import { isStageUnlocked, getStageProgress, calculateLevel } from '../utils/progress';
import ProgressBar from '../components/ProgressBar';

export default function StageDetailPage() {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const stage = stages.find(s => s.id === parseInt(stageId));

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        navigate('/login');
        return;
      }
      const userData = await getUserById(userId);
      if (!userData) {
        navigate('/login');
        return;
      }
      userData.completedMissions = userData.completedMissions || [];
      userData.level = calculateLevel(userData.exp || 0);
      setUser(userData);
    } catch (err) {
      navigate('/student');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p className="loading-text">로딩 중...</p>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="page-container">
        <div className="error-message">존재하지 않는 스테이지예요.</div>
        <button className="btn btn-primary" onClick={() => navigate('/student')}>
          돌아가기
        </button>
      </div>
    );
  }

  if (!user) return null;

  const unlocked = isStageUnlocked(stage.id, user.completedMissions, user.coins || 0);

  if (!unlocked) {
    navigate('/student');
    return null;
  }

  const progress = getStageProgress(stage.id, user.completedMissions);

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="stage-detail-header">
        <div className="stage-icon-large">{stage.icon}</div>
        <h1>{stage.id}단계 · {stage.title}</h1>
        <p className="stage-topic-label">📚 학습 주제: {stage.topic}</p>
        <p className="stage-desc">{stage.description}</p>
        <div style={{ marginTop: '20px', maxWidth: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
            <span>진행률</span>
            <span>{progress.completed}/{progress.total} 미션 완료</span>
          </div>
          <ProgressBar percent={progress.percent} className="mint" />
        </div>
      </div>

      {/* What you'll learn */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 className="section-title">📖 이번 스테이지에서 배울 내용</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          {stage.missions.map(m => (
            <li key={m.id} style={{ color: '#546E7A' }}>{m.title} - {m.objective}</li>
          ))}
        </ul>
      </div>

      {/* Mission List */}
      <h2 className="section-title">🎯 미션 목록</h2>
      <div className="mission-list">
        {stage.missions.map((mission, index) => {
          const isCompleted = user.completedMissions.includes(mission.id);
          return (
            <div
              key={mission.id}
              className={`mission-card ${isCompleted ? 'completed' : ''}`}
              onClick={() => navigate(`/student/stage/${stage.id}/mission/${mission.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="mission-info">
                <div className="mission-title">
                  {isCompleted ? '✅' : `📌 미션 ${index + 1}`}
                  <span>{mission.title}</span>
                </div>
                <div className="mission-reward">
                  🪙 {mission.rewardCoins} 코인 · ⚡ {mission.rewardExp} 에너지
                </div>
              </div>
              <div className="mission-status">
                {isCompleted ? (
                  <span style={{
                    background: '#F0FFF0',
                    color: '#4CAF50',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>완료</span>
                ) : (
                  <button className="btn btn-primary btn-sm">도전하기</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Back Button */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/student')}>
          ← 스테이지 목록으로
        </button>
      </div>
    </div>
  );
}
