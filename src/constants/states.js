import { ACTIVITIES_SORT_OPTIONS } from '@/constants/hooks';

export const CARBON_STATE_DEFAULT_TODO = () => [
  { title: 'Buy milk', done: true, date: new Date() },
  {
    title: 'Go back home',
    done: false,
    date: new Date(),
  },
  { title: 'Eat cereals', done: false, date: new Date() },
];

export const CARBON_STATE_DEFAULT_ACTIVITIES = () => ({
  config: {
    sort: ACTIVITIES_SORT_OPTIONS.DESC,
  },
  activities: [],
});

export const CARBON_STATE_DEFAULT_CARD = (name = '') => ({
  id: '08224549',
  name,
  date: '12/23',
});

export const CARBON_STATE_DEFAULT_CHAT = () => ({
  activeChatID: null,
  activeChat: [],
  availableChats: [],
  possibleNewUsers: [],
});

export const STATE_DEFAULT_TODO = [...CARBON_STATE_DEFAULT_TODO()];
export const STATE_DEFAULT_ACTIVITIES = { ...CARBON_STATE_DEFAULT_ACTIVITIES() };
export const STATE_DEFAULT_CARD = { ...CARBON_STATE_DEFAULT_CARD() };
export const STATE_DEFAULT_CHAT = { ...CARBON_STATE_DEFAULT_CHAT() };
