import { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import UserPlaceholder from 'assets/img/user.png';
import TextAreaInput from '@/components/TextAreaInput';
import UserList from '@/components/UserList';
import {
  Container,
  ListContainer,
  ConversationContainer,
  Heading,
  BubbleContainer,
  BoxContainer,
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
    id: '2',
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
  return (
    <ListContainer>
      <Heading>
        <h4 className="truncate" title="Chat Lists (UI Preview)">
          Chat Lists (UI Preview)
        </h4>
        <Button>New Chat</Button>
      </Heading>
      <div className="item-container">
        {DUMMY_CHAT_LIST.map((chat) => (
          <UserList key={chat.id} content={chat} onClick={() => {}} />
        ))}

        {DUMMY_CHAT_LIST.length === 0 && <p className="empty-state">No recent chat yet!</p>}
      </div>
    </ListContainer>
  );
}

function ChatConversation() {
  const scrollPitStop = useRef(null);
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
    scrollPitStop.current.scrollIntoView({ behavior: scrollBehaviour });

    if (scrollBehaviour === 'instant') setScrollBehaviour('smooth');
  }, [scrollBehaviour]);

  return (
    <ConversationContainer>
      <h4 title="Fernando (UI Preview)">Fernando (UI Preview)</h4>
      <div className="bubbles-container">
        {DUMMY_CHAT_CONVERSATION.map((chat, idx, arr) => (
          <ChatBubble
            key={`${chat.id}-${chat.date}`}
            showImg={_defineWithImg(arr, idx)}
            {...chat}
          />
        ))}
        <div className="scroll-pit-stop" ref={scrollPitStop} />
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
