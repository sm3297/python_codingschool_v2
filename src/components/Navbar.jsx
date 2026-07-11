import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, isTeacher, isStudent, getNickname, clearAuth, getRole } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const teacher = isTeacher();
  const student = isStudent();
  const nickname = getNickname();
  const isTestUser = getRole() === 'test';

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">🐍</span>
        <span>파이썬 플레이그라운드</span>
      </Link>
      <div className="navbar-links">
        <Link to="/">🏠 홈</Link>
        {!loggedIn && (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
        {student && (
          <>
            <Link to="/student">스테이지</Link>
            <Link to="/profile">내 프로필</Link>
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          </>
        )}
        {teacher && (
          <>
            <Link to="/teacher">학생 관리</Link>
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          </>
        )}
        {isTestUser && (
          <>
            <span style={{ margin: '0 10px', opacity: 0.8 }}>테스트 계정</span>
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          </>
        )}
      </div>
    </nav>
  );
}
