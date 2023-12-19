import { hookstate } from '@hookstate/core';
import { STATE_DEFAULT_TODO } from '@/constants/states';

export const TODO_STATE_PROVIDER = hookstate(STATE_DEFAULT_TODO);
export const MDOAL_STACK_STATE_PROVIDER = hookstate([]);
