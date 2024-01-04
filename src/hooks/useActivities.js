import { useHookstate } from '@hookstate/core';
import { ACTIVITIES_STATE_PROVIDER } from '@/utils/states';
import { syncActivitiesLocalStorage } from '@/utils/storages';
import { ACTIVITIES_SORT_OPTIONS } from '@/constants/hooks';

export function _addActivities({ currentSort, activityState, title, type }) {
  if (currentSort === ACTIVITIES_SORT_OPTIONS.ASC) {
    activityState.activities.merge([{ title, type, date: new Date().toLocaleString() }]);
    return syncActivitiesLocalStorage();
  } else {
    let currentActivities = activityState.activities.get({ noproxy: true });
    currentActivities = [{ title, type, date: new Date().toLocaleString() }].concat(
      currentActivities
    );

    activityState.activities.set(currentActivities);
    return syncActivitiesLocalStorage();
  }
}

export default function useActivities() {
  const activityState = useHookstate(ACTIVITIES_STATE_PROVIDER);
  const currentSort = activityState.config.sort.get();
  const activityCount = activityState.activities.length;

  const _handleAdd = ({ title, type }) => {
    if (!title || !type) return;

    _addActivities({ currentSort, activityState, title, type });
  };
  const _handleSort = (sort) => () => {
    if (currentSort === sort) return;

    const activities = activityState.activities.get({ noproxy: true }).reverse();
    activityState.activities.set(activities);
    activityState.config.sort.set(sort);
    syncActivitiesLocalStorage();
  };
  const _handleClear = () => {
    activityState.activities.set([]);
    syncActivitiesLocalStorage();
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
