import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending.toString(), handlePending)
      .addCase(fetchTasks.fulfilled.toString(), (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected.toString(), handleRejected)
      .addCase(addTask.pending.toString(), handlePending)
      .addCase(addTask.fulfilled.toString(), (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected.toString(), handleRejected)
      .addCase(deleteTask.pending.toString(), handlePending)
      .addCase(deleteTask.fulfilled.toString(), (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteTask.rejected.toString(), handleRejected)
      .addCase(toggleCompleted.pending.toString(), handlePending)
      .addCase(toggleCompleted.fulfilled.toString(), (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addCase(toggleCompleted.rejected.toString(), handleRejected);
  },
});

export const tasksReducer = tasksSlice.reducer;

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchTasks.pending.toString(), state => {
//         state.isLoading = true;
//       })
//       .addCase(fetchTasks.fulfilled.toString(), (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//         state.items = action.payload;
//       })
//       .addCase(fetchTasks.rejected.toString(), (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(addTask.pending.toString(), state => {
//         state.isLoading = true;
//       })
//       .addCase(addTask.fulfilled.toString(), (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//         state.items.push(action.payload);
//       })
//       .addCase(addTask.rejected.toString(), (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteTask.pending.toString(), state => {
//         state.isLoading = true;
//       })
//       .addCase(deleteTask.fulfilled.toString(), (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//         const index = state.items.findIndex(
//           task => task.id === action.payload.id
//         );
//         state.items.splice(index, 1);
//       })
//       .addCase(deleteTask.rejected.toString(), (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(toggleCompleted.pending.toString(), state => {
//         state.isLoading = true;
//       })
//       .addCase(toggleCompleted.fulfilled.toString(), (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//         const index = state.items.findIndex(
//           task => task.id === action.payload.id
//         );
//         state.items.splice(index, 1, action.payload);
//       })
//       .addCase(toggleCompleted.rejected.toString(), (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });
