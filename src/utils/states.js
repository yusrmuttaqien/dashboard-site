import { hookstate } from '@hookstate/core';
import {
  STATE_DEFAULT_TODO,
  STATE_DEFAULT_ACTIVITIES,
  STATE_DEFAULT_CARD,
} from '@/constants/states';

export const TODO_STATE_PROVIDER = hookstate(STATE_DEFAULT_TODO);
export const MDOAL_STACK_STATE_PROVIDER = hookstate([]);
export const ACTIVITIES_STATE_PROVIDER = hookstate(STATE_DEFAULT_ACTIVITIES);
export const CARD_STATE_PROVIDER = hookstate(STATE_DEFAULT_CARD);
