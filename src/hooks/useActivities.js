import { useHookstate } from '@hookstate/core';
import useUser, { _defineUserAttribute } from '@/hooks/useUser';
import { ACTIVITIES_STATE_PROVIDER } from '@/utils/states';
import { updateLocalStorage, getLocalStorage } from '@/utils/storages';
import { ACTIVITIES_SORT_OPTIONS } from '@/constants/hooks';
import { STORAGE_ACTIVITY } from '@/constants/storages';

export function _syncActivitiesLocalStorage() {
  const currentActivities = ACTIVITIES_STATE_PROVIDER.get({ noproxy: true });
  const activitiesLocalStorage = getLocalStorage(STORAGE_ACTIVITY);
  const { id } = _defineUserAttribute() || {};

  updateLocalStorage(STORAGE_ACTIVITY, { ...activitiesLocalStorage, [id]: currentActivities });
}

export function _addActivities({ currentSort, activityState, title, type }) {
  if (currentSort === ACTIVITIES_SORT_OPTIONS.ASC) {
    activityState.activities.merge([{ title, type, date: new Date().toLocaleString() }]);
    return _syncActivitiesLocalStorage();
  } else {
    let currentActivities = activityState.activities.get({ noproxy: true });
    currentActivities = [{ title, type, date: new Date().toLocaleString() }].concat(
      currentActivities
    );

    activityState.activities.set(currentActivities);
    return _syncActivitiesLocalStorage();
  }
}

export default function useActivities() {
  const { user } = useUser();
  const activityState = useHookstate(ACTIVITIES_STATE_PROVIDER);
  const currentSort = activityState.config.sort.get();
  const activityCount = activityState.activities.length;

  const _syncToLocalStorage = () => {
    const activityLocalStorage = getLocalStorage(STORAGE_ACTIVITY);

    updateLocalStorage(STORAGE_ACTIVITY, {
      ...activityLocalStorage,
      [user.id.get()]: activityState.get({ noproxy: true }),
    });
  };
  const _handleAdd = ({ title, type }) => {
    if (!title || !type) return;

    _addActivities({ currentSort, activityState, title, type });
  };
  const _handleSort = (sort) => () => {
    if (currentSort === sort) return;

    const activities = activityState.activities.get({ noproxy: true }).reverse();
    activityState.activities.set(activities);
    activityState.config.sort.set(sort);
    _syncToLocalStorage();
  };
  const _handleClear = () => {
    activityState.activities.set([]);
    _syncToLocalStorage();
  };

  return {
    addActivities: _handleAdd,
    SORT_OPTIONS: ACTIVITIES_SORT_OPTIONS,
    sortActivities: _handleSort,
    activityCount,
    clearActivities: _handleClear,
    currentSort,
    activities: activityState.activities,
  };
}
