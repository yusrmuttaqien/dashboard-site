import { useState } from 'react';
import { useHookstate, none } from '@hookstate/core';
import useActivities from '@/hooks/useActivities';
import { TODO_STATE_PROVIDER } from '@/utils/states';
import { MODAL_ADD_TODO } from '@/constants/modal';
import CheckboxInput from '@/components/CheckboxInput';
import { syncToDoLocalStorage } from '@/utils/storages';
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
  Modal,
} from './styles';

export default function OverviewToDo(props) {
  const { className } = props;
  const [isAddTodo, setIsAddTodo] = useState(false);
  const { addActivities } = useActivities();
  const toDoState = useHookstate(TODO_STATE_PROVIDER);
  const totalTodo = toDoState.length;
  const doneTodo = toDoState.filter((todo) => todo.done.get()).length;

  const _handleChange = (todo) => (isChecked) => {
    todo.done.set(isChecked);
    syncToDoLocalStorage();
    addActivities({
      title: `${isChecked ? 'Checked' : 'Unchecked'}: ${todo.title.get()}`,
      type: 'ToDo',
    });
  };
  const _handleDelete = (todo) => () => {
    todo.set(none);
    syncToDoLocalStorage();
    addActivities({
      title: `Deleted: ${todo.title.get()}`,
      type: 'ToDo',
    });
  };

  return (
    <Container className={className}>
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
      <ItemContainer data-stack={!!totalTodo}>
        {toDoState.map((todo) => (
          <ToDoItem
            key={`${todo.title.get()}-${todo.date.get()}`}
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
  const { addActivities } = useActivities();

  const _handleAdd = (v) => {
    toDoState.merge([{ title: v, done: false, date: new Date() }]);
    syncToDoLocalStorage();
    setIsAddTodo(false);
    addActivities({
      title: `Added: ${v}`,
      type: 'ToDo',
    });
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
