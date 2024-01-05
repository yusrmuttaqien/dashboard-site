import { useEffect } from 'react';
import { useHookstate, none } from '@hookstate/core';
import useActivities from '@/hooks/useActivities';
import useUser from '@/hooks/useUser';
import { CHAT_STATE_PROVIDER } from '@/utils/states';
import { getLocalStorage, updateLocalStorage } from '@/utils/storages';
import { STORAGE_CHAT, STORAGE_REGISTERED_USERNAME } from '@/constants/storages';

const chats = [
  {
    id: 1,
    participants: [1, 2],
    isActive: true,
    lastUpdated: '2024-01-03T17:20:32.627Z',
    messages: [
      {
        id: '1',
        isSelf: false,
        date: '2024-01-03T17:20:31.429Z',
        content: 'Hello there, how are you?',
        // img: UserPlaceholder,
      },
      {
        id: '3',
        isSelf: true,
        date: '2024-01-03T17:20:32.627Z',
        content:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        // img: UserPlaceholder,
      },
    ],
  },
];

export function _defineActiveChat(source, id) {}

export function _defineAvailableChats(source, participant) {
  let availableChats = source.filter((chat) => chat.participants.includes(participant));

  CHAT_STATE_PROVIDER.availableChats.set(availableChats);
}
export function _defineNewChat(chatState, id) {
  const registeredUsers = getLocalStorage(STORAGE_REGISTERED_USERNAME);
  const registeredUsersID = getLocalStorage(STORAGE_REGISTERED_USERNAME).map((user) => user.id);
  let newUsers = chatState.availableChats.length;

  if (newUsers === 0) {
    newUsers = registeredUsers.filter((user) => user.id !== id);
  } else {
    newUsers = chatState.availableChats.reduce((prev, curr) => {
      prev.push(...curr.participants.get());
      return prev;
    }, []);
    newUsers = newUsers.filter((uid) => !registeredUsersID.includes(uid));
    newUsers = newUsers.map((uid) => registeredUsers.find((user) => user.id === uid));
  }

  chatState.possibleNewUsers.set(newUsers);
}

export default function useChats() {
  const chatState = useHookstate(CHAT_STATE_PROVIDER);
  const chatLocalStorage = getLocalStorage(STORAGE_CHAT);
  const { id } = useUser();
  const { addActivities } = useActivities();

  const _syncToLocalStorage = () => {
    updateLocalStorage(STORAGE_CHAT, {
      ...chatLocalStorage,
      [id]: chatState.get({ noproxy: true }),
    });
  };
  const _startChat = (id) => {};

  useEffect(() => {
    _defineNewChat(chatState, id);
  }, [chatState.availableChats, id]);

  return { chats: chatState, startChat: _startChat };
}
