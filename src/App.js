import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, clearTodos, selectTodo } from './store';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { todos, selectedTodo, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleClear = () => {
    dispatch(clearTodos());
  };

  const handleSelect = (todo) => {
    dispatch(selectTodo(todo)); 
  };

  return (
    <div className="app-container">
      <h1>TODO List</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="todo-item"
            onClick={() => handleSelect(todo)} 
          >
            {todo.name}
          </li>
        ))}
      </ul>
      <button className="clear-button" onClick={handleClear}>
        Очистить список
      </button>

      {selectedTodo && (
        <div className="selected-todo">
          <h2>Детальная информация</h2>
          <pre>{JSON.stringify(selectedTodo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
