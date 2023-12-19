import { useState } from 'react';
import { useHookstate, none } from '@hookstate/core';
import { TODO_STATE_PROVIDER } from '@/utils/states';
import { MODAL_ADD_TODO } from '@/constants/modal';
import CheckboxInput from '@/components/CheckboxInput';
import Modal from '@/components/Modal';
import {
  Container,
  HeadingContainer,
  Heading,
  AddContainer,
  Plus,
  Item,
  ItemContainer,
  Delete,
  TextInput,
} from './styles';

export default function OverviewToDo() {
  const [isAddTodo, setIsAddTodo] = useState(false);
  const toDoState = useHookstate(TODO_STATE_PROVIDER);
  const todos = toDoState.get();
  const totalTodo = todos.length;
  const doneTodo = todos.filter((todo) => todo.done).length;

  const _handleChange = (todo) => (isChecked) => {
    todo.done.set(isChecked);
  };
  const _handleDelete = (todo) => () => {
    todo.set(none);
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
        <AddContainer onClick={() => setIsAddTodo(true)}>
          <Plus />
          <p>Add</p>
        </AddContainer>
      </Heading>
      <ItemContainer>
        {toDoState.map((todo, idx) => (
          <ToDoItem
            key={`${todos[idx].title}-${todos[idx].date.created}`}
            content={todo.get()}
            onChange={_handleChange(todo)}
            onDelete={_handleDelete(todo)}
          />
        ))}
        {totalTodo === 0 && <p className="empty-state">Nothing to do!</p>}
      </ItemContainer>
      <AddToDo states={[isAddTodo, setIsAddTodo]} />
    </Container>
  );
}

function ToDoItem({ content, onChange, onDelete }) {
  const { title, done, date } = content;

  const _handleChange = (isChecked) => {
    onChange(isChecked);
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

function AddToDo({ states }) {
  const [isAddTodo, setIsAddTodo] = states;
  const toDoState = useHookstate(TODO_STATE_PROVIDER);

  const _handleAdd = (v) => {
    toDoState.merge([{ title: v, done: false, date: { created: Date.now() } }]);
    setIsAddTodo(false);
  };

  return (
    <Modal id={MODAL_ADD_TODO} isOpen={isAddTodo} onClose={() => setIsAddTodo(false)}>
      <h3>Add todo item</h3>
      <TextInput
        placeholder="Input todo title here (press enter to add)"
        onEnter={_handleAdd}
        reset={isAddTodo}
      />
    </Modal>
  );
}
