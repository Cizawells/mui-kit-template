// lib/features/todos/customizationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  list: Todo[];
  isOpen: number[];
}

const initialState: TodosState = {
  isOpen: [],
  list: [],
};

export const customizationSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    openMenu: (state, action: PayloadAction<string>) => {
      console.log('stateee', state, action);
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
  },
});

// Export actions for use in components
export const { addTodo, toggleTodo, removeTodo } = customizationSlice.actions;

// Export reducer for store
export default customizationSlice.reducer;
