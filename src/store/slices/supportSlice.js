import { createSlice } from '@reduxjs/toolkit';
import { createTicket } from '../../services/supportService';

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    submitSupportTicket: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    submitSupportTicketSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    submitSupportTicketError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetSupportState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  submitSupportTicket,
  submitSupportTicketSuccess,
  submitSupportTicketError,
  resetSupportState,
} = supportSlice.actions;

// Simple thunk for dispatching support ticket
export const submitSupportTicketThunk = (payload) => async (dispatch) => {
  dispatch(submitSupportTicket());
  try {
    await createTicket(payload);
    dispatch(submitSupportTicketSuccess());
  } catch (err) {
    dispatch(submitSupportTicketError(err?.response?.data?.message || 'Failed to submit support ticket.'));
  }
};

export default supportSlice.reducer;