import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isPublished: false,
    openPublish: false,
  },
  reducers: {
    publishForm: (state) => {
      state.isPublished = true;
    },
    openPublishModal: (state, action) => {
      state.openPublish = true;
    },
    closePublishModal: (state, action) => {
      state.openPublish = false;
    },
  },
});

export const { publishForm, openPublishModal, closePublishModal } =
  formSlice.actions;
export default formSlice.reducer;
