import { createSlice } from '@reduxjs/toolkit';
import { setPage } from './pageSliceAccount';

export const pageSlice = createSlice({
  name: 'page',
  initialState: 0,
  reducers: {
    turnPageBack: (state) => {
      return state === 0 ? state : state - 1;
    },
    turnPageNext: (state) => {
      return state + 1;
    },
    setFirstPageForm: (state) => {
      return (state = 0);
    },
  },
});

export const { turnPageBack, turnPageNext, setFirstPageForm } =
  pageSlice.actions;

export default pageSlice.reducer;
