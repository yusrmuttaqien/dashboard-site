import { useHookstate, none } from '@hookstate/core';
import useActivities from '@/hooks/useActivities';
import useUser from '@/hooks/useUser';
import { TODO_STATE_PROVIDER } from '@/utils/states';
import { getLocalStorage, updateLocalStorage } from '@/utils/storages';
import { STORAGE_TODO } from '@/constants/storages';

export default function useToDo() {
  const toDoState = useHookstate(TODO_STATE_PROVIDER);
  const { user } = useUser();
  const { addActivities } = useActivities();
  const todoCount = toDoState.length;
  const completedTodo = toDoState.filter((todo) => todo.done.get()).length;

  const _syncToLocalStorage = () => {
    const todoLocalStorage = getLocalStorage(STORAGE_TODO);

    updateLocalStorage(STORAGE_TODO, {
      ...todoLocalStorage,
      [user.id.get()]: toDoState.get({ noproxy: true }),
    });
  };
  const _handleChange = (todo) => (isChecked) => {
    todo.done.set(isChecked);
    _syncToLocalStorage();
    addActivities({
      title: `${isChecked ? 'Checked' : 'Unchecked'}: ${todo.title.get()}`,
      type: 'ToDo',
    });
  };
  const _handleDelete = (todo) => () => {
    todo.set(none);
    _syncToLocalStorage();
    addActivities({
      title: `Deleted: ${todo.title.get()}`,
      type: 'ToDo',
    });
  };
  const _handleAdd = (v) => {
    toDoState.merge([{ title: v, done: false, date: new Date() }]);
    _syncToLocalStorage();
    addActivities({
      title: `Added: ${v}`,
      type: 'ToDo',
    });
  };

  return {
    changeTodo: _handleChange,
    deleteTodo: _handleDelete,
    addTodo: _handleAdd,
    todos: toDoState,
    todoCount,
    completedTodo,
  };
}
