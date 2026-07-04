import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn, isTeacher, isStudent } from './utils/auth';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FindAccountPage from './pages/FindAccountPage';
import StudentDashboard from './pages/StudentDashboard';
import StageDetailPage from './pages/StageDetailPage';
import MissionDetailPage from './pages/MissionDetailPage';
import ProfilePage from './pages/ProfilePage';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDetailForTeacher from './pages/StudentDetailForTeacher';
import NotFoundPage from './pages/NotFoundPage';

// Route guard for student pages
function StudentRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  // Allow teachers to preview student pages
  return children;
}

// Route guard for teacher pages
function TeacherRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (isStudent()) return <Navigate to="/student" replace />;
  return children;
}

// Redirect logged-in users from auth pages
function AuthRoute({ children }) {
  if (isLoggedIn()) {
    if (isTeacher()) return <Navigate to="/teacher" replace />;
    if (isStudent()) return <Navigate to="/student" replace />;
  }
  return children;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar key={location.pathname} />
      <main>
        <Routes>
          {/* Public */}
          <Route path="/" element={
            <LandingPage />
          } />

          {/* Auth */}
          <Route path="/login" element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } />
          <Route path="/signup" element={
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          } />
          <Route path="/find-account" element={
            <AuthRoute>
              <FindAccountPage />
            </AuthRoute>
          } />

          {/* Student */}
          <Route path="/student" element={
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          } />
          <Route path="/student/stage/:stageId" element={
            <StudentRoute>
              <StageDetailPage />
            </StudentRoute>
          } />
          <Route path="/student/stage/:stageId/mission/:missionId" element={
            <StudentRoute>
              <MissionDetailPage />
            </StudentRoute>
          } />
          <Route path="/profile" element={
            <StudentRoute>
              <ProfilePage />
            </StudentRoute>
          } />

          {/* Teacher */}
          <Route path="/teacher" element={
            <TeacherRoute>
              <TeacherDashboard />
            </TeacherRoute>
          } />
          <Route path="/teacher/student/:userId" element={
            <TeacherRoute>
              <StudentDetailForTeacher />
            </TeacherRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
