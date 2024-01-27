import { hookstate } from '@hookstate/core';
import { _syncCardLocalStorage } from '@/hooks/useVisa';
import { getLocalStorage, getSessionStorage } from '@/utils/storages';
import { _addActivities } from '@/hooks/useActivities';
import { _resetLogout } from '@/hooks/useStorage';
import { _defineUserAttribute } from '@/hooks/useUser';
import { _defineAvailableChats, _defineNewChat } from '@/hooks/useChats';
import {
  STORAGE_ACTIVITY,
  STORAGE_CARD,
  STORAGE_TODO,
  STORAGE_REGISTERED_USERNAME,
  STORAGE_CHAT,
  STORAGE_ACTIVE_USERNAME,
} from '@/constants/storages';
import {
  STATE_DEFAULT_TODO,
  STATE_DEFAULT_ACTIVITIES,
  STATE_DEFAULT_CARD,
  STATE_DEFAULT_CHAT,
  STATE_DEFAULT_ACTIVE_USERNAME,
  CARBON_STATE_DEFAULT_ACTIVITIES,
  CARBON_STATE_DEFAULT_CARD,
  CARBON_STATE_DEFAULT_TODO,
  CARBON_STATE_DEFAULT_CHAT,
  CARBON_STATE_DEFAULT_ACTIVE_USERNAME,
} from '@/constants/states';

export const TODO_STATE_PROVIDER = hookstate(STATE_DEFAULT_TODO);
export const MDOAL_STACK_STATE_PROVIDER = hookstate([]);
export const ACTIVITIES_STATE_PROVIDER = hookstate(STATE_DEFAULT_ACTIVITIES);
export const CARD_STATE_PROVIDER = hookstate(STATE_DEFAULT_CARD);
export const CHAT_STATE_PROVIDER = hookstate(STATE_DEFAULT_CHAT);
export const ACTIVE_USERNAME_STATE_PROVIDER = hookstate(STATE_DEFAULT_ACTIVE_USERNAME);

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
  CHAT_STATE_PROVIDER.set(CARBON_STATE_DEFAULT_CHAT());
  ACTIVE_USERNAME_STATE_PROVIDER.set(CARBON_STATE_DEFAULT_ACTIVE_USERNAME());
}
export function hydrateStates(initial, withListener, listenerEvent) {
  const { id, name, ...restUserAttrs } = _defineUserAttribute() || {};
  const activities = getLocalStorage(STORAGE_ACTIVITY) || {};
  const card = getLocalStorage(STORAGE_CARD) || {};
  const todo = getLocalStorage(STORAGE_TODO) || {};
  const chat = getLocalStorage(STORAGE_CHAT) || [];

  ACTIVE_USERNAME_STATE_PROVIDER.set({ name, id, ...restUserAttrs });

  if (activities[id]) {
    ACTIVITIES_STATE_PROVIDER.set(activities[id]);
  }
  if (todo[id]) {
    TODO_STATE_PROVIDER.set(todo[id]);
  }
  if (chat.length !== 0) {
    _defineAvailableChats(chat, id);
  }
  if (listenerEvent?.key === STORAGE_REGISTERED_USERNAME) {
    _defineNewChat(CHAT_STATE_PROVIDER, id);
  }
  if (card[id]) {
    CARD_STATE_PROVIDER.set(card[id]);
  }

  initial && activitiesIntercept();

  if (withListener) {
    function _handleStorageListener(e) {
      hydrateStates(false, false, e);
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
