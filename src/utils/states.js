import { hookstate } from '@hookstate/core';
import { _syncCardLocalStorage } from '@/hooks/useVisa';
import { getLocalStorage, getSessionStorage } from '@/utils/storages';
import { _addActivities } from '@/hooks/useActivities';
import { _resetLogout } from '@/hooks/useStorage';
import { _defineUserAttribute } from '@/hooks/useUser';
import {
  STORAGE_USERNAME,
  STORAGE_ACTIVITY,
  STORAGE_CARD,
  STORAGE_TODO,
  STORAGE_REGISTERED_USERNAME,
} from '@/constants/storages';
import {
  STATE_DEFAULT_TODO,
  STATE_DEFAULT_ACTIVITIES,
  STATE_DEFAULT_CARD,
  CARBON_STATE_DEFAULT_ACTIVITIES,
  CARBON_STATE_DEFAULT_CARD,
  CARBON_STATE_DEFAULT_TODO,
} from '@/constants/states';

export const TODO_STATE_PROVIDER = hookstate(STATE_DEFAULT_TODO);
export const MDOAL_STACK_STATE_PROVIDER = hookstate([]);
export const ACTIVITIES_STATE_PROVIDER = hookstate(STATE_DEFAULT_ACTIVITIES);
export const CARD_STATE_PROVIDER = hookstate(STATE_DEFAULT_CARD);

function activitiesIntercept() {
  const currentSort = ACTIVITIES_STATE_PROVIDER.config.sort.get();

  _addActivities({
    currentSort,
    activityState: ACTIVITIES_STATE_PROVIDER,
    title: 'Identified: Logging in',
    type: 'Auth',
  });
}
export function resetStates() {
  TODO_STATE_PROVIDER.set(CARBON_STATE_DEFAULT_TODO());
  ACTIVITIES_STATE_PROVIDER.set(CARBON_STATE_DEFAULT_ACTIVITIES());
  CARD_STATE_PROVIDER.set(CARBON_STATE_DEFAULT_CARD());
}
export function hydrateStates(initial, withListener) {
  const { id, name } = _defineUserAttribute() || {};
  const username = getSessionStorage(STORAGE_USERNAME);
  const activities = getLocalStorage(STORAGE_ACTIVITY) || {};
  const card = getLocalStorage(STORAGE_CARD) || {};
  const todo = getLocalStorage(STORAGE_TODO) || {};

  if (activities[id]) {
    ACTIVITIES_STATE_PROVIDER.set(activities[id]);
  }

  if (card[id]) {
    CARD_STATE_PROVIDER.set(card[id]);
  } else {
    CARD_STATE_PROVIDER.set({ ...CARBON_STATE_DEFAULT_CARD(name) });
    _syncCardLocalStorage();
  }

  if (todo[id]) {
    TODO_STATE_PROVIDER.set(todo[id]);
  }

  initial && activitiesIntercept();

  if (withListener) {
    function _handleStorageListener() {
      hydrateStates();
    }
    function _handleFocusListener() {
      const registeredUsers = getLocalStorage(STORAGE_REGISTERED_USERNAME);

      // NOTE: if user deletion feature is available, add new checking case when user is deleted
      if (!registeredUsers) {
        _resetLogout();
        window.location.href = '/login';
      }
    }

    window.addEventListener('storage', _handleStorageListener);
    window.addEventListener('focus', _handleFocusListener);

    return () => {
      window.removeEventListener('storage', _handleStorageListener);
      window.removeEventListener('focus', _handleFocusListener);
    };
  }
}
