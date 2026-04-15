const STORAGE_KEY = 'pathcredit_activities';

export function loadActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveActivities(activities) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function clearActivities() {
  localStorage.removeItem(STORAGE_KEY);
}
