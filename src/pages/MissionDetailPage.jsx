import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../api/userApi';
import { getUserId, setAuth, getAuth, getRole } from '../utils/auth';
import { stages } from '../data/stages';
import { calculateLevel, isStageUnlocked, isStageClear, getUnlockCoins } from '../utils/progress';
import QuizCard from '../components/QuizCard';
import CompleteModal from '../components/CompleteModal';

export default function MissionDetailPage() {
  const { stageId, missionId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAllQuizCorrect, setIsAllQuizCorrect] = useState(false);
  const [penaltyCoins, setPenaltyCoins] = useState(0);
  const [penaltyToast, setPenaltyToast] = useState({ show: false, key: 0 });
  const [isPracticeVerified, setIsPracticeVerified] = useState(false);
  const [codeCheckInput, setCodeCheckInput] = useState('');
  const [codeCheckWrong, setCodeCheckWrong] = useState(false);

  const stage = stages.find(s => s.id === parseInt(stageId));
  const mission = stage?.missions.find(m => m.id === missionId);

  useEffect(() => {
    if (user?.role === 'teacher' && mission?.codeCheckAnswer) {
      setCodeCheckInput(mission.codeCheckAnswer);
      setIsPracticeVerified(true);
    }
  }, [user, mission]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (penaltyToast.show) {
      const timer = setTimeout(() => {
        setPenaltyToast(prev => ({ ...prev, show: false }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [penaltyToast.key, penaltyToast.show]);

  useEffect(() => {
    setIsPracticeVerified(false);
    setCodeCheckInput('');
    setCodeCheckWrong(false);
  }, [missionId]);

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
      userData.completedMissions = userData.completedMissions || [];
      userData.level = calculateLevel(userData.exp || 0);
      setUser(userData);
    } catch (err) {
      navigate('/student');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!user || !mission) return;
    setCompleting(true);

    try {
      // Check if already completed
      if (user.completedMissions.includes(mission.id)) {
        setAlreadyCompleted(true);
        setShowModal(true);
        setCompleting(false);
        return;
      }

      // Calculate new values
      const newCompletedMissions = [...user.completedMissions, mission.id];
      const newCoins = (user.coins || 0) + mission.rewardCoins;
      const newExp = (user.exp || 0) + mission.rewardExp;
      const newLevel = calculateLevel(newExp);

      // Check if next stage should be unlocked
      let newUnlockedStages = [...(user.unlockedStages || [1])];
      const currentStageId = parseInt(stageId);
      const nextStageId = currentStageId + 1;

      if (nextStageId <= 8) {
        const currentStageClear = isStageClear(currentStageId, newCompletedMissions);
        const nextUnlockCoins = getUnlockCoins(nextStageId);

        if (currentStageClear && newCoins >= nextUnlockCoins && !newUnlockedStages.includes(nextStageId)) {
          newUnlockedStages.push(nextStageId);
        }
      }

      const updatedData = {
        completedMissions: newCompletedMissions,
        coins: newCoins,
        exp: newExp,
        level: newLevel,
        unlockedStages: newUnlockedStages
      };

      // Save to MockAPI
      await updateUser(user.id, updatedData);

      // Update localStorage
      const auth = getAuth();
      if (auth) {
        setAuth({ ...auth });
      }

      // Update local state
      setUser(prev => ({ ...prev, ...updatedData }));
      setAlreadyCompleted(false);
      setShowModal(true);
    } catch (err) {
      alert('앗, 정보를 저장하는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
    } finally {
      setCompleting(false);
    }
  };

  const handleWrongAnswer = async () => {
    if (!user) return;
    if (user.role === 'teacher') return; // 선생님 미리보기에서는 패널티 없음

    setPenaltyCoins(prev => prev + 50);
    setPenaltyToast(prev => ({ show: true, key: prev.key + 1 }));

    const newCoins = Math.max(0, (user.coins || 0) - 50);
    if (newCoins !== user.coins) {
      try {
        await updateUser(user.id, { coins: newCoins });
        setUser(prev => ({ ...prev, coins: newCoins }));
      } catch (err) {
        console.error('Failed to deduct coins:', err);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mission.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeCheck = () => {
    if (!mission?.codeCheckAnswer) return;
    if (codeCheckInput.trim() === mission.codeCheckAnswer.trim()) {
      setIsPracticeVerified(true);
      setCodeCheckWrong(false);
    } else {
      setCodeCheckWrong(true);
    }
  };

  const handleNextMission = () => {
    setShowModal(false);
    if (!stage) return;

    const currentIndex = stage.missions.findIndex(m => m.id === missionId);
    if (currentIndex < stage.missions.length - 1) {
      const nextMission = stage.missions[currentIndex + 1];
      navigate(`/student/stage/${stageId}/mission/${nextMission.id}`);
      window.scrollTo(0, 0);
      // Reload user data for fresh state
      loadUser();
    } else {
      navigate(`/student/stage/${stageId}`);
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

  if (!stage || !mission) {
    return (
      <div className="page-container">
        <div className="error-message">존재하지 않는 미션이에요.</div>
        <button className="btn btn-primary" onClick={() => navigate('/student')}>
          돌아가기
        </button>
      </div>
    );
  }

  if (!user) return null;

  const unlocked = isStageUnlocked(stage.id, user.completedMissions || [], user.coins || 0, user.unlockedStages || [1]);
  if (!unlocked) {
    navigate('/student');
    return null;
  }

  const isTeacher = user.role === 'teacher';
  const isComplete = (user.completedMissions || []).includes(mission.id) || isTeacher;

  return (
    <div className="page-container animate-fade-in">
      <div className="mission-detail">
        {/* Header */}
        <div className="mission-detail-header">
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '8px' }}>
            {stage.icon} {stage.id}단계 · {stage.title}
          </div>
          <h1>{mission.title}</h1>
          <p className="mission-objective">🎯 {mission.objective}</p>
          {isComplete && (
            <div style={{
              marginTop: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              ✅ 완료된 미션
            </div>
          )}
        </div>

        {/* Story */}
        <div className="mission-section">
          <h2>📖 스토리</h2>
          {mission.image && (
            <img 
              src={mission.image} 
              alt="Mission Concept" 
              style={{ 
                width: '100%', 
                maxWidth: mission.image.includes('.svg') ? '150px' : '600px', 
                borderRadius: '12px', 
                marginBottom: '16px', 
                display: 'block', 
                boxShadow: mission.image.includes('.svg') ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
                margin: mission.image.includes('.svg') ? '0 auto 24px' : '0 0 16px'
              }} 
            />
          )}
          <p>{mission.story}</p>
        </div>

        {/* Concept */}
        {mission.concept && (
          <div className="mission-section">
            <h2>💡 개념 설명</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{mission.concept}</p>
          </div>
        )}

        {/* Analogy */}
        {mission.analogy && (
          <div className="mission-section" style={{ borderLeft: '4px solid #FF9F43' }}>
            <h2>🤔 쉬운 비유</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{mission.analogy}</p>
          </div>
        )}

        {/* Code Example */}
        {mission.code && (
          <div className="mission-section" style={{ borderLeft: '4px solid #4ECDC4' }}>
            <h2>💻 따라하기 코드</h2>
            <div className="code-block">
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? '✓ 복사됨' : '📋 복사'}
              </button>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{mission.code}</pre>
            </div>
          </div>
        )}

        {/* Practice Sites */}
        <div className="mission-section">
          <h2>🖥️ 실습하기</h2>
          <p style={{ marginBottom: '16px' }}>
            아래 버튼을 누르면 설치 없이 파이썬 코드를 실행할 수 있는 사이트가 열려요.<br />
            예제 코드를 복사해서 붙여넣고 실행해보세요.
          </p>
          <div className="practice-links">
            <a
              href="https://www.programiz.com/python-programming/online-compiler"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-mint"
            >
              💻 실습 사이트 열기
            </a>
            <a
              href="https://pythontutor.com/python-compiler.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sky"
            >
              👁️ 코드가 실행되는 과정 보기
            </a>
          </div>
        </div>

        {/* Code Explanation */}
        {mission.explanation && (
          <div className="mission-section">
            <h2>📝 코드 설명</h2>
            <ul>
              {mission.explanation.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Practice Verification */}
        {mission.codeCheckQuestion && (!(user.completedMissions || []).includes(mission.id) || isTeacher) && (
          <div className="mission-section" style={{ borderLeft: '4px solid #6C5CE7' }}>
            <h2>🔐 코드 결과 확인</h2>
            <p style={{ marginBottom: '12px' }}>{mission.codeCheckQuestion}</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={codeCheckInput}
                onChange={(e) => {
                  setCodeCheckInput(e.target.value);
                  setCodeCheckWrong(false);
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCodeCheck(); }}
                placeholder="실행 결과를 입력하세요"
                disabled={isPracticeVerified}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '2px solid ' + (isPracticeVerified ? '#4ECDC4' : codeCheckWrong ? '#FF6B6B' : '#ddd'),
                  fontSize: '1rem',
                  outline: 'none',
                  background: isPracticeVerified ? '#f0fff4' : '#fff',
                  color: '#333'
                }}
              />
              {!isPracticeVerified && (
                <button
                  className="btn btn-primary"
                  onClick={handleCodeCheck}
                  style={{ whiteSpace: 'nowrap', padding: '12px 24px' }}
                >
                  확인
                </button>
              )}
            </div>
            {isPracticeVerified && (
              <div style={{ color: '#4ECDC4', fontWeight: 600, marginTop: '10px', fontSize: '0.95rem' }}>
                ✅ 실습 확인 완료! 아래 퀴즈를 풀어보세요.
              </div>
            )}
            {codeCheckWrong && (
              <div style={{ color: '#FF6B6B', fontWeight: 600, marginTop: '10px', fontSize: '0.95rem' }}>
                ❌ 틀렸어요! 코드를 직접 실행해보고 정확한 결과를 입력해주세요.
              </div>
            )}
          </div>
        )}

        {/* Practice */}
        {mission.practice && (
          <div className="mission-section" style={{ borderLeft: '4px solid #4ECDC4' }}>
            <h2>✏️ 직접 바꿔보기</h2>
            <p>{mission.practice}</p>
          </div>
        )}

        {/* Challenge */}
        {mission.challenge && (
          <div className="mission-section" style={{ borderLeft: '4px solid #FF9F43' }}>
            <h2>🔥 도전 미션</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{mission.challenge}</p>
          </div>
        )}

        {/* Quiz */}
        {mission.quizzes && mission.quizzes.length > 0 && (
          (!mission.codeCheckQuestion || isPracticeVerified || isComplete) ? (
          <div className="mission-section">
            <h2>❓ 확인 퀴즈</h2>
            <QuizCard 
              key={mission.id} 
              quizzes={mission.quizzes} 
              onAllCorrect={setIsAllQuizCorrect} 
              onWrongAnswer={handleWrongAnswer}
              prefilledAnswers={isTeacher}
            />
          </div>
          ) : (
          <div className="mission-section" style={{ opacity: 0.4, pointerEvents: 'none', userSelect: 'none' }}>
            <h2>🔒 확인 퀴즈</h2>
            <p style={{ textAlign: 'center', padding: '20px 0', fontSize: '1rem', color: '#888' }}>
              위의 코드 결과 확인을 완료하면 퀴즈가 열립니다.
            </p>
          </div>
          )
        )}

        {/* Complete Button */}
        <div style={{ textAlign: 'center', margin: '40px 0 20px' }}>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleComplete}
            disabled={completing || (!isComplete && !isAllQuizCorrect)}
            style={{
              padding: '18px 48px',
              fontSize: '1.1rem',
              background: isComplete
                ? 'linear-gradient(135deg, #4CAF50, #66BB6A)'
                : 'var(--gradient-purple)',
              opacity: (!isComplete && !isAllQuizCorrect) ? 0.5 : 1,
              cursor: (!isComplete && !isAllQuizCorrect) ? 'not-allowed' : 'pointer'
            }}
          >
            {completing ? '처리 중...' : isComplete ? '✅ 완료한 미션' : '🎯 미션 완료!'}
          </button>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <button className="btn btn-secondary" onClick={() => navigate(`/student/stage/${stageId}`)}>
            ← 스테이지로 돌아가기
          </button>
          {(() => {
            const currentIndex = stage.missions.findIndex(m => m.id === missionId);
            if (currentIndex < stage.missions.length - 1) {
              const nextMission = stage.missions[currentIndex + 1];
              return (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (isComplete) {
                      navigate(`/student/stage/${stageId}/mission/${nextMission.id}`);
                      window.scrollTo(0, 0);
                      loadUser();
                    } else {
                      alert('🎯 미션 완료 버튼을 먼저 클릭하세요!');
                    }
                  }}
                >
                  다음 미션 →
                </button>
              );
            }
            return null;
          })()}
        </div>
      </div>

      {showModal && (
        <CompleteModal
          rewardCoins={mission.rewardCoins}
          rewardExp={mission.rewardExp}
          penaltyCoins={penaltyCoins}
          alreadyCompleted={alreadyCompleted}
          onClose={() => setShowModal(false)}
          onNext={handleNextMission}
        />
      )}

      {penaltyToast.show && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          pointerEvents: 'none'
        }}>
          <div className="animate-fade-in" style={{
            backgroundColor: 'rgba(255, 107, 107, 0.95)',
            color: '#fff',
            padding: '24px 40px',
            borderRadius: '20px',
            boxShadow: '0 12px 30px rgba(255, 107, 107, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>💸</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>앗! 오답이에요</div>
            <div style={{ fontSize: '1.05rem', opacity: 0.95, fontWeight: 500 }}>
              플레이 코인이 50 차감되었습니다.<br/>
              남은 코인: {Math.max(0, (user.coins || 0) - 50)}C
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
