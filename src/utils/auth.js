const AUTH_KEY = 'pythonPlayground_auth';

export function getAuth() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setAuth(authData) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn() {
  const auth = getAuth();
  return auth && auth.isLoggedIn === true;
}

export function isTeacher() {
  const auth = getAuth();
  return auth && auth.role === 'teacher';
}

export function isStudent() {
  const auth = getAuth();
  return auth && auth.role === 'student';
}

export function getRole() {
  const auth = getAuth();
  return auth ? auth.role : null;
}

export function getUserId() {
  const auth = getAuth();
  return auth ? auth.userId : null;
}

export function getNickname() {
  const auth = getAuth();
  return auth ? auth.nickname : null;
}

export const TEACHER_CREDENTIALS = {
  username: 'seongmin',
  password: '1'
};
