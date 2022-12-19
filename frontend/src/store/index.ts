import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user";

// import todosReducer from './features/todos/todosSlice'
// import filtersReducer from './features/filters/filtersSlice'

const store = configureStore({
  reducer: {
    user: userReducer
    // Define a top-level state field named `todos`, handled by `todosReducer`
    // todos: todosReducer,
    // filters: filtersReducer
  }
});

export default store;