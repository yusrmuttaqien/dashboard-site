import { useState } from 'react';
import useToDo from '@/hooks/useToDo';
import { MODAL_ADD_TODO } from '@/constants/modal';
import CheckboxInput from '@/components/CheckboxInput';
import Button from '@/components/Button';
import {
  Container,
  HeadingContainer,
  Heading,
  Item,
  ItemContainer,
  Delete,
  TextInput,
  Modal,
} from './styles';

export default function OverviewToDo(props) {
  const { className } = props;
  const [isAddTodo, setIsAddTodo] = useState(false);
  const { todos, changeTodo, deleteTodo, todoCount, completedTodo } = useToDo();

  return (
    <Container className={className}>
      <Heading>
        <HeadingContainer>
          <h4>What to do?</h4>{' '}
          <p>
            {completedTodo}/{todoCount} <strong>done</strong>
          </p>
        </HeadingContainer>
        <Button className="custom-button" onClick={() => setIsAddTodo(true)}>
          <p>New Todo</p>
        </Button>
      </Heading>
      <ItemContainer data-stack={!!todoCount}>
        {todos.map((todo) => (
          <ToDoItem
            key={`${todo.title.get()}-${todo.date.get()}`}
            content={todo.get()}
            onChange={changeTodo(todo)}
            onDelete={deleteTodo(todo)}
          />
        ))}
        {todoCount === 0 && <p className="empty-state">Nothing to do!</p>}
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
  const { addTodo } = useToDo();

  const _handleAdd = (v) => {
    addTodo(v);
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
