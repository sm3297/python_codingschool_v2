import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api/userApi';
import { getUserId, getNickname, getRole } from '../utils/auth';
import { getOverallProgress, calculateLevel } from '../utils/progress';
import { stages } from '../data/stages';
import StageCard from '../components/StageCard';
import LockModal from '../components/LockModal';
import ProgressBar from '../components/ProgressBar';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLockModal, setShowLockModal] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      if (getRole() === 'teacher') {
        setUser({
          id: 'teacher',
          role: 'teacher',
          nickname: '선생님 (미리보기)',
          coins: 99999,
          exp: 99999,
          level: 99,
          completedMissions: stages.flatMap(s => s.missions.map(m => m.id)),
          unlockedStages: stages.map(s => s.id)
        });
        setLoading(false);
        return;
      }

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
      // Ensure arrays exist
      userData.completedMissions = userData.completedMissions || [];
      userData.unlockedStages = userData.unlockedStages || [1];
      userData.level = calculateLevel(userData.exp || 0);
      setUser(userData);
    } catch (err) {
      setError('앗, 정보를 불러오는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
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

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!user) return null;

  const nickname = user.nickname || getNickname() || '학생';
  const progress = getOverallProgress(user.completedMissions);

  // Find first incomplete mission for recommendation
  let recommendedMission = null;
  for (const stage of stages) {
    for (const mission of stage.missions) {
      if (!user.completedMissions.includes(mission.id)) {
        recommendedMission = { stage, mission };
        break;
      }
    }
    if (recommendedMission) break;
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Welcome Card */}
      <div className="dashboard-welcome">
        <h2>{nickname}님, 오늘도 파이썬 미션을 클리어해볼까요?</h2>
        <div className="welcome-stats">
          <span>⭐ 레벨 {user.level || 1}</span>
          <span>🪙 플레이 코인 {user.coins || 0}</span>
          <span>⚡ 코드 에너지 {user.exp || 0}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
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

      {/* Progress Bar */}
      <div className="card" style={{ marginBottom: '32px', padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>전체 진행률</span>
          <span style={{ fontWeight: 700, color: '#6C63FF', fontSize: '0.9rem' }}>{progress}%</span>
        </div>
        <ProgressBar percent={progress} />
      </div>

      {/* Recommended Mission */}
      {recommendedMission && (
        <div className="card" style={{ marginBottom: '32px', cursor: 'pointer', borderLeft: '4px solid #6C63FF' }}
          onClick={() => navigate(`/student/stage/${recommendedMission.stage.id}/mission/${recommendedMission.mission.id}`)}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6C63FF', marginBottom: '4px' }}>
            🎯 오늘의 추천 미션
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#263238' }}>
            {recommendedMission.stage.icon} {recommendedMission.stage.title} → {recommendedMission.mission.title}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#546E7A', marginTop: '4px' }}>
            🪙 {recommendedMission.mission.rewardCoins} 코인 · ⚡ {recommendedMission.mission.rewardExp} 에너지
          </div>
        </div>
      )}

      {/* Problem Set Link */}
      <h2 className="section-title">📝 실전 문제 풀이</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div 
          className="card" 
          style={{ marginBottom: 0, cursor: 'pointer', borderLeft: '4px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => window.open('https://codeup.kr/problemsetsol.php?psid=33&utm_source=chatgpt.com', '_blank')}
        >
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#263238', marginBottom: '4px' }}>
              🏆 코드업 파이썬 실전 문제집
            </div>
            <div style={{ fontSize: '0.85rem', color: '#546E7A' }}>
              스테이지에서 배운 내용을 바탕으로 실제 코딩 문제를 풀어보세요!
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', color: '#10b981' }}>↗️</div>
        </div>

        <div 
          className="card" 
          style={{ marginBottom: 0, cursor: 'pointer', borderLeft: '4px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => window.open('https://www.programiz.com/python-programming/online-compiler/', '_blank')}
        >
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#263238', marginBottom: '4px' }}>
              💻 파이썬 온라인 컴파일러
            </div>
            <div style={{ fontSize: '0.85rem', color: '#546E7A' }}>
              문제집의 코드를 이곳(Programiz)에 붙여넣어 실행하고 테스트해보세요!
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', color: '#3b82f6' }}>↗️</div>
        </div>
      </div>

      {/* Stages Grid */}
      <h2 className="section-title">🗺️ 스테이지</h2>
      <div className="stages-grid">
        {stages.map(stage => (
          <StageCard
            key={stage.id}
            stage={stage}
            completedMissions={user.completedMissions}
            coins={user.coins || 0}
            unlockedStages={user.unlockedStages || [1]}
            onLocked={() => setShowLockModal(true)}
          />
        ))}
      </div>

      {showLockModal && <LockModal onClose={() => setShowLockModal(false)} />}
    </div>
  );
}
