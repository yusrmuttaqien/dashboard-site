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
  STORAGE_REGISTERED_USERNAME,
} from '@/constants/storages';

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

export function getSessionStorage(id) {
  return JSON.parse(sessionStorage.getItem(id));
}

export function updateSessionStorage(id, value) {
  sessionStorage.setItem(id, JSON.stringify(value));

  if (id === STORAGE_USERNAME) {
    const isExist = (getLocalStorage(STORAGE_REGISTERED_USERNAME) || [{ name: '' }])
      .map((user) => user.name)
      .includes(value);

    if (isExist) return;
    let newId = (getLocalStorage(STORAGE_REGISTERED_USERNAME) || [{ id: 0 }]).map(
      (user) => user.id
    );
    newId = newId[newId.length - 1] + 1;

    let registeredUsername = getLocalStorage(STORAGE_REGISTERED_USERNAME);
    if (!registeredUsername) registeredUsername = [];
    registeredUsername.push({
      id: newId,
      name: value,
      date_reg: new Date().toISOString(),
      img: null,
    });
    updateLocalStorage(STORAGE_REGISTERED_USERNAME, registeredUsername);
  }
}

export function removeSessionStorage(id) {
  if (id) {
    sessionStorage.removeItem(id);
  } else {
    sessionStorage.clear();
  }
}
