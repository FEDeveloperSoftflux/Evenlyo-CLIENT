import { useReducer } from 'react';

// Initial state for cart
const initialState = {
  items: [],
  acceptedItems: [],
  loading: false,
  error: null,
  selectedItems: [],
};

// Action types
export const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_ACCEPTED_ITEMS: 'SET_ACCEPTED_ITEMS',
  ADD_CART_ITEM: 'ADD_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  TOGGLE_ITEM_SELECTION: 'TOGGLE_ITEM_SELECTION',
  CLEAR_SELECTION: 'CLEAR_SELECTION',
  SELECT_ALL_ITEMS: 'SELECT_ALL_ITEMS',
};

// Cart reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CART_ACTIONS.SET_CART_ITEMS:
      return {
        ...state,
        items: action.payload || [],
        loading: false,
        error: null,
      };

    case CART_ACTIONS.SET_ACCEPTED_ITEMS:
      return {
        ...state,
        acceptedItems: action.payload || [],
        loading: false,
        error: null,
      };

    case CART_ACTIONS.ADD_CART_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case CART_ACTIONS.REMOVE_CART_ITEM:
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const updatedSelection = state.selectedItems.filter(id => id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        selectedItems: updatedSelection,
      };

    case CART_ACTIONS.UPDATE_CART_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };

    case CART_ACTIONS.TOGGLE_ITEM_SELECTION:
      const { itemId } = action.payload;
      const isSelected = state.selectedItems.includes(itemId);
      return {
        ...state,
        selectedItems: isSelected
          ? state.selectedItems.filter(id => id !== itemId)
          : [...state.selectedItems, itemId],
      };

    case CART_ACTIONS.CLEAR_SELECTION:
      return {
        ...state,
        selectedItems: [],
      };

    case CART_ACTIONS.SELECT_ALL_ITEMS:
      // Select all items that have complete booking info
      const selectableItems = state.items
        .filter(item => hasCompleteBookingInfo(item))
        .map(item => item.id);
      return {
        ...state,
        selectedItems: selectableItems,
      };

    default:
      return state;
  }
}

// Helper function to check if item has complete booking info
function hasCompleteBookingInfo(item) {
  // For accepted bookings, they always have complete info
  if (item.bookingDetails) return true;
  
  if (!item.tempDetails) return false;
  
  const required = ['eventDate', 'eventTime', 'eventLocation'];
  return required.every(field => 
    item.tempDetails[field] && 
    item.tempDetails[field].toString().trim() !== '' &&
    item.tempDetails[field] !== 'To be specified'
  );
}

// Custom hook
export function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Action creators
  const setLoading = (loading) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_ERROR });
  };

  const setCartItems = (items) => {
    dispatch({ type: CART_ACTIONS.SET_CART_ITEMS, payload: items });
  };

  const setAcceptedItems = (items) => {
    dispatch({ type: CART_ACTIONS.SET_ACCEPTED_ITEMS, payload: items });
  };

  const addCartItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_CART_ITEM, payload: item });
  };

  const removeCartItem = (itemId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_CART_ITEM, payload: itemId });
  };

  const updateCartItem = (itemId, updates) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_CART_ITEM, 
      payload: { id: itemId, updates } 
    });
  };

  const toggleItemSelection = (itemId) => {
    dispatch({ 
      type: CART_ACTIONS.TOGGLE_ITEM_SELECTION, 
      payload: { itemId } 
    });
  };

  const clearSelection = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_SELECTION });
  };

  const selectAllItems = () => {
    dispatch({ type: CART_ACTIONS.SELECT_ALL_ITEMS });
  };

  // Helper functions
  const getSelectedItems = () => {
    if (!Array.isArray(state.items)) return [];
    return state.items.filter(item => state.selectedItems.includes(item.id));
  };

  const getItemsWithCompleteInfo = () => {
    if (!Array.isArray(state.items)) return [];
    return state.items.filter(hasCompleteBookingInfo);
  };

  const getItemsNeedingEdit = () => {
    if (!Array.isArray(state.items)) return [];
    return state.items.filter(item => !hasCompleteBookingInfo(item));
  };

  const canSubmitBookingRequest = () => {
    const selectedItems = getSelectedItems();
    return selectedItems.length > 0 && 
           selectedItems.every(hasCompleteBookingInfo);
  };

  return {
    // State
    ...state,
    
    // Action creators
    setLoading,
    setError,
    clearError,
    setCartItems,
    setAcceptedItems,
    addCartItem,
    removeCartItem,
    updateCartItem,
    toggleItemSelection,
    clearSelection,
    selectAllItems,
    
    // Helper functions
    getSelectedItems,
    getItemsWithCompleteInfo,
    getItemsNeedingEdit,
    canSubmitBookingRequest,
    hasCompleteBookingInfo,
  };
}
