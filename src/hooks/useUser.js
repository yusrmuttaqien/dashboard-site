import { redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getLocalStorage,
  getSessionStorage,
  removeSessionStorage,
  updateSessionStorage,
} from '@/utils/storages';
import UserPlaceholder from '@/assets/img/user-profile.png';
import { STORAGE_USERNAME, STORAGE_REGISTERED_USERNAME } from '@/constants/storages';
import { hydrateStates, resetStates } from '@/utils/states';

export function _initiateLogin(username) {
  updateSessionStorage(STORAGE_USERNAME, username);
  hydrateStates(true);
  return redirect('/');
}

export function _initiateLogout(cb) {
  removeSessionStorage(STORAGE_USERNAME);
  resetStates();
  cb?.();
}

export function _defineLoginStatus() {
  return getSessionStorage(STORAGE_USERNAME);
}

export function _defineUserAttribute(id) {
  const activeUser = getSessionStorage(STORAGE_USERNAME);

  return getLocalStorage(STORAGE_REGISTERED_USERNAME).find((user) =>
    id ? user.id === id : user.name === activeUser
  );
}

export default function useUser() {
  const [userData, setUserData] = useState({ name: null, id: 0, date: null, img: null });

  function _initUserData() {
    const { id, date_reg, img, name } = _defineUserAttribute() || {};

    setUserData({ name, id, date: date_reg, img: img || UserPlaceholder });
  }

  useEffect(() => {
    _initUserData();

    function _handleStorageListener(e) {
      e.key === STORAGE_REGISTERED_USERNAME && _initUserData();
    }

    window.addEventListener('storage', _handleStorageListener);

    return () => window.removeEventListener('storage', _handleStorageListener);
  }, []);

  return { ...userData, userAttributes: _defineUserAttribute };
}
