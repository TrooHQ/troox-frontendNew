import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../Api/Api";
import { toast } from "react-toastify";

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
>("newMenu/fetchMenuItems", async (_, { rejectWithValue }) => {
    try {
        const url = `${BASE_PATH}/items/`;
        const response = await api.get<MenuItem[]>(url, getHeaders());
        return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to fetch menu items";
        return rejectWithValue(message);
    }
});

// Create dynamic menu item
export const createMenuItem = createAsyncThunk<
    MenuItem,
    CreateMenuItemPayload,
    { rejectValue: string }
>("newMenu/createMenuItem", async (payload, { rejectWithValue, dispatch }) => {
    try {
        const response = await api.post<MenuItem>(
            `${BASE_PATH}/items/`,
            payload,
            getHeaders()
        );
        toast.success("Menu item created successfully");
        dispatch(fetchMenuItems(undefined)); // Refresh the list
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to create menu item";
        toast.error(message);
        return rejectWithValue(message);
    }
});


// Interface for creating a new menu item
export interface CreateMenuItemModifier {
    name: string;
    price_delta: string;
    sort_order: number;
    is_active: boolean;
}

export interface CreateMenuItemModifierGroup {
    modifier_group_id: string;
    name: string;
    description: string;
    sort_order: number;
    is_active: boolean;
    required: boolean;
    min_selections: number;
    max_selections: number;
    modifiers: CreateMenuItemModifier[];
}

export interface CreateMenuItemVariantOption {
    name: string;
    sort_order: number;
    price_delta: string;
    is_active: boolean;
}

export interface CreateMenuItemVariant {
    variant_id: string;
    sort_order: number;
    required: boolean;
    min_selections: number;
    max_selections: number;
    options: CreateMenuItemVariantOption[];
}

export interface CreateMenuItemPayload {
    name: string;
    is_active: boolean;
    sort_order: number;
    all_locations: boolean;
    category_id: string;
    subcategory_id?: string;
    station_id?: string;
    modifier_groups: CreateMenuItemModifierGroup[];
    variants: CreateMenuItemVariant[];
    auto_generate_variations: boolean;
    default_variation: {
        price: string;
        sku: string;
        is_taxable: boolean;
        tax_ids: string[];
    };
}


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
            })
            // Create Menu Item
            .addCase(createMenuItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMenuItem.fulfilled, (state, action: PayloadAction<MenuItem>) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createMenuItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default newMenuSlice.reducer;