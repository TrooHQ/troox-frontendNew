import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";

interface OverviewState {
  openAndClosedTickets: any;
  totalSales: any;
  loading: boolean;
  error: string | null;
}

const initialState: OverviewState = {
  openAndClosedTickets: [],
  totalSales: 0,
  loading: false,
  error: null,
};

// Create async thunk for fetching open and closed tickets
export const fetchOpenAndClosedTickets = createAsyncThunk(
  "overview/fetchOpenAndClosedTickets",
  async (
    {
      date_filter,
      startDate,
      endDate,
    }: { date_filter: string; startDate?: string; endDate?: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const params: any = { date_filter };
      if (date_filter === "date_range") {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await axios.get(`${SERVER_DOMAIN}/getOpenAndClosedTickets`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Create async thunk for fetching total sales
export const fetchTotalSales = createAsyncThunk(
  "overview/fetchTotalSales",
  async (
    {
      date_filter,
      startDate,
      endDate,
    }: { date_filter: string; startDate?: string; endDate?: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const params: any = { date_filter };
      if (date_filter === "date_range") {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await axios.get(`${SERVER_DOMAIN}/getTotalSales`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenAndClosedTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpenAndClosedTickets.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.openAndClosedTickets = action.payload;
      })
      .addCase(fetchOpenAndClosedTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTotalSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalSales.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.totalSales = action.payload;
      })
      .addCase(fetchTotalSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default overviewSlice.reducer;
