import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";
import toast from "react-hot-toast";

//  Get All subject List
export const getTeacherProgressScore = createAsyncThunk("/student/getTeacherProgressScore", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getTeacherProgressScore(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

//  Get Subject Wise Score
export const getTeacherSubjectQuizScore = createAsyncThunk("/student/getTeacherSubjectQuizScore", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getTeacherSubjectQuizScore(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

//  Get Subject Wise Score
export const getTeacherSubjectGraph = createAsyncThunk("/student/getTeacherSubjectGraph", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getTeacherSubjectGraph(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});


const progressSlice = createSlice({
  name: "progressSlice",
  initialState: {
    progressAndScoreData: null,
    subjectWizeScoreData: null,
    progressGraphData : null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherProgressScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherProgressScore.fulfilled, (state, action) => {
        state.loading = false;
        state.progressAndScoreData = action.payload?.totals;
      })
      .addCase(getTeacherProgressScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getTeacherSubjectQuizScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherSubjectQuizScore.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectWizeScoreData = action.payload?.data;
      })
      .addCase(getTeacherSubjectQuizScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getTeacherSubjectGraph.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherSubjectGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.progressGraphData = action.payload?.data;
      })
      .addCase(getTeacherSubjectGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 
  },
});


export default progressSlice.reducer;