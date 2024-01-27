import {
  CARD_STATE_PROVIDER,
  TODO_STATE_PROVIDER,
  ACTIVITIES_STATE_PROVIDER,
} from '@/utils/states';
import {
  STORAGE_CARD,
  STORAGE_ID,
  STORAGE_TODO,
  STORAGE_ACTIVITY,
  STORAGE_REGISTERED_USERNAME,
} from '@/constants/storages';
import { CARBON_STATE_DEFAULT_ACTIVE_USERNAME } from '@/constants/states';

export function getLocalStorage(id) {
  return JSON.parse(localStorage.getItem(id));
}

export function updateLocalStorage(id, value) {
  localStorage.setItem(id, JSON.stringify(value));
}

function setSessionStorage(id, value) {
  sessionStorage.setItem(id, JSON.stringify(value));
}

export function removeLocalStorage(id) {
  if (id) {
    localStorage.removeItem(id);
  } else {
    localStorage.clear();
  }
}

export function getSessionStorage(id) {
  return JSON.parse(sessionStorage.getItem(id));
}

function _defineNewUser(name) {
  let newId = Object.keys(getLocalStorage(STORAGE_REGISTERED_USERNAME) || { 0: 0 }).map((id) =>
    parseInt(id)
  );
  newId = Math.max(...newId) + 1;

  let registeredUsername = getLocalStorage(STORAGE_REGISTERED_USERNAME);
  if (!registeredUsername) registeredUsername = {};
  registeredUsername[newId] = CARBON_STATE_DEFAULT_ACTIVE_USERNAME({
    id: newId,
    name: name,
    date: new Date().toISOString(),
    img: null,
  });
  updateLocalStorage(STORAGE_REGISTERED_USERNAME, registeredUsername);
  setSessionStorage(STORAGE_ID, newId);
}

export function updateSessionStorage(id, value) {
  switch (id) {
    case STORAGE_ID:
      const users = Object.values(
        getLocalStorage(STORAGE_REGISTERED_USERNAME) || { 0: { name: '' } }
      );

      if (users.map((user) => user.name).includes(value)) {
        const loggingId = users.reduce((str, curr) => (curr.name === value ? curr.id : str), 0);
        setSessionStorage(STORAGE_ID, loggingId);
        break;
      }

      _defineNewUser(value);
      break;
    default:
      break;
  }
}

export function removeSessionStorage(id) {
  if (id) {
    sessionStorage.removeItem(id);
  } else {
    sessionStorage.clear();
  }
}
