import { hookstate } from '@hookstate/core';
import { DEFAULT_STATE_TODO } from '@/constants/states';

export const TODO_STATE_PROVIDER = hookstate(DEFAULT_STATE_TODO);
