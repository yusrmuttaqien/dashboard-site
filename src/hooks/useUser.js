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

export function _initiateLogout() {
  removeSessionStorage(STORAGE_USERNAME);
  resetStates();
}

export function _defineLoginStatus() {
  return getSessionStorage(STORAGE_USERNAME);
}

export default function useUser() {
  const activeUser = getSessionStorage(STORAGE_USERNAME);
  const [userData, setUserData] = useState({ name: null, id: 0, date: null, img: null });

  function _initUserData() {
    const { id, date_reg, img } = getLocalStorage(STORAGE_REGISTERED_USERNAME).find(
      (user) => user.name === activeUser
    );

    setUserData({ name: activeUser, id, date: date_reg, img: img || UserPlaceholder });
  }

  useEffect(() => {
    _initUserData();
    // TODO: Add storage event listener
  }, []);

  return userData;
}
