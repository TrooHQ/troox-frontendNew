import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../Api/Api";
import { toast } from "react-toastify";

const BASE_PATH = "/api/v1/catalog";

/** Nested modifier in modifier group response */
export interface ModifierGroupNestedModifier {
  id: string;
  name: string;
  price_delta?: string;
  sort_order?: number;
  is_active?: boolean;
}

export interface ModifierGroup {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  min_selections?: number;
  max_selections?: number;
  modifiers?: ModifierGroupNestedModifier[];
}

export interface Modifier {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  price: string;
  modifier_group: string;
}

/** Nested modifier shape when creating a group with modifiers in one request */
export interface ModifierGroupModifierItem {
  name: string;
  price_delta: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface ModifierGroupCreatePayload {
  name: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  required?: boolean;
  min_selections?: number;
  max_selections?: number;
  modifiers?: ModifierGroupModifierItem[];
}

export interface ModifierGroupUpdatePayload {
  id: string;
  name?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  required?: boolean;
  min_selections?: number;
  max_selections?: number;
}

export interface ModifierCreatePayload {
  name: string;
  /** group_id - required by API. Also accepts modifier_group for backward compat */
  group_id?: string;
  modifier_group?: string;
  price?: string;
  price_delta?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface ModifierUpdatePayload {
  id: string;
  name?: string;
  price?: string;
  price_delta?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
}

interface ModifierState {
  modifierGroups: ModifierGroup[];
  modifiers: Modifier[];
  loading: boolean;
  error: string | null;
}

const initialState: ModifierState = {
  modifierGroups: [],
  modifiers: [],
  loading: false,
  error: null,
};

const getHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});

// Modifier Groups
export const fetchModifierGroups = createAsyncThunk<
  ModifierGroup[],
  void,
  { rejectValue: string }
>("modifier/fetchModifierGroups", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<ModifierGroup[]>(
      `${BASE_PATH}/modifier-groups/`,
      getHeaders(),
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    console.error("Error fetching modifier groups:", error);
    const message =
      error.response?.data?.message || "Failed to fetch modifier groups";
    return rejectWithValue(message);
  }
});

export const createModifierGroup = createAsyncThunk<
  ModifierGroup,
  ModifierGroupCreatePayload,
  { rejectValue: string }
