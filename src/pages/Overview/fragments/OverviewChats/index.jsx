import { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import useChats from '@/hooks/useChats';
import UserPlaceholder from '@/assets/img/user-profile.png';
import TextAreaInput from '@/components/TextAreaInput';
import UserList from '@/components/UserList';
import { MODAL_NEW_CHAT, MODAL_NEW_CHAT_HELP } from '@/constants/modal';
import {
  Container,
  ListContainer,
  ConversationContainer,
  Heading,
  BubbleContainer,
  BoxContainer,
  Modal,
} from './styles';

const DUMMY_CHAT_LIST = [
  {
    id: '1',
    img: UserPlaceholder,
    name: 'Fernando',
    info: 'Fernando: Hello there, how are you?',
  },
  {
    id: '2',
    img: UserPlaceholder,
    name: 'Roberto',
    info: "Me: Hey, what's up?",
  },
];

const DUMMY_CHAT_CONVERSATION = [
  {
    id: '1',
    isSelf: false,
    content: 'Hello there, how are you?',
    img: UserPlaceholder,
    date: '2024-01-03T17:20:31.429Z',
  },
  {
    id: '3',
    isSelf: true,
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: UserPlaceholder,
    date: '2024-01-03T17:20:32.627Z',
  },
  {
    id: '4',
    isSelf: true,
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: UserPlaceholder,
    date: '2024-01-03T17:20:32.627Z',
  },
  {
    id: '5',
    isSelf: true,
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: UserPlaceholder,
    date: '2024-01-03T17:20:32.627Z',
  },
];

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

  return (
    <ListContainer>
      <Heading>
        <h4 className="truncate" title="Chat Lists (UI Preview)">
          Chat Lists (UI Preview)
        </h4>
        <Button onClick={() => setIsNewChat(true)}>New Chat</Button>
      </Heading>
      <div className="item-container">
        {DUMMY_CHAT_LIST.map((chat) => (
          <UserList key={chat.id} content={chat} onClick={() => {}} />
        ))}
        {DUMMY_CHAT_LIST.length === 0 && <p className="empty-state">No recent chat yet!</p>}
      </div>
      <NewChat states={[isNewChat, setIsNewChat]} />
    </ListContainer>
  );
}

function ChatConversation() {
  const bubbleContainer = useRef(null);
  const [scrollBehaviour, setScrollBehaviour] = useState('instant');

  function _defineWithImg(arr, currIdx) {
    const chatLength = arr.length;
    const currentChat = arr[currIdx];
    const isFirst = currIdx === 0;
    const isLast = currIdx === chatLength - 1;

    if ((isFirst && isLast) || isLast) return true;

    const nextChat = arr[currIdx + 1];
    return currentChat.isSelf === nextChat.isSelf ? false : true;
  }

  useEffect(() => {
    // NOTE: Using useState instead useRef because buggy scroll on mount at chromium browsers
    bubbleContainer.current.scrollTo({
      top: bubbleContainer.current.scrollHeight,
      behavior: scrollBehaviour,
    });

    if (scrollBehaviour === 'instant') setScrollBehaviour('smooth');
  }, [scrollBehaviour]);

  return (
    <ConversationContainer>
      <h4 title="Fernando (UI Preview)">Fernando (UI Preview)</h4>
      <div className="bubbles-container" ref={bubbleContainer}>
        {DUMMY_CHAT_CONVERSATION.map((chat, idx, arr) => (
          <ChatBubble
            key={`${chat.id}-${chat.date}`}
            showImg={_defineWithImg(arr, idx)}
            {...chat}
          />
        ))}
      </div>
      <ChatBox />
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

  function _handleDisabled(value) {
    if (value === '') setIsEmpty(true);
    else setIsEmpty(false);
  }

  return (
    <BoxContainer>
      <TextAreaInput
        className="custom-text-area"
        placeholder="Type a message..."
        onChange={_handleDisabled}
      />
      <Button disabled={isEmpty}>Send</Button>
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
        {chats.possibleNewUsers.map((chat) => (
          <UserList
            key={chat.id.get()}
            content={chat.get()}
            onClick={_handleStartChat(chat.id.get())}
          />
        ))}
        {chats.possibleNewUsers.length === 0 && (
          <p className="empty-state">No user yet! See help to add user.</p>
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
          To add new user, you can open this site in new tab and log in with different username. New
          user will appear in popup behind.
        </span>
        <span>(If you do duplicate tab, simply logout on one of the tabs)</span>
      </p>
    </Modal>
  );
}
