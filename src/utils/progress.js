import { stages } from '../data/stages';

// 해금 조건: 각 스테이지에 필요한 코인
const UNLOCK_COINS = {
  1: 0,
  2: 200,
  3: 500,
  4: 900,
  5: 1200,
  6: 1600,
  7: 2000,
  8: 2400
};

// 총 미션 수 계산
export function getTotalMissions() {
  return stages.reduce((total, stage) => total + stage.missions.length, 0);
}

// 전체 진행률 계산
export function getOverallProgress(completedMissions = []) {
  const total = getTotalMissions();
  if (total === 0) return 0;
  return Math.round((completedMissions.length / total) * 100);
}

// 레벨 계산
export function calculateLevel(exp) {
  return Math.floor(exp / 500) + 1;
}

// 스테이지 미션 완료 여부 확인
export function isStageClear(stageId, completedMissions = []) {
  const stage = stages.find(s => s.id === stageId);
  if (!stage) return false;
  return stage.missions.every(m => completedMissions.includes(m.id));
}

// 스테이지 해금 여부 확인
export function isStageUnlocked(stageId, completedMissions = [], coins = 0) {
  if (stageId === 1) return true;

  const prevStageId = stageId - 1;
  const prevStageClear = isStageClear(prevStageId, completedMissions);
  const requiredCoins = UNLOCK_COINS[stageId] || 0;

  return prevStageClear && coins >= requiredCoins;
}

// 스테이지 진행률
export function getStageProgress(stageId, completedMissions = []) {
  const stage = stages.find(s => s.id === stageId);
  if (!stage) return { completed: 0, total: 0, percent: 0 };

  const completed = stage.missions.filter(m => completedMissions.includes(m.id)).length;
  const total = stage.missions.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { completed, total, percent };
}

// 스테이지 해금에 필요한 코인
export function getUnlockCoins(stageId) {
  return UNLOCK_COINS[stageId] || 0;
}

// 스테이지별 총 보상 코인
export function getStageTotalCoins(stageId) {
  const stage = stages.find(s => s.id === stageId);
  if (!stage) return 0;
  return stage.missions.reduce((sum, m) => sum + m.rewardCoins, 0);
}

// 미션 완료 후 다음 스테이지 해금 가능 여부 확인
export function checkNextStageUnlock(currentStageId, completedMissions, coins) {
  const nextStageId = currentStageId + 1;
  if (nextStageId > 8) return false;
  return isStageUnlocked(nextStageId, completedMissions, coins);
}
