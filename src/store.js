import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
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
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError, clearTodos } = todoSlice.actions;

export const fetchTodos = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetch('https://swapi.dev/api/people/');
    const data = await response.json();
    dispatch(fetchSuccess(data.results));
  } catch (error) {
    dispatch(fetchError('Помилка завантаження даних'));
  }
};

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});
