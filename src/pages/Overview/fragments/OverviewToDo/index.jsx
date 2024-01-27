import { useState, useRef } from 'react';
import useToDo from '@/hooks/useToDo';
import { MODAL_ADD_TODO, MODAL_EDIT_TODO } from '@/constants/modal';
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
  Note,
  TextAreaInput,
} from './styles';

export default function OverviewToDo(props) {
  const { className } = props;
  const [isAddTodo, setIsAddTodo] = useState(false);
  const { todos, changeTodo, deleteTodo, todoCount, completedTodo, updateTodo } = useToDo();

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
            onUpdate={updateTodo(todo)}
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

function ToDoItem({ content, onChange, onDelete, onUpdate }) {
  const [isEdit, setIsEdit] = useState(false);
  const { title, done, date, notes } = content;

  const _handleChange = (isChecked) => {
    onChange(isChecked);
  };

  return (
    <Item>
      <div className="spacer">
        <CheckboxInput
          customClass={{ label: 'truncate' }}
          id={`${title}-${date.created}`}
          label={title}
          checked={done}
          onChange={_handleChange}
        />
        {notes && <Note className="indicator" />}
      </div>
      <div className="spacer">
        <Note onClick={() => setIsEdit(true)} />
        <Delete onClick={onDelete} />
      </div>
      <EditToDo states={[isEdit, setIsEdit]} content={content} onUpdate={onUpdate} />
    </Item>
  );
}

function EditToDo({ states, content, onUpdate }) {
  const [isEdit, setIsEdit] = states;
  const title = useRef(content.title);
  const notes = useRef(content.notes);
  const [isDisabled, setIsDisabled] = useState({ title: true, notes: true });

  const _handleUpdate = () => {
    onUpdate(
      title.current !== content.title && title.current,
      notes.current !== content.notes && notes.current
    );
    setIsEdit(false);
  };

  return (
    <Modal
      id={`${MODAL_EDIT_TODO}-${content.title}-${content.date}`}
      isOpen={isEdit}
      onClose={() => setIsEdit(false)}
    >
      <h3>Edit Todo</h3>
      <TextInput
        id={`edit-todo-title-${content.title}-${content.date}`}
        minLength={1}
        placeholder="Todo title"
        onChange={(e) => {
          setIsDisabled((prev) => ({ ...prev, title: e === content.title }));
          title.current = e;
        }}
        reset={isEdit}
        required
        value={content.title}
      />
      <TextAreaInput
        id={`edit-todo-notes-${content.title}-${content.date}`}
        placeholder="Todo notes"
        onChange={(e) => {
          setIsDisabled((prev) => ({ ...prev, notes: e === content.notes }));
          notes.current = e;
        }}
        reset={isEdit}
        value={content.notes}
      />
      <Button
        className="custom-edit-button"
        disabled={isDisabled.title && isDisabled.notes}
        onClick={_handleUpdate}
      >
        Save edit
      </Button>
    </Modal>
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
        id="add-todo"
        placeholder="Input todo title here (press enter to add)"
        onEnter={_handleAdd}
        reset={isAddTodo}
      />
    </Modal>
  );
}
