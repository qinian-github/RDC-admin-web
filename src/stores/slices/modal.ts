import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalVisible: false,
  currentRecord: null,
  currentId: null, // 新添加的属性
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    setCurrentRecord: (state, action) => {
      state.currentRecord = action.payload;
    },
    setCurrentId: (state, action) => {
      // 新添加的 reducer
      state.currentId = action.payload;
    },
    resetModal: (state) => {
      state.modalVisible = false;
      state.currentRecord = null;
      state.currentId = null; // 重置 currentId
    },
  },
});

export const { setModalVisible, setCurrentRecord, setCurrentId, resetModal } =
  modalSlice.actions;

export default modalSlice.reducer;
