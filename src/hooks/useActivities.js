import { useHookstate } from '@hookstate/core';
import { ACTIVITIES_STATE_PROVIDER } from '@/utils/states';
import { syncActivitiesLocalStorage } from '@/utils/localStorage';
import { SORT_OPTIONS } from '@/pages/Overview/fragments/OverviewActivity';

export function _addActivities({ currentSort, activityState, title, type }) {
  if (currentSort === SORT_OPTIONS.ASC) {
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

  const _handleAdd = ({ title, type }) => {
    if (!title || !type) return;

    _addActivities({ currentSort, activityState, title, type });
  };

  return { addActivities: _handleAdd };
}
