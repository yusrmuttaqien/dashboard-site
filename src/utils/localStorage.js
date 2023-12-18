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
