import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api/userApi';

export default function FindAccountPage() {
  const [activeTab, setActiveTab] = useState('id'); // 'id' | 'pw'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // ID 찾기 폼
  const [idNickname, setIdNickname] = useState('');

  // PW 찾기 폼
  const [pwUsername, setPwUsername] = useState('');
  const [pwNickname, setPwNickname] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setResult(null);
    setIdNickname('');
    setPwUsername('');
    setPwNickname('');
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!idNickname) {
      setError('닉네임을 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      const users = await getUsers();
      const foundUsers = users.filter(u => u.nickname === idNickname && u.role === 'student');
      
      if (foundUsers.length > 0) {
        const usernames = foundUsers.map(u => u.username).join(', ');
        setResult(`회원님의 아이디는 [ ${usernames} ] 입니다.`);
      } else {
        setError('해당 닉네임으로 가입된 계정이 없어요.');
      }
    } catch (err) {
      setError('앗, 정보를 확인하는 중 문제가 생겼어요.');
    } finally {
      setLoading(false);
    }
  };

  const handleFindPw = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!pwUsername || !pwNickname) {
      setError('아이디와 닉네임을 모두 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      const users = await getUsers();
      const user = users.find(u => u.username === pwUsername && u.nickname === pwNickname && u.role === 'student');
      
      if (user) {
        setResult(`회원님의 비밀번호는 [ ${user.password} ] 입니다.`);
      } else {
        setError('입력하신 정보와 일치하는 계정이 없어요.');
      }
    } catch (err) {
      setError('앗, 정보를 확인하는 중 문제가 생겼어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-slide-up">
        <div style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '8px' }}>🔍</div>
        <h1>계정 찾기</h1>
        <p className="auth-subtitle">아이디나 비밀번호를 잊으셨나요?</p>

        <div className="tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            type="button"
            className={`btn ${activeTab === 'id' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1 }}
            onClick={() => handleTabChange('id')}
          >
            아이디 찾기
          </button>
          <button 
            type="button"
            className={`btn ${activeTab === 'pw' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1 }}
            onClick={() => handleTabChange('pw')}
          >
            비밀번호 찾기
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {result && <div className="success-message" style={{ whiteSpace: 'pre-wrap' }}>{result}</div>}

        {activeTab === 'id' ? (
          <form onSubmit={handleFindId}>
            <div className="input-group">
              <label htmlFor="find-id-nickname">가입할 때 설정한 닉네임</label>
              <input
                id="find-id-nickname"
                className="input-field"
                type="text"
                placeholder="닉네임을 입력하세요"
                value={idNickname}
                onChange={(e) => setIdNickname(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? '찾는 중...' : '아이디 찾기'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleFindPw}>
            <div className="input-group">
              <label htmlFor="find-pw-username">아이디</label>
              <input
                id="find-pw-username"
                className="input-field"
                type="text"
                placeholder="아이디를 입력하세요"
                value={pwUsername}
                onChange={(e) => setPwUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="find-pw-nickname">닉네임</label>
              <input
                id="find-pw-nickname"
                className="input-field"
                type="text"
                placeholder="닉네임을 입력하세요"
                value={pwNickname}
                onChange={(e) => setPwNickname(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? '찾는 중...' : '비밀번호 찾기'}
            </button>
          </form>
        )}

        <p className="auth-footer" style={{ marginTop: '20px' }}>
          <Link to="/login">로그인 화면으로 돌아가기</Link>
        </p>
      </div>
    </div>
  );
}
