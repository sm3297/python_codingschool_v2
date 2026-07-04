import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByUsername, createUser } from '../api/userApi';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (form.username.length < 3) {
      return '아이디는 3글자 이상이어야 해요.';
    }
    if (form.password.length < 1) {
      return '비밀번호를 입력해 주세요.';
    }
    if (form.password !== form.passwordConfirm) {
      return '비밀번호와 비밀번호 확인이 일치하지 않아요.';
    }
    if (form.nickname.length < 2) {
      return '닉네임은 2글자 이상이어야 해요.';
    }
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // Check if username already exists
      const existing = await getUserByUsername(form.username);
      if (existing) {
        setError('이미 사용 중인 아이디예요. 다른 아이디를 사용해 주세요.');
        setLoading(false);
        return;
      }

      const userData = {
        username: form.username,
        password: form.password,
        nickname: form.nickname,
        role: 'student',
        coins: 0,
        exp: 0,
        level: 1,
        completedMissions: [],
        unlockedStages: [1],
        createdAt: new Date().toISOString().split('T')[0]
      };

      await createUser(userData);
      setSuccess('회원가입이 완료되었어요! 이제 파이썬 플레이그라운드를 시작해볼까요?');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('앗, 회원가입 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-slide-up">
        <div style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
        <h1>회원가입</h1>
        <p className="auth-subtitle">파이썬 미션을 시작해볼까요?</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="signup-username">아이디</label>
            <input
              id="signup-username"
              className="input-field"
              type="text"
              name="username"
              placeholder="3글자 이상 입력해 주세요"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="signup-password">비밀번호</label>
            <div className="password-input-wrapper">
              <input
                id="signup-password"
                className="input-field"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호를 입력해 주세요"
                value={form.password}
                onChange={handleChange}
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
          <div className="input-group">
            <label htmlFor="signup-password-confirm">비밀번호 확인</label>
            <div className="password-input-wrapper">
              <input
                id="signup-password-confirm"
                className="input-field"
                type={showPasswordConfirm ? "text" : "password"}
                name="passwordConfirm"
                placeholder="비밀번호를 다시 입력해 주세요"
                value={form.passwordConfirm}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
              >
                {showPasswordConfirm ? (
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
          <div className="input-group">
            <label htmlFor="signup-nickname">닉네임</label>
            <input
              id="signup-nickname"
              className="input-field"
              type="text"
              name="nickname"
              placeholder="2글자 이상 입력해 주세요"
              value={form.nickname}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p className="auth-footer">
          이미 계정이 있나요? <Link to="/login">로그인하기</Link>
        </p>
      </div>
    </div>
  );
}
