import { useHookstate, none } from '@hookstate/core';
import useActivities from '@/hooks/useActivities';
import { TODO_STATE_PROVIDER } from '@/utils/states';
import { syncToDoLocalStorage } from '@/utils/storages';

export default function useToDo() {
  const toDoState = useHookstate(TODO_STATE_PROVIDER);
  const { addActivities } = useActivities();
  const todoCount = toDoState.length;
  const completedTodo = toDoState.filter((todo) => todo.done.get()).length;

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
  const _handleAdd = (v) => {
    toDoState.merge([{ title: v, done: false, date: new Date() }]);
    syncToDoLocalStorage();
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
