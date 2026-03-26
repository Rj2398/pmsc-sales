import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";


export const getSubjectsByLevel = createAsyncThunk("/district-admin/getSubjectsByLevel", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalSubjectsByLevel(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllSchoolList = createAsyncThunk("/district-admin/getAllSchoolList", async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllSchoolList();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTeacherList = createAsyncThunk("/district-admin/getTeacherList", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getTeacherList(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getDistrictReportDownloadData = createAsyncThunk("/district-admin/getDistrictReportDownloadData", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getDistrictReportDownloadData(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const districtSlice = createSlice({
  name: "districtSlice",
  initialState: {
    allSchoolList: null,
    allTeacherList: null,
    reportData : null,
    reportLoading : false,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSubjectsByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubjects = action.payload?.data;
        state.allDashboardData = action.payload;
      })
      .addCase(getSubjectsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })
      .addCase(getAllSchoolList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSchoolList.fulfilled, (state, action) => {
        state.loading = false;
        state.allSchoolList = action.payload?.data;
      })
      .addCase(getAllSchoolList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getTeacherList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherList.fulfilled, (state, action) => {
        state.loading = false;
        state.allTeacherList = action.payload?.data;
      })
      .addCase(getTeacherList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getDistrictReportDownloadData.pending, (state) => {
        state.reportLoading = true;
        state.error = null;
      })
      .addCase(getDistrictReportDownloadData.fulfilled, (state, action) => {
        state.reportLoading = false;
        state.reportData = action.payload?.data;
      })
      .addCase(getDistrictReportDownloadData.rejected, (state, action) => {
        state.reportLoading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      })
      ;
  },
});

export const { setPrincipalCurrentSubject, setprincipalStudentName, setPrincipalLessonQuizName, setPrincipalTeacherName, } = districtSlice.actions;

export default districtSlice.reducer;