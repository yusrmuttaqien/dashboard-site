import { SORT_OPTIONS } from '@/pages/Overview/fragments/OverviewActivity';

export const STATE_DEFAULT_TODO = [
  { title: 'Buy milk', done: true, date: new Date() },
  {
    title: 'Go back home, nono dont go home aowkaok',
    done: false,
    date: new Date(),
  },
  { title: 'Eat cereals', done: false, date: new Date() },
];

export const STATE_DEFAULT_ACTIVITIES = {
  config: {
    sort: SORT_OPTIONS.DESC,
  },
  activities: [],
};