>(
  "modifier/createModifierGroup",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post<ModifierGroup>(
        `${BASE_PATH}/modifier-groups/`,
        payload,
        getHeaders(),
      );
      toast.success("Modifier group created successfully");
      dispatch(fetchModifierGroups());
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to create modifier group";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const updateModifierGroup = createAsyncThunk<
  ModifierGroup,
  ModifierGroupUpdatePayload,
  { rejectValue: string }
>(
  "modifier/updateModifierGroup",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { id, ...updateData } = payload;
      const response = await api.patch<ModifierGroup>(
        `${BASE_PATH}/modifier-groups/${id}/`,
        updateData,
        getHeaders(),
      );
      toast.success("Modifier group updated successfully");
      dispatch(fetchModifierGroups());
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update modifier group";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const deleteModifierGroup = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("modifier/deleteModifierGroup", async (id, { rejectWithValue, dispatch }) => {
  try {
    await api.delete(`${BASE_PATH}/modifier-groups/${id}/`, getHeaders());
    toast.success("Modifier group deleted successfully");
    dispatch(fetchModifierGroups());
    dispatch(fetchModifiers());
    return id;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to delete modifier group";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// Modifiers
export const fetchModifiers = createAsyncThunk<
  Modifier[],
  void,
  { rejectValue: string }
>("modifier/fetchModifiers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Modifier[]>(
      `${BASE_PATH}/modifiers/`,
      getHeaders(),
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to fetch modifiers";
    return rejectWithValue(message);
  }
});

export const createModifier = createAsyncThunk<
  Modifier,
  ModifierCreatePayload,
  { rejectValue: string }
>("modifier/createModifier", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const groupId = payload.group_id ?? payload.modifier_group;
    const priceDelta =
      payload.price_delta ??
      (Number.parseFloat(payload.price || "0") || 0).toFixed(2);
    const apiPayload = {
      group_id: groupId,
      name: payload.name,
      price_delta: priceDelta,
      is_active: payload.is_active ?? true,
      sort_order: payload.sort_order ?? 0,
    };
    const response = await api.post<Modifier>(
      `${BASE_PATH}/modifiers/`,
      apiPayload,
      getHeaders(),
    );
    toast.success("Modifier added successfully");
    dispatch(fetchModifiers());
    dispatch(fetchModifierGroups());
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to add modifier";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const updateModifier = createAsyncThunk<
  Modifier,
  ModifierUpdatePayload,
  { rejectValue: string }
>("modifier/updateModifier", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const { id, price, price_delta, ...rest } = payload;
    const updateData: Record<string, unknown> = { ...rest };
    if (price_delta !== undefined) {
      updateData.price_delta = price_delta;
    } else if (price !== undefined) {
      updateData.price_delta = (
        Number.parseFloat(String(price)) || 0
      ).toFixed(2);
    }
    const response = await api.patch<Modifier>(
      `${BASE_PATH}/modifiers/${id}/`,
      updateData,
      getHeaders(),
    );
    toast.success("Modifier updated successfully");
    dispatch(fetchModifiers());
    dispatch(fetchModifierGroups());
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to update modifier";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const deleteModifier = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("modifier/deleteModifier", async (id, { rejectWithValue, dispatch }) => {
  try {
    await api.delete(`${BASE_PATH}/modifiers/${id}/`, getHeaders());
    toast.success("Modifier deleted successfully");
    dispatch(fetchModifiers());
    dispatch(fetchModifierGroups());
    return id;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to delete modifier";
    toast.error(message);
    return rejectWithValue(message);
  }
});

const modifierSlice = createSlice({
  name: "modifier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Modifier Groups
    builder
      .addCase(fetchModifierGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchModifierGroups.fulfilled,
        (state, action: PayloadAction<ModifierGroup[]>) => {
          state.loading = false;
          state.modifierGroups = action.payload;
        },
      )
      .addCase(
        fetchModifierGroups.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch modifier groups";
        },
      )
      .addCase(createModifierGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createModifierGroup.fulfilled,
        (state, action: PayloadAction<ModifierGroup>) => {
          state.loading = false;
          if (!state.modifierGroups.some((g) => g.id === action.payload.id)) {
            state.modifierGroups.push(action.payload);
          }
        },
      )
      .addCase(
        createModifierGroup.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to create modifier group";
        },
      )
      .addCase(updateModifierGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateModifierGroup.fulfilled,
        (state, action: PayloadAction<ModifierGroup>) => {
          state.loading = false;
          const index = state.modifierGroups.findIndex(
            (g) => g.id === action.payload.id,
          );
          if (index !== -1) {
            state.modifierGroups[index] = action.payload;
          }
        },
      )
      .addCase(
        updateModifierGroup.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to update modifier group";
        },
      )
      .addCase(
        deleteModifierGroup.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.modifierGroups = state.modifierGroups.filter(
            (g) => g.id !== action.payload,
          );
          state.modifiers = state.modifiers.filter(
            (m) => m.modifier_group !== action.payload,
          );
        },
      );

    // Modifiers
    builder
      .addCase(fetchModifiers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchModifiers.fulfilled,
        (state, action: PayloadAction<Modifier[]>) => {
          state.loading = false;
          state.modifiers = action.payload;
        },
      )
      .addCase(
        fetchModifiers.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch modifiers";
        },
      )
      .addCase(
        createModifier.fulfilled,
        (state, action: PayloadAction<Modifier>) => {
          if (!state.modifiers.some((m) => m.id === action.payload.id)) {
            state.modifiers.push(action.payload);
          }
        },
      )
      .addCase(
        updateModifier.fulfilled,
        (state, action: PayloadAction<Modifier>) => {
          const index = state.modifiers.findIndex(
            (m) => m.id === action.payload.id,
          );
          if (index !== -1) {
            state.modifiers[index] = action.payload;
          }
        },
      )
      .addCase(
        deleteModifier.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.modifiers = state.modifiers.filter(
            (m) => m.id !== action.payload,
          );
        },
      );
  },
});

export default modifierSlice.reducer;
