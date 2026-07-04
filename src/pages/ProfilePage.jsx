import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api/userApi';
import { getUserId, getNickname } from '../utils/auth';
import { getOverallProgress, calculateLevel, getTotalMissions } from '../utils/progress';
import { stages } from '../data/stages';
import ProgressBar from '../components/ProgressBar';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (!user) return null;

  const nickname = user.nickname || getNickname() || '학생';
  const progress = getOverallProgress(user.completedMissions);
  const totalMissions = getTotalMissions();

  // Get completed mission details
  const completedMissionDetails = [];
  stages.forEach(stage => {
    stage.missions.forEach(mission => {
      if (user.completedMissions.includes(mission.id)) {
        completedMissionDetails.push({
          ...mission,
          stageName: stage.title,
          stageIcon: stage.icon
        });
      }
    });
  });

  return (
    <div className="page-container animate-fade-in">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">😎</div>
        <h1>{nickname}</h1>
        <p className="profile-username">@{user.username}</p>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{user.level || 1}</div>
          <div className="stat-label">플레이 레벨</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🪙</div>
          <div className="stat-value">{user.coins || 0}</div>
          <div className="stat-label">플레이 코인</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-value">{user.exp || 0}</div>
          <div className="stat-label">코드 에너지</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{progress}%</div>
          <div className="stat-label">전체 진행률</div>
        </div>
      </div>

      {/* Progress */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontWeight: 700 }}>전체 진행률</span>
          <span style={{ fontWeight: 700, color: '#6C63FF' }}>
            {user.completedMissions.length}/{totalMissions} 미션 완료
          </span>
        </div>
        <ProgressBar percent={progress} />
      </div>

      {/* Completed Missions */}
      <div className="card">
        <h2 className="section-title">✅ 완료한 미션 ({completedMissionDetails.length}개)</h2>
        {completedMissionDetails.length === 0 ? (
          <p style={{ color: '#90A4AE', textAlign: 'center', padding: '20px' }}>
            아직 완료한 미션이 없어요. 첫 번째 미션에 도전해보세요!
          </p>
        ) : (
          <div className="mission-list-simple">
            {completedMissionDetails.map(m => (
              <div key={m.id} className="mission-item completed">
                <span>✅</span>
                <span>{m.stageIcon} {m.stageName}</span>
                <span>→</span>
                <span style={{ fontWeight: 600 }}>{m.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
