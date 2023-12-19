import { useHookstate } from '@hookstate/core';
import { ACTIVITIES_STATE_PROVIDER } from '@/utils/states';
import { SORT_OPTIONS } from '@/pages/Home/fragments/OverviewActivity';

export default function useActivities() {
  const activityState = useHookstate(ACTIVITIES_STATE_PROVIDER);
  const currentSort = activityState.config.sort.get();

  const _handleAdd = ({ title, type }) => {
    if (!title || !type) return;

    if (currentSort === SORT_OPTIONS.ASC) {
      return activityState.activities.merge([{ title, type, date: new Date().toLocaleString() }]);
    } else {
      let currentActivities = activityState.activities.get({ noproxy: true });
      currentActivities = [{ title, type, date: new Date().toLocaleString() }].concat(
        currentActivities
      );
      return activityState.activities.set(currentActivities);
    }
  };

  return { addActivities: _handleAdd };
}
