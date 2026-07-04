import axios from 'axios';

const API_BASE = 'https://6a4849aeabfcbaade1194d49.mockapi.io';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// MockAPI는 배열을 문자열로 저장할 수 있으므로 안전하게 파싱
function parseArrayField(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // ignore
    }
  }
  return [];
}

// 사용자 데이터를 정규화
function normalizeUser(user) {
  if (!user) return null;
  return {
    ...user,
    coins: Number(user.coins) || 0,
    exp: Number(user.exp) || 0,
    level: Number(user.level) || 1,
    completedMissions: parseArrayField(user.completedMissions),
    unlockedStages: parseArrayField(user.unlockedStages),
  };
}

export async function getUsers() {
  try {
    const response = await api.get('/users');
    const data = Array.isArray(response.data) ? response.data : [];
    return data.map(normalizeUser);
  } catch (error) {
    // MockAPI는 데이터가 없으면 404를 반환할 수 있음
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error('사용자 목록 불러오기 실패:', error);
    throw new Error('앗, 정보를 불러오는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
  }
}

export async function getUserByUsername(username) {
  try {
    // 전체 목록을 가져와서 username으로 필터 (MockAPI search param이 부정확할 수 있음)
    const response = await api.get('/users');
    const users = Array.isArray(response.data) ? response.data : [];
    const found = users.find(u => u.username === username);
    return found ? normalizeUser(found) : null;
  } catch (error) {
    // MockAPI는 데이터가 없으면 404를 반환할 수 있음
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('사용자 검색 실패:', error);
    throw new Error('앗, 정보를 불러오는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
  }
}

export async function getUserById(id) {
  try {
    const response = await api.get(`/users/${id}`);
    return normalizeUser(response.data);
  } catch (error) {
    console.error('사용자 불러오기 실패:', error);
    throw new Error('앗, 정보를 불러오는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
  }
}

export async function createUser(userData) {
  try {
    // MockAPI에 보내기 전에 배열을 JSON 문자열로 변환
    const payload = {
      ...userData,
      completedMissions: JSON.stringify(userData.completedMissions || []),
      unlockedStages: JSON.stringify(userData.unlockedStages || [1]),
    };
    const response = await api.post('/users', payload);
    return normalizeUser(response.data);
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw new Error('앗, 회원가입 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
  }
}

export async function updateUser(id, userData) {
  try {
    // 배열 필드가 있으면 JSON 문자열로 변환
    const payload = { ...userData };
    if (Array.isArray(payload.completedMissions)) {
      payload.completedMissions = JSON.stringify(payload.completedMissions);
    }
    if (Array.isArray(payload.unlockedStages)) {
      payload.unlockedStages = JSON.stringify(payload.unlockedStages);
    }
    const response = await api.put(`/users/${id}`, payload);
    return normalizeUser(response.data);
  } catch (error) {
    console.error('정보 저장 실패:', error);
    throw new Error('앗, 정보를 저장하는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
  }
}

export async function deleteUser(id) {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('삭제 실패:', error);
    throw new Error('앗, 삭제하는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
  }
}

export async function resetUserProgress(id) {
  try {
    const response = await api.put(`/users/${id}`, {
      coins: 0,
      exp: 0,
      level: 1,
      completedMissions: JSON.stringify([]),
      unlockedStages: JSON.stringify([1])
    });
    return normalizeUser(response.data);
  } catch (error) {
    console.error('초기화 실패:', error);
    throw new Error('앗, 초기화하는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.');
  }
}
