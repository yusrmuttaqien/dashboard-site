import { useHookstate } from '@hookstate/core';
import { redirect, useNavigate } from 'react-router-dom';
import { _addActivities } from '@/hooks/useActivities';
import {
  getLocalStorage,
  getSessionStorage,
  removeSessionStorage,
  updateLocalStorage,
  updateSessionStorage,
} from '@/utils/storages';
import {
  STORAGE_ID,
  STORAGE_REGISTERED_USERNAME,
  STORAGE_ACTIVE_USERNAME,
  STORAGE_TODO,
  STORAGE_CARD,
  STORAGE_ACTIVITY,
} from '@/constants/storages';
import {
  hydrateStates,
  resetStates,
  ACTIVE_USERNAME_STATE_PROVIDER,
  ACTIVITIES_STATE_PROVIDER,
} from '@/utils/states';

export function _initiateLogin(username) {
  updateSessionStorage(STORAGE_ID, username);
  hydrateStates(true);
  return redirect('/');
}

export function _initiateLogout(cb) {
  removeSessionStorage(STORAGE_ID);
  resetStates();
  cb?.();
}

export function _defineLoginStatus() {
  return getSessionStorage(STORAGE_ID);
}

export function _defineUserAttribute(id) {
  const activeUser = getSessionStorage(STORAGE_ID);
  const regUsrLocalStorage = getLocalStorage(STORAGE_REGISTERED_USERNAME);

  return regUsrLocalStorage[id || activeUser];
}

export default function useUser() {
  const navigate = useNavigate();
  const activeUserState = useHookstate(ACTIVE_USERNAME_STATE_PROVIDER);
  const activityState = useHookstate(ACTIVITIES_STATE_PROVIDER);
  const currentSort = activityState.config.sort.get();

  function _syncToLocalStorage() {
    const regUsrLocalStorage = getLocalStorage(STORAGE_REGISTERED_USERNAME);

    updateLocalStorage(STORAGE_REGISTERED_USERNAME, {
      ...regUsrLocalStorage,
      [activeUserState.id.get()]: activeUserState.get({ noproxy: true }),
    });
  }
  function _handleChangeName(name) {
    const prevName = activeUserState.name.get();

    activeUserState.name.set(name);
    _syncToLocalStorage();
    _addActivities({
      currentSort,
      activityState,
      title: `Changed: Name from ${prevName} to ${name}`,
      type: 'Account',
    });
  }
  function _handleChangePicture(picture) {
    activeUserState.img.set(picture);
    _syncToLocalStorage();
    _addActivities({
      currentSort,
      activityState,
      title: `Changed: Profile picture`,
      type: 'Account',
    });
  }
  function _deleteAccount() {
    const regUsrLocalStorage = getLocalStorage(STORAGE_REGISTERED_USERNAME);
    const toDoLocalStorage = getLocalStorage(STORAGE_TODO);
    const cardLocalStorage = getLocalStorage(STORAGE_CARD);
    const activityLocalStorage = getLocalStorage(STORAGE_ACTIVITY);
    const currentId = activeUserState.id.get();

    _initiateLogout();
    navigate('/login');

    regUsrLocalStorage && delete regUsrLocalStorage[currentId];
    toDoLocalStorage && delete toDoLocalStorage[currentId];
    cardLocalStorage && delete cardLocalStorage[currentId];
    activityLocalStorage && delete activityLocalStorage[currentId];
    updateLocalStorage(STORAGE_REGISTERED_USERNAME, regUsrLocalStorage);
    updateLocalStorage(STORAGE_TODO, toDoLocalStorage);
    updateLocalStorage(STORAGE_CARD, cardLocalStorage);
    updateLocalStorage(STORAGE_ACTIVITY, activityLocalStorage);
  }

  return {
    user: activeUserState,
    userAttributes: _defineUserAttribute,
    changeName: _handleChangeName,
    changePicture: _handleChangePicture,
    deleteAccount: _deleteAccount,
    isLoggedIn: !!_defineLoginStatus(),
  };
}
