import * as CategoriesConstants from "../Constants/CategoriesConstants";
import * as categoriesAPIs from "../APIs/CategoriesServices";

import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// get all category

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST });
    const data = await categoriesAPIs.getCategoriesService();
    dispatch({
      type: CategoriesConstants.GET_ALL_CATEGORIES_SUCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
  }
};

// create Category action

export const createCategoryAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoriesConstants.CREATE_CATEGORIES_REQUEST });
    await categoriesAPIs.createCategoryService(
      title,
      tokenProtection(getState)
    );
    dispatch({ type: CategoriesConstants.CREATE_CATEGORIES_SUCESS });
    toast.success("Category created sucessfully");
    dispatch(getAllCategoriesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstants.CREATE_CATEGORIES_FAIL);
  }
};

// UPDATE Category action

export const updateCategoryAction =
  (id, title) => async (dispatch, getState) => {
    try {
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORIES_REQUEST });
      await categoriesAPIs.updateCategoryService(
        id,
        title,
        tokenProtection(getState)
      );
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORIES_SUCESS });
      toast.success("Category Updated sucessfully");
      dispatch(getAllCategoriesAction());
    } catch (error) {
      ErrorsAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORIES_FAIL);
    }
  };

//   Delete category action

export const deleteCategoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoriesConstants.DELETE_CATEGORIES_REQUEST });
    await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
    dispatch({ type: CategoriesConstants.DELETE_CATEGORIES_SUCESS });
    toast.success("Category deletd sucessfully");
    dispatch(getAllCategoriesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstants.DELETE_CATEGORIES_FAIL);
  }
};
