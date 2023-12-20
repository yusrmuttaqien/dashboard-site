import {
  CARD_STATE_PROVIDER,
  TODO_STATE_PROVIDER,
  ACTIVITIES_STATE_PROVIDER,
} from '@/utils/states';
import {
  STORAGE_CARD,
  STORAGE_USERNAME,
  STORAGE_TODO,
  STORAGE_ACTIVITY,
} from '@/constants/localStorage';

export function getLocalStorage(id) {
  return JSON.parse(localStorage.getItem(id));
}

export function updateLocalStorage(id, value) {
  localStorage.setItem(id, JSON.stringify(value));
}

export function removeLocalStorage(id) {
  if (id) {
    localStorage.removeItem(id);
  } else {
    localStorage.clear();
  }
}

export function syncCardLocalStorage() {
  const currentCard = CARD_STATE_PROVIDER.get({ noproxy: true });
  const cardLocalStorage = getLocalStorage(STORAGE_CARD);
  const username = getLocalStorage(STORAGE_USERNAME);

  updateLocalStorage(STORAGE_CARD, { ...cardLocalStorage, [username]: currentCard });
}

export function syncToDoLocalStorage() {
  const currentTodo = TODO_STATE_PROVIDER.get({ noproxy: true });
  const todoLocalStorage = getLocalStorage(STORAGE_TODO);
  const username = getLocalStorage(STORAGE_USERNAME);

  updateLocalStorage(STORAGE_TODO, { ...todoLocalStorage, [username]: currentTodo });
}

export function syncActivitiesLocalStorage() {
  const currentActivities = ACTIVITIES_STATE_PROVIDER.get({ noproxy: true });
  const activitiesLocalStorage = getLocalStorage(STORAGE_ACTIVITY);
  const username = getLocalStorage(STORAGE_USERNAME);

  updateLocalStorage(STORAGE_ACTIVITY, {
    ...activitiesLocalStorage,
    [username]: currentActivities,
  });
}
