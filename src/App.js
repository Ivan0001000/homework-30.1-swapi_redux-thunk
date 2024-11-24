import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, clearTodos } from './store';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos()); 
  }, [dispatch]);

  return (
    <div className="app">
      <h1 className="title">Swapi TODO</h1>

      {loading && <p>Завантаження...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo.name}
            </li>
          ))}
        </ul>
      )}

      <footer className="footer">
        <button onClick={() => dispatch(clearTodos())} className="button clear-button">
          Очистити TODO
        </button>
      </footer>
    </div>
  );
}

export default App;
