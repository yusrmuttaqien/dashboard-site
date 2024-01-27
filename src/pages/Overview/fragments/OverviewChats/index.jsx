import { useState, useEffect, useRef } from 'react';
import { none } from '@hookstate/core';
import Button from '@/components/Button';
import useChats from '@/hooks/useChats';
import useMediaQuery from '@/hooks/useMediaQuery';
import TextAreaInput from '@/components/TextAreaInput';
import UserList from '@/components/UserList';
import { MODAL_CHATBOX_TIPS, MODAL_NEW_CHAT, MODAL_NEW_CHAT_HELP } from '@/constants/modal';
import { CHAT_DELETED_USER } from '@/constants/hooks';
import { getScreen } from '@/styles';
import {
  Container,
  ListContainer,
  ConversationContainer,
  Heading,
  BubbleContainer,
  BoxContainer,
  Modal,
} from './styles';

export default function OverviewChats(props) {
  const { className } = props;

  return (
    <Container className={className}>
      <ChatList />
      <ChatConversation />
    </Container>
  );
}

function ChatList() {
  const [isNewChat, setIsNewChat] = useState(false);
  const { chats, openChat } = useChats();

  return (
    <ListContainer>
      <Heading>
        <h4 className="truncate" title="Chat Lists">
          Chat Lists
        </h4>
        <Button onClick={() => setIsNewChat(true)}>New Chat</Button>
      </Heading>
      <div className="item-container">
        {chats.availableChats.map(({ overview, id }) => (
          <UserList
            data-active={chats.activeChatID.get() === id.get()}
            className="custom-user-list"
            key={`available-chat-${overview.id.get()}`}
            content={overview.get()}
            onClick={() => openChat(id.get())}
          />
        ))}
        {chats.availableChats.length === 0 && <p className="empty-state">No recent chat yet!</p>}
      </div>
      <NewChat states={[isNewChat, setIsNewChat]} />
    </ListContainer>
  );
}

function ChatConversation() {
  const bubbleContainer = useRef(null);
  const [scrollBehaviour, setScrollBehaviour] = useState('instant');
  const [isTips, setIsTips] = useState(false);
  const { lookChat, chats, getBubbleAttrs } = useChats();
  const isTablet = useMediaQuery(`(min-width: ${getScreen('tablet-min')})`);
  const isOpenChat = chats.activeChatID.get();
  const title = isOpenChat && `Conversation with: ${lookChat.overview?.name.get()}`;

  function _defineWithImg(arr, currIdx) {
    const chatLength = arr.length;
    const isFirst = currIdx === 0;
    const isLast = currIdx === chatLength - 1;

    if ((isFirst && isLast) || isLast) return true;

    const currentChat = getBubbleAttrs(arr[currIdx].uid.get());
    const nextChat = getBubbleAttrs(arr[currIdx + 1].uid.get());

    return currentChat.isSelf === nextChat.isSelf ? false : true;
  }

  useEffect(() => {
    // NOTE: Using useState instead useRef because buggy scroll on mount at chromium browsers
    bubbleContainer.current.scrollTo({
      top: bubbleContainer.current.scrollHeight,
      behavior: scrollBehaviour,
    });

    if (scrollBehaviour === 'instant') setScrollBehaviour('smooth');
  }, [scrollBehaviour, lookChat.messages]);

  return (
    <ConversationContainer>
      <div className="bubbles-header">
        <h4 title={title}>{title}</h4>
        <Button onClick={() => setIsTips(true)}>ChatBox Tips</Button>
      </div>
      <div className="bubbles-container" ref={bubbleContainer}>
        {isOpenChat &&
          lookChat.messages.map((chat, idx, arr) => (
            <ChatBubble
              key={`chat-bubble-${chat.id.get()}-${chat.date.get()}`}
              showImg={_defineWithImg(arr, idx)}
              {...chat.get()}
              {...getBubbleAttrs(chat.uid.get())}
            />
          ))}
        {!isOpenChat && (
          <p className="empty-state">Select conversation from {isTablet ? 'aside' : 'atop'}.</p>
        )}
      </div>
      <ChatBox />
      <ChatBoxTips states={[isTips, setIsTips]} />
    </ConversationContainer>
  );
}

function ChatBubble({ img, content, isSelf, showImg }) {
  return (
    <BubbleContainer $isSelf={isSelf} $showImg={showImg}>
      <img src={img} alt={`${isSelf ? 'self' : 'opposite'} profile picture`} />
      <p className="bubble">{content}</p>
    </BubbleContainer>
  );
}

function ChatBox() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isReset, setIsReset] = useState(new Date());
  const reply = useRef('');
  const { sendChat, chats, openChat, lookChat } = useChats();
  const isReplyable =
    chats.availableChats
      .find(({ id }) => id.get() === chats.activeChatID.get())
      ?.overview.name.get() !== CHAT_DELETED_USER;

  function _handleDisabled(value) {
    reply.current = value;
    if (value === '') setIsEmpty(true);
    else setIsEmpty(false);
  }
  function _handleSend() {
    sendChat(reply.current);
    setIsReset(new Date());
  }
  function _handleEsc(e) {
    switch (e.key) {
      case 'Escape':
        return openChat(none);
      case 'Enter':
        if (e.shiftKey) return _handleSend();
      default:
        return;
    }
  }

  return (
    <BoxContainer>
      <TextAreaInput
        id="chat-reply"
        className="custom-text-area"
        placeholder="Type a message..."
        onChange={_handleDisabled}
        disabled={!chats.activeChatID.get() || !isReplyable}
        onKeyUp={_handleEsc}
        reset={isReset}
      />
      <Button disabled={isEmpty} onClick={_handleSend}>
        Send
      </Button>
    </BoxContainer>
  );
}

function NewChat({ states }) {
  const [isNewChat, setIsNewChat] = states;
  const [isHelper, setIsHelper] = useState(false);
  const { chats, startChat } = useChats();

  const _handleStartChat = (id) => () => {
    startChat(id);
    setIsNewChat(false);
  };

  return (
    <Modal id={MODAL_NEW_CHAT} isOpen={isNewChat} onClose={() => setIsNewChat(false)}>
      <header>
        <h3>New Chat</h3>
        <Button onClick={() => setIsHelper(true)}>Help</Button>
      </header>
      <div className="users-container">
        {chats.possibleNewUsers.map((user) => (
          <UserList
            key={`new-user-${user.id.get()}`}
            content={user.get()}
            onClick={_handleStartChat(user.id.get())}
          />
        ))}
        {chats.possibleNewUsers.length === 0 && (
          <p className="empty-state">No new user yet! See help to know how add user.</p>
        )}
      </div>
      <NewChatHelper states={[isHelper, setIsHelper]} />
    </Modal>
  );
}

function NewChatHelper({ states }) {
  const [isHelper, setIsHelper] = states;

  return (
    <Modal id={MODAL_NEW_CHAT_HELP} isOpen={isHelper} onClose={() => setIsHelper(false)}>
      <h3>Add new user(s)</h3>
      <p className="guide">
        <span>
          To add new user, you can open this site in new tab but on the same browser and log in with
          different username. New user will appear in the popup behind.
        </span>
        <span>(If you do duplicate tab, make sure you properly logged out on the new tab)</span>
        <span>
          (This app is utilizing SessionStorage and LocalStorage for its login session and
          databases, <strong>security is not the main concern here</strong>)
        </span>
      </p>
    </Modal>
  );
}

function ChatBoxTips({ states }) {
  const [isTips, setIsTips] = states;

  return (
    <Modal id={MODAL_CHATBOX_TIPS} isOpen={isTips} onClose={() => setIsTips(false)}>
      <h3>ChatBox Tips!</h3>
      <p className="guide">
        <span>
          You can immidiate send chat by pressing <span className="bq">Shift + Enter</span>
        </span>
        <span>
          <span className="bq">Enter</span> is by default reserved for multiline chat
        </span>
        <span>
          When ChatBox is in focus, you can close current conversaton by pressing{' '}
          <span className="bq">Esc</span>
        </span>
      </p>
    </Modal>
  );
}
