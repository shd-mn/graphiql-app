import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ToastSliceState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const initialState: ToastSliceState = {
  isOpen: false,
  message: '',
  type: 'info',
};

export const toastSlice = createSlice({
  name: 'toastMessage',
  initialState,
  reducers: (create) => ({
    setMessage: create.reducer((state, action: PayloadAction<Omit<ToastSliceState, 'isOpen'>>) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    }),
    closeToast: create.reducer((state) => {
      state.isOpen = false;
      state.message = '';
      state.type = 'info';
    }),
  }),

  selectors: {
    selectAll: (toastMessage) => toastMessage,
  },
});

export const { setMessage, closeToast } = toastSlice.actions;

export const { selectAll } = toastSlice.selectors;
