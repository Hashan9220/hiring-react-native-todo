import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodos, addTodo, updateTodo, deleteTodo, toggleTodoDB } from '../db/database';

export const fetchTodo = createAsyncThunk('todos/fetchTodos', async () => {
  let tet = await getTodos();
  return tet;
});

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async ({ title, description }) => {
    
    
    addTodo(title, description);
    return await getTodos();
  },
);

export const editTodo = createAsyncThunk(
  'todo/editTodo',
  async ({ id, title, description }) => {
     updateTodo(id, title, description);
    return await getTodos();
  },
);

export const toggleTodo = createAsyncThunk("todos/toggle", async ({ id, completed }) => {
  await toggleTodoDB(id, completed);
  return await getTodos();
});

export const removeTodo = createAsyncThunk('todo/deleteTodo', async ({id}) => {
   deleteTodo(id);
  return await getTodos();
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
  },

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodo.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
       .addCase(toggleTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export default todoSlice.reducer;
