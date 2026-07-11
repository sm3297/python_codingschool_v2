import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByUsername } from '../api/userApi';
import { setAuth, TEACHER_CREDENTIALS, TEST_CREDENTIALS } from '../utils/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }

    // Check teacher credentials
    if (username === TEACHER_CREDENTIALS.username && password === TEACHER_CREDENTIALS.password) {
      setAuth({
        isLoggedIn: true,
        role: 'teacher',
        userId: null,
        username: TEACHER_CREDENTIALS.username,
        nickname: '선생님'
      });
      navigate('/teacher');
      return;
    }

    // Check test credentials
    if (username === TEST_CREDENTIALS.username && password === TEST_CREDENTIALS.password) {
      setAuth({
        isLoggedIn: true,
        role: 'test',
        userId: 'test_user',
        username: TEST_CREDENTIALS.username,
        nickname: '테스트학생'
      });
      navigate('/level-test');
      return;
    }

    setLoading(true);
    try {
      const user = await getUserByUsername(username);
      if (!user || user.password !== password) {
        setError('아이디 또는 비밀번호가 맞지 않아요.\n다시 한 번 확인해 주세요.');
        setLoading(false);
        return;
      }

      setAuth({
        isLoggedIn: true,
        role: 'student',
        userId: user.id,
        username: user.username,
        nickname: user.nickname
      });
      navigate('/student');
    } catch (err) {
      setError('앗, 로그인 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-slide-up">
        <div style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '8px' }}>🐍</div>
        <h1>로그인</h1>
        <p className="auth-subtitle">파이썬 플레이그라운드에 오신 것을 환영해요!</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="login-username">아이디</label>
            <input
              id="login-username"
              className="input-field"
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="login-password">비밀번호</label>
            <div className="password-input-wrapper">
              <input
                id="login-password"
                className="input-field"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="auth-footer" style={{ marginBottom: '10px' }}>
          계정을 잊으셨나요? <Link to="/find-account">아이디/비밀번호 찾기</Link>
        </p>
        <p className="auth-footer">
          아직 계정이 없나요? <Link to="/signup">회원가입하기</Link>
        </p>
      </div>
    </div>
  );
}
