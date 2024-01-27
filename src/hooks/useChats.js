import { useEffect } from 'react';
import { useHookstate } from '@hookstate/core';
import useActivities from '@/hooks/useActivities';
import useUser from '@/hooks/useUser';
import UserPlaceholder from '@/assets/img/user-profile.png';
import { CHAT_STATE_PROVIDER } from '@/utils/states';
import { getLocalStorage, updateLocalStorage } from '@/utils/storages';
import { STORAGE_CHAT, STORAGE_REGISTERED_USERNAME } from '@/constants/storages';
import { CHAT_DELETED_USER } from '@/constants/hooks';

export function _defineAvailableChats(source, participant) {
  let availableChats = source.filter((conversation) =>
    conversation.participants.includes(participant)
  );
  availableChats = availableChats.map((conversation) => {
    let otherParticipantID = conversation.participants.filter((uid) => uid !== participant);
    let overview;

    if (otherParticipantID.length > 1) {
      // NOTE: Modify this branch if want work with group chat
      return;
    } else {
      let info = conversation.messages.length > 0;

      otherParticipantID = otherParticipantID[0];
      const otherParticipant = getLocalStorage(STORAGE_REGISTERED_USERNAME)[otherParticipantID] || {
        name: CHAT_DELETED_USER,
        img: UserPlaceholder,
      };

      if (!info) {
        overview = otherParticipant;
      } else {
        const isSelf =
          conversation.messages[conversation.messages.length - 1].uid === participant
            ? 'Me'
            : otherParticipant.name;
        info = `${isSelf}: ${conversation.messages[conversation.messages.length - 1].content}`;
        overview = {
          ...otherParticipant,
          info,
        };
      }
    }

    return { ...conversation, overview };
  });

  CHAT_STATE_PROVIDER.availableChats.set(availableChats);
}
export function _defineNewChat(chatState, id) {
  const registeredUsers = getLocalStorage(STORAGE_REGISTERED_USERNAME);
  const registeredUsersId = Object.keys(getLocalStorage(STORAGE_REGISTERED_USERNAME));
  let newUsers = chatState.availableChats.length;

  if (newUsers === 0) {
    newUsers = Object.values(registeredUsers).filter((user) => user.id !== id);
  } else {
    newUsers = chatState.availableChats.reduce((prev, curr) => {
      prev.push(...curr.participants.get());
      return prev;
    }, []);
    newUsers = registeredUsersId.filter((uid) => !newUsers.includes(parseInt(uid)));
    newUsers = newUsers.map((uid) => registeredUsers[uid]);
  }

  chatState.possibleNewUsers.set(newUsers);
}

export default function useChats() {
  const chatState = useHookstate(CHAT_STATE_PROVIDER);
  const { userAttributes, user } = useUser();
  const { addActivities } = useActivities();

  const _syncToLocalStorage = (id) => {
    const chatLocalStorage = getLocalStorage(STORAGE_CHAT) || [];
    const conversationIDs = chatLocalStorage.map((conversation) => conversation.id);
    let updatedConversation;

    if (id) {
      const conversationIdx = conversationIDs.indexOf(id);
      updatedConversation = [...chatLocalStorage];
      updatedConversation[conversationIdx] = chatState.availableChats
        .find((conversation) => conversation.id.get() === id)
        .get({ noproxy: true });
    } else {
      const conversationCount = chatState.availableChats.length;
      updatedConversation = chatState.availableChats[conversationCount - 1].get({ noproxy: true });
      updatedConversation = [...chatLocalStorage, updatedConversation];
    }

    updatedConversation = updatedConversation.map(({ overview: _, ...rest }) => rest);
    updateLocalStorage(STORAGE_CHAT, updatedConversation);
  };
  const _startChat = (uid) => {
    let newChatId = (getLocalStorage(STORAGE_CHAT) || [{ id: 0 }]).map((chat) => chat.id);
    newChatId = newChatId[newChatId.length - 1] + 1;

    const CONVERSATION_INSTANCE = {
      id: newChatId,
      participants: [user.id.get(), uid],
      lastUpdated: new Date().toISOString(),
      messages: [],
    };

    _defineAvailableChats(
      [...chatState.availableChats.get({ noproxy: true }), CONVERSATION_INSTANCE],
      user.id.get()
    );
    chatState.activeChatID.set(CONVERSATION_INSTANCE.id);
    _syncToLocalStorage();
    addActivities({
      title: `Started: Chat with ${userAttributes(uid).name}`,
      type: 'Chat',
    });
  };
  const _openChat = (id) => {
    chatState.activeChatID.set(id);
  };
  const _queryChat = () => {
    return (
      chatState.availableChats.find((chat) => chat.id.get() === chatState.activeChatID.get()) || {}
    );
  };
  const _sendChat = (message) => {
    const currentConversation = _queryChat();

    const CHAT_INSTANCE = {
      id: currentConversation.messages.length + 1,
      uid: user.id.get(),
      date: new Date().toISOString(),
      content: message,
    };

    currentConversation.lastUpdated.set(CHAT_INSTANCE.date);
    currentConversation.messages.merge([CHAT_INSTANCE]);
    _syncToLocalStorage(currentConversation.id.get());
    _defineAvailableChats(chatState.availableChats.get({ noproxy: true }), user.id.get());
    addActivities({
      title: `Sent: Chat to ${currentConversation.overview.get().name}`,
      type: 'Chat',
    });
  };
  const _getBubbleAttrs = (uid) => {
    const { img } = userAttributes(uid) || { img: UserPlaceholder };

    return { img: img, isSelf: uid === user.id.get() };
  };

  useEffect(() => {
    _defineNewChat(chatState, user.id.get());
  }, [chatState.availableChats, user.id.get()]);

  return {
    chats: chatState,
    startChat: _startChat,
    openChat: _openChat,
    lookChat: _queryChat(),
    sendChat: _sendChat,
    getBubbleAttrs: _getBubbleAttrs,
  };
}
