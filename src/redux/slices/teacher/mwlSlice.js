import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";
import toast from "react-hot-toast";

//  Get All subject List
export const getMwlCategories = createAsyncThunk(
  "/student/getMwlCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getMwlCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getMwlCategoryDetail = createAsyncThunk(
  "/student/getMwlCategoryDetail",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getMwlCategoryDetail(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// get mwl lesson

export const getmwlLesson = createAsyncThunk(
  "/teacher/get-mwl-lessons",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getmwlLesson(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// mwl content

export const getMwlContent = createAsyncThunk(
  "/student/mwl-content",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getMwlContent(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const mwlSlice = createSlice({
  name: "mwlSlice",
  initialState: {
    categoriesList: null,
    mwlSubjectDetail: null,
    loading: false,
    error: null,
    mwlessondetail: null,
    mwlContents: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMwlCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMwlCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesList = action.payload?.data;
      })
      .addCase(getMwlCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getMwlCategoryDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMwlCategoryDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.mwlSubjectDetail = action.payload;
      })
      .addCase(getMwlCategoryDetail.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      //mwl lesson

      .addCase(getmwlLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getmwlLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.mwlessondetail = action.payload;
      })
      .addCase(getmwlLesson.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })
      //
      .addCase(getMwlContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMwlContent.fulfilled, (state, action) => {
        state.loading = false;
        state.mwlContents = action.payload;
      })
      .addCase(getMwlContent.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      });
  },
});

export default mwlSlice.reducer;
