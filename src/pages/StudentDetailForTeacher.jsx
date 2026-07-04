import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, resetUserProgress, deleteUser } from '../api/userApi';
import { getOverallProgress, calculateLevel, getTotalMissions } from '../utils/progress';
import { stages } from '../data/stages';
import ProgressBar from '../components/ProgressBar';

export default function StudentDetailForTeacher() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const totalMissions = getTotalMissions();

  useEffect(() => {
    loadStudent();
  }, [userId]);

  const loadStudent = async () => {
    setLoading(true);
    try {
      const userData = await getUserById(userId);
      if (!userData) {
        setError('학생 정보를 찾을 수 없어요.');
        setLoading(false);
        return;
      }
      userData.completedMissions = userData.completedMissions || [];
      userData.level = calculateLevel(userData.exp || 0);
      setStudent(userData);
    } catch (err) {
      setError('앗, 학생 정보를 불러오는 중 문제가 생겼어요.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm(`${student.nickname} 학생의 진행 상황을 초기화할까요?\n이 작업은 되돌릴 수 없어요.`)) return;
    try {
      await resetUserProgress(student.id);
      await loadStudent();
    } catch (err) {
      alert('초기화 중 문제가 생겼어요.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`${student.nickname} 학생을 삭제할까요?\n이 작업은 되돌릴 수 없어요.`)) return;
    try {
      await deleteUser(student.id);
      navigate('/teacher');
    } catch (err) {
      alert('삭제 중 문제가 생겼어요.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p className="loading-text">학생 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/teacher')}>
          돌아가기
        </button>
      </div>
    );
  }

  if (!student) return null;

  const progress = getOverallProgress(student.completedMissions);

  // Categorize missions
  const completedMissions = [];
  const incompleteMissions = [];
  stages.forEach(stage => {
    stage.missions.forEach(mission => {
      const missionData = {
        ...mission,
        stageName: stage.title,
        stageIcon: stage.icon,
        stageId: stage.id
      };
      if (student.completedMissions.includes(mission.id)) {
        completedMissions.push(missionData);
      } else {
        incompleteMissions.push(missionData);
      }
    });
  });

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="student-detail-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1>👤 {student.nickname}</h1>
            <p style={{ opacity: 0.8, marginTop: '4px' }}>@{student.username}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }} onClick={handleReset}>
              🔄 초기화
            </button>
            <button className="btn btn-sm" style={{ background: '#FF6B6B', color: 'white' }} onClick={handleDelete}>
              🗑️ 삭제
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{student.level || 1}</div>
          <div className="stat-label">플레이 레벨</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🪙</div>
          <div className="stat-value">{student.coins || 0}</div>
          <div className="stat-label">플레이 코인</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-value">{student.exp || 0}</div>
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
            {student.completedMissions.length}/{totalMissions} 미션 완료
          </span>
        </div>
        <ProgressBar percent={progress} />
      </div>

      {/* Completed Stages */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 className="section-title">📋 스테이지별 진행 상황</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {stages.map(stage => {
            const stageMissionIds = stage.missions.map(m => m.id);
            const stageCompleted = stageMissionIds.filter(id => student.completedMissions.includes(id)).length;
            const stageTotal = stage.missions.length;
            const stagePercent = Math.round((stageCompleted / stageTotal) * 100);

            return (
              <div key={stage.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#FAFAFF',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{stage.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{stage.id}단계 · {stage.title}</span>
                    <span style={{ color: '#546E7A' }}>{stageCompleted}/{stageTotal}</span>
                  </div>
                  <ProgressBar percent={stagePercent} className="mint" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Missions */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 className="section-title">✅ 완료한 미션 ({completedMissions.length}개)</h2>
        {completedMissions.length === 0 ? (
          <p style={{ color: '#90A4AE', textAlign: 'center', padding: '16px' }}>완료한 미션이 없어요.</p>
        ) : (
          <div className="mission-list-simple">
            {completedMissions.map(m => (
              <div key={m.id} className="mission-item completed">
                <span>✅</span>
                <span>{m.stageIcon}</span>
                <span style={{ fontWeight: 600 }}>{m.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Incomplete Missions */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 className="section-title">⏳ 미완료 미션 ({incompleteMissions.length}개)</h2>
        {incompleteMissions.length === 0 ? (
          <p style={{ color: '#4CAF50', textAlign: 'center', padding: '16px' }}>🎉 모든 미션을 완료했어요!</p>
        ) : (
          <div className="mission-list-simple">
            {incompleteMissions.map(m => (
              <div key={m.id} className="mission-item incomplete">
                <span>⏳</span>
                <span>{m.stageIcon}</span>
                <span style={{ fontWeight: 600 }}>{m.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/teacher')}>
          ← 학생 목록으로
        </button>
      </div>
    </div>
  );
}
