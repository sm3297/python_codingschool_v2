import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser, resetUserProgress } from '../api/userApi';
import { getOverallProgress, calculateLevel, getTotalMissions } from '../utils/progress';
import ProgressBar from '../components/ProgressBar';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const totalMissions = getTotalMissions();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const users = await getUsers();
      const studentList = users.filter(u => u.role === 'student');
      // Calculate derived values
      const enriched = studentList.map(s => ({
        ...s,
        completedMissions: s.completedMissions || [],
        level: calculateLevel(s.exp || 0),
        progress: getOverallProgress(s.completedMissions || [])
      }));
      setStudents(enriched);
    } catch (err) {
      setError('앗, 학생 정보를 불러오는 중 문제가 생겼어요.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (id, nickname) => {
    if (!window.confirm(`${nickname} 학생의 진행 상황을 초기화할까요?\n이 작업은 되돌릴 수 없어요.`)) return;
    try {
      await resetUserProgress(id);
      await loadStudents();
    } catch (err) {
      alert('초기화 중 문제가 생겼어요.');
    }
  };

  const handleDelete = async (id, nickname) => {
    if (!window.confirm(`${nickname} 학생을 삭제할까요?\n이 작업은 되돌릴 수 없어요.`)) return;
    try {
      await deleteUser(id);
      await loadStudents();
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

  // Calculate averages
  const avgProgress = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)
    : 0;
  const avgLevel = students.length > 0
    ? (students.reduce((sum, s) => sum + (s.level || 1), 0) / students.length).toFixed(1)
    : 0;

  return (
    <div className="page-container animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
        👩‍🏫 학생 관리 대시보드
      </h1>
      <p style={{ color: '#546E7A', marginBottom: '32px' }}>
        학생들의 학습 진행 상황을 한눈에 확인하세요.
      </p>

      {error && <div className="error-message">{error}</div>}

      {/* Summary Stats */}
      <div className="teacher-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{students.length}</div>
          <div className="stat-label">전체 학생 수</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{avgProgress}%</div>
          <div className="stat-label">평균 진행률</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{avgLevel}</div>
          <div className="stat-label">평균 레벨</div>
        </div>
      </div>

      {/* Refresh Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button className="btn btn-secondary btn-sm" onClick={loadStudents}>
          🔄 새로고침
        </button>
      </div>

      {/* Student Table */}
      {students.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '2rem', marginBottom: '12px' }}>📭</p>
          <p style={{ color: '#90A4AE' }}>아직 가입한 학생이 없어요.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="student-table">
            <thead>
              <tr>
                <th>닉네임</th>
                <th>아이디</th>
                <th>레벨</th>
                <th>코인</th>
                <th>경험치</th>
                <th>완료 미션</th>
                <th>진행률</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td style={{ fontWeight: 600 }}>{student.nickname || '-'}</td>
                  <td style={{ color: '#546E7A' }}>{student.username}</td>
                  <td>
                    <span style={{
                      background: 'var(--gradient-purple)',
                      color: 'white',
                      padding: '2px 10px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>Lv.{student.level}</span>
                  </td>
                  <td>🪙 {student.coins || 0}</td>
                  <td>⚡ {student.exp || 0}</td>
                  <td>{student.completedMissions.length}/{totalMissions}</td>
                  <td style={{ minWidth: '120px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ProgressBar percent={student.progress} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {student.progress}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/teacher/student/${student.id}`)}
                      >
                        상세
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ background: '#FFD166', color: '#263238' }}
                        onClick={() => handleReset(student.id, student.nickname)}
                      >
                        초기화
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(student.id, student.nickname)}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
