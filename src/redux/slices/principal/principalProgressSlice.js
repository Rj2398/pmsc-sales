import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";
import toast from "react-hot-toast";

//  Get All subject List
export const getPrincipalProgressScore = createAsyncThunk("/pricipal/getPrincipalProgressScore", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getPrincipalProgressScore(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

//  Get Subject Wise Score
export const getPrincipalSubjectQuizScore = createAsyncThunk("/principal/getPrincipalSubjectQuizScore", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getPrincipalSubjectQuizScore(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getPrincipalSubjectGraph = createAsyncThunk("/principal/getPrincipalSubjectGraph", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getPrinicpalSubjectGraph(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getPrincipalTeacherTraining = createAsyncThunk("/principal/getPrincipalTeacherTraining", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getPrinicipalTeacherTrainingScore(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});


const principaleProgressSlice = createSlice({
  name: "principaleProgressSlice",
  initialState: {
    progressAndScoreData: null,
    subjectWizeScoreData: null,
    progressGraphData : null,
    teacherTrainingData:null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getPrincipalProgressScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrincipalProgressScore.fulfilled, (state, action) => {
        state.loading = false;
        state.progressAndScoreData = action.payload?.data;
      })
      .addCase(getPrincipalProgressScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 


      .addCase(getPrincipalSubjectQuizScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrincipalSubjectQuizScore.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectWizeScoreData = action.payload?.data;
      })
      .addCase(getPrincipalSubjectQuizScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getPrincipalSubjectGraph.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrincipalSubjectGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.progressGraphData = action.payload?.data;
      })
      .addCase(getPrincipalSubjectGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

          .addCase(getPrincipalTeacherTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrincipalTeacherTraining.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherTrainingData = action.payload?.data;
      })
      .addCase(getPrincipalTeacherTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 
  },
});


export default principaleProgressSlice.reducer;