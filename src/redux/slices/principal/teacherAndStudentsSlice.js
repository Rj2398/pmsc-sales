import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";
import toast from "react-hot-toast";

// get teacher details api

export const getTeacherDetails = createAsyncThunk("/principal/getTeacherDetails",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getTeacherDetails(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//StudentList

export const studentList = createAsyncThunk("/principal/studentList",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.studentList(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//teacher Profile

export const teacherProfile = createAsyncThunk("/principal/teacherProfile",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.teacherProfile(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const teacherAndStudentsSlice = createSlice({
  name: "teacherAndStudentsSlice",
  initialState: {
    teacherDetails: [],
    studentData: [],
    teacherData: [],
    loading: false
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTeacherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherDetails = action.payload?.data;
      })
      .addCase(getTeacherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch Teacher Details";
      })
      //studentList
      .addCase(studentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentList.fulfilled, (state, action) => {
        state.loading = false;
        state.studentData = action.payload?.data;
      })
      .addCase(studentList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch Student Details";
      })
      // Teacher Profile
      .addCase(teacherProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teacherProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherData = action.payload;
      })
      .addCase(teacherProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch Teacher Details";
      });
  },
});

export default teacherAndStudentsSlice.reducer;
