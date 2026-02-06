import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../Api/Api";
import { toast } from "react-toastify";


const BASE_PATH = "/api/v1/catalog";


export interface SubCategory {
  name: string;
  sort_order: number;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  subcategories: SubCategory[];
}

//   {
//   "name": "string",
//   "sort_order": 2147483647,
//   "is_active": true,
//   "subcategories": [
//     {
//       "name": "string",
//       "sort_order": 0,
//       "is_active": true
//     }
//   ]
// }

export interface CreateSubCategories {
  name: string;
  sort_order: number;
  is_active: boolean;
}

export interface CreateCategoryPayload {
  name: string;
  sort_order: number;
  is_active: boolean;
  subcategories: CreateSubCategories[];
}

const getHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("category/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Category[]>(
      `${BASE_PATH}/categories/`,
      getHeaders()
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to fetch modifier groups";
    return rejectWithValue(message);
  }
});


export const createCategory = createAsyncThunk<
  Category,
  CreateCategoryPayload,
  { rejectValue: string }
>("category/createCategory", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.post<Category>(
      `${BASE_PATH}/categories/`,
      payload,
      getHeaders()
    );
    toast.success("Category created successfully");
    dispatch(fetchCategories());
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to create category";
    toast.error(message);
    return rejectWithValue(message);
  }
});


export const updateCategory = createAsyncThunk<
  Category,
  { id: string; payload: CreateCategoryPayload },
  { rejectValue: string }
>("category/updateCategory", async ({ id, payload }, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.put<Category>(
      `${BASE_PATH}/categories/${id}/`,
      payload,
      getHeaders()
    );
    toast.success("Category updated successfully");
    dispatch(fetchCategories());
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to update category";
    toast.error(message);
    return rejectWithValue(message);
  }
});


export const deleteCategory = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("category/deleteCategory", async (id, { rejectWithValue, dispatch }) => {
  try {
    await api.delete(
      `${BASE_PATH}/categories/${id}/`,
      getHeaders()
    );
    toast.success("Category deleted successfully");
    dispatch(fetchCategories());
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to delete category";
    toast.error(message);
    return rejectWithValue(message);
  }
});


interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;