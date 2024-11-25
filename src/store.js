import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  selectedTodo: null, 
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    fetchError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearTodos: (state) => {
      state.todos = [];
      state.selectedTodo = null; 
    },
    selectTodo: (state, action) => {
      state.selectedTodo = action.payload; 
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError, clearTodos, selectTodo } = todoSlice.actions;

export const fetchTodos = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetch('https://swapi.dev/api/people/');
    const data = await response.json();
    dispatch(fetchSuccess(data.results));
  } catch (error) {
    dispatch(fetchError('Ошибка загрузки данных'));
  }
};

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});
