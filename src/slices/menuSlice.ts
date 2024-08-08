import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import { toast } from "react-toastify";

interface MenuCategory {
  _id: string;
  created_by: string;
  branch: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
}

interface MenuCategoryResponse {
  data: MenuCategory[];
}

interface MenuState {
  categories: MenuCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchMenuCategories = createAsyncThunk<
  MenuCategory[],
  string,
  { rejectValue: string }
>("menu/fetchMenuCategories", async (branch_id: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<MenuCategoryResponse>(
      `${SERVER_DOMAIN}/menu/getAllMenuCategory/?branch_id=${branch_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue("An error occurred. Please try again later.");
    }
  }
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuCategories.fulfilled, (state, action: PayloadAction<MenuCategory[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchMenuCategories.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch menu categories";
      });
  },
});

export default menuSlice.reducer;
