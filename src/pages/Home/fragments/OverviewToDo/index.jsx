import { useState } from 'react';
import CheckboxInput from '@/components/CheckboxInput';
import {
  Container,
  HeadingContainer,
  Heading,
  AddContainer,
  Plus,
  Item,
  ItemContainer,
  Delete,
} from './styles';

export default function OverviewToDo() {
  const [todos, setTodo] = useState([
    { title: 'Buy milk', done: true, date: { added: new Date().toISOString(), changed: null } },
    {
      title: 'Go back home, nono dont go home aowkaok',
      done: false,
      date: { added: new Date().toISOString(), changed: null },
    },
    { title: 'Eat cereals', done: false, date: { added: new Date().toISOString(), changed: null } },
  ]);
  const totalTodo = todos.length;
  const doneTodo = todos.filter((todo) => todo.done).length;

  const _handleChange = (idx) => (title, isChecked) => {
    setTodo((prev) => {
      const copy = [...prev];
      copy[idx].done = isChecked;
      copy[idx].date.changed = new Date().toISOString();
      return copy;
    });
  };
  const _handleDelete = (idx) => () => {
    setTodo((prev) => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  return (
    <Container>
      <Heading>
        <HeadingContainer>
          <h4>What to do?</h4>{' '}
          <p>
            {doneTodo}/{totalTodo} <strong>done</strong>
          </p>
        </HeadingContainer>
        <AddContainer>
          <Plus />
          <p>Add</p>
        </AddContainer>
      </Heading>
      <ItemContainer>
        {todos.map((todo, idx) => (
          <ToDoItem
            key={`${todo.title}-${todo.date.created}`}
            content={todo}
            onChange={_handleChange(idx)}
            onDelete={_handleDelete(idx)}
          />
        ))}
        {totalTodo === 0 && <p className="empty-state">Nothing to do!</p>}
      </ItemContainer>
    </Container>
  );
}

function ToDoItem({ content, onChange, onDelete }) {
  const { title, done, date } = content;

  const _handleChange = (isChecked) => {
    onChange(title, isChecked);
  };

  return (
    <Item>
      <CheckboxInput
        customClass={{ label: 'truncate' }}
        id={`${title}-${date.created}`}
        label={title}
        checked={done}
        onChange={_handleChange}
      />
      <Delete onClick={onDelete} />
    </Item>
  );
}
