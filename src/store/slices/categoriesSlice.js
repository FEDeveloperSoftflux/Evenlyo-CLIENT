import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../services/categoriesService";
import { getSubcategories } from "../../services/categoriesService";


const initialState = {
  categories: [],
  searchResults: [],
  selectedCategory: null,
  subcategories: [],
  selectedSubcategory: null,
  loading: {
    categories: false,
    subcategories: false,
    search: false,
  },
  error: null,
  searchTerm: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getIniialState: state => {
      state.loading.categories = true
    },
    getCategorySucess: (state, action) => {
      console.log(state, action.payload, "statestatestatestate");
      state.categories = action.payload
      state.loading.categories = false;
      state.error = null;
    },
    getCategoryFail: (state, action) => {
      state.categories = []
      state.loading.categories = false;
      state.error = action;
    },

    setSubcategoriesLoading: (state, action) => {
      state.loading.subcategories = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subcategories = Array.isArray(action.payload) ? action.payload : [];
      state.loading.subcategories = false;
      state.error = null;
    },
    setSubcategoriesError: (state, action) => {
      state.error = action.payload;
      state.loading.subcategories = false;
      state.subcategories = [];
    },
    // setCategoriesLoading: (state, action) => {
    //   state.loading.categories = action.payload;
    // },
    // setCategoriesError: (state, action) => {
    //   state.error = action.payload;
    //   state.loading.categories = false;
    // },
    // setSearchResults: (state, action) => {
    //   state.searchResults = Array.isArray(action.payload) ? action.payload : [];
    //   state.loading.search = false;
    //   state.error = null;
    // },
    // setSearchLoading: (state, action) => {
    //   state.loading.search = action.payload;
    // },
    // setSearchError: (state, action) => {
    //   state.error = action.payload;
    //   state.loading.search = false;
    // },
    // setSubcategories: (state, action) => {
    //   // Defensive check to ensure only arrays are stored
    //   state.subcategories = Array.isArray(action.payload) ? action.payload : [];
    //   state.loading.subcategories = false;
    //   state.error = null;
    // },
    // setSubcategoriesLoading: (state, action) => {
    //   state.loading.subcategories = action.payload;
    // },
    // setSubcategoriesError: (state, action) => {
    //   state.error = action.payload;
    //   state.loading.subcategories = false;
    // },
    // setSelectedCategory: (state, action) => {
    //   state.selectedCategory = action.payload;
    //   state.selectedSubcategory = null;
    //   state.subcategories = [];
    // },
    // setSelectedSubcategory: (state, action) => {
    //   state.selectedSubcategory = action.payload;
    // },
    // setSearchTerm: (state, action) => {
    //   state.searchTerm = action.payload;
    // },
    // clearError: (state) => {
    //   state.error = null;
    // },
  },
});

export const {
  getIniialState,
  getCategoryFail,
  getCategorySucess,

  setSubcategoriesLoading,
  setSubcategories,
  setSubcategoriesError,
  // setCategories,
  // setCategoriesLoading,
  // setCategoriesError,
  // setSearchResults,
  // setSearchLoading,
  // setSearchError,
  // setSubcategories,
  // setSubcategoriesLoading,
  // setSubcategoriesError,
  // setSelectedCategory,
  // setSelectedSubcategory,
  // setSearchTerm,
  // clearError,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;


export function getAllCategories() {
  return dispatch => {
    dispatch(getIniialState());
    getCategories()
      .then(response => {
        if (response?.status === 200 || response?.status === 201) {
          let data = response?.data?.data;
          dispatch(getCategorySucess(data));
        } else {
          dispatch(getCategoryFail(response?.data?.message));
        }
      })
      .catch(error => {
        dispatch(getCategoryFail(error));
      });
  };
}


export function getSubcategoriesByCategory(categoryId) {
  return dispatch => {
    dispatch(setSubcategoriesLoading(true));
    getSubcategories(categoryId)
      .then(response => {
        if (response?.status === 200 || response?.status === 201) {
          let data = response?.data?.data;
          dispatch(setSubcategories(data));
        } else {
          dispatch(setSubcategoriesError(response?.data?.message));
        }
      })
      .catch(error => {
        dispatch(setSubcategoriesError(error));
      });
  };
}