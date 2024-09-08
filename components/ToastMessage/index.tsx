'use client';
import React from 'react';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeToast, selectAll } from '@/redux/features/toastMessage/toastSlice';

const ToastMessage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isOpen, message, type } = useAppSelector(selectAll);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeToast());
  };
  return (
    <>
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={type} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastMessage;
