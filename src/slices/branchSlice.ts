import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import { toast } from "react-toastify";

interface Branch {
  _id?: string;
  id: string;
  branch_name: string;
  branch_email: string;
  branch_phone_number: string;
  branch_address: string;
}

interface BranchState {
  branches: Branch[];
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  branches: [],
  loading: false,
  error: null,
};

// Async thunk for creating a branch
export const createBranch = createAsyncThunk<Branch, Omit<Branch, "id">, { rejectValue: string }>(
  "branches/createBranch",
  async (branchData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      const response = await axios.post(`${SERVER_DOMAIN}/branch/createBranch`, branchData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      });
      toast.success("Branch created successfully");
      dispatch(fetchBranches());
      return response.data;
    } catch (error: any) {
      toast.error("Failed to create branch");
      return rejectWithValue(error.response.data.message || "An error occurred");
    }
  }
);

// Async thunk for fetching branches
export const fetchBranches = createAsyncThunk<Branch[], void, { rejectValue: string }>(
  "branches/fetchBranches",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${SERVER_DOMAIN}/branch/getBranch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "An error occurred");
    }
  }
);

// Async thunk for deleting a branch
export const deleteBranch = createAsyncThunk<
  void,
  { branchId: string; reason: string },
  { rejectValue: string }
>("branches/deleteBranch", async ({ branchId, reason }, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(
      `${SERVER_DOMAIN}/branch/removeBranch?branch_id=${branchId}&reason=${reason}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Branch deleted successfully");
    dispatch(fetchBranches());
  } catch (error: any) {
    toast.error("Failed to delete branch");
    return rejectWithValue(error.response.data.message || "An error occurred");
  }
});

const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action: PayloadAction<Branch>) => {
        state.loading = false;
        state.branches.push(action.payload);
      })
      .addCase(createBranch.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to create branch";
      })
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action: PayloadAction<Branch[]>) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch branches";
      })
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action: any) => {
        state.loading = false;
        state.branches = state.branches.filter((branch) => branch._id !== action.payload);
      })
      .addCase(deleteBranch.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete branch";
      });
  },
});

export default branchSlice.reducer;
