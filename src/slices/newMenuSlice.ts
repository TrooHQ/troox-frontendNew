import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../Api/Api";

const BASE_PATH = "/api/v1/catalog";

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    category: string;
    subcategory: string;
    is_active: boolean;
    sort_order: number;
    all_locations: boolean;
    item_variants: string;
    variations: string;
}

const getHeaders = () => ({
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchMenuItems = createAsyncThunk<
    MenuItem[],
    string | undefined,
    { rejectValue: string }
>("newMenu/fetchMenuItems", async (branch_id, { rejectWithValue }) => {
    try {
        const url = branch_id
            ? `${BASE_PATH}/items/?location_id=${branch_id}`
            : `${BASE_PATH}/items/`;
        const response = await api.get<MenuItem[]>(url, getHeaders());
        return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to fetch menu items";
        return rejectWithValue(message);
    }
});

interface MenuState {
    items: MenuItem[];
    loading: boolean;
    error: string | null;
}

const initialState: MenuState = {
    items: [],
    loading: false,
    error: null,
};

const newMenuSlice = createSlice({
    name: "newMenu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenuItems.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchMenuItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default newMenuSlice.reducer;