import * as Categoriesconstants from "../Constants/CategoriesConstants";

// GET ALL CATEGORIES

export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case Categoriesconstants.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case Categoriesconstants.GET_ALL_CATEGORIES_SUCESS:
      return { isLoading: false, categories: action.payload };
    case Categoriesconstants.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE CATEGORY

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case Categoriesconstants.CREATE_CATEGORIES_REQUEST:
      return { isLoading: true };
    case Categoriesconstants.CREATE_CATEGORIES_SUCESS:
      return { isLoading: false, isSucess: true };
    case Categoriesconstants.CREATE_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case Categoriesconstants.CREATE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE CATEGORY

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case Categoriesconstants.UPDATE_CATEGORIES_REQUEST:
      return { isLoading: true };
    case Categoriesconstants.UPDATE_CATEGORIES_SUCESS:
      return { isLoading: false, isSucess: true };
    case Categoriesconstants.UPDATE_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case Categoriesconstants.UPDATE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE CATEGORY

export const deleteCategoryRediucer = (state = {}, action) => {
  switch (action.type) {
    case Categoriesconstants.DELETE_CATEGORIES_REQUEST:
      return { isLoading: true };
    case Categoriesconstants.DELETE_CATEGORIES_SUCESS:
      return { isLoading: false, isSucess: true };
    case Categoriesconstants.DELETE_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case Categoriesconstants.DELETE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};
