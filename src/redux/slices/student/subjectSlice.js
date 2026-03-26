import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";
import toast from "react-hot-toast";

//  Get All subject List
export const getAllSubject = createAsyncThunk("/student/getAllSubject", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAllSubject(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Get (Baseline, Summative, Lesson) assessment Question
export const getAllQuestion = createAsyncThunk("/student/getAllQuestion", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAllQuestion(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Get (Baseline, Summative, Lesson) assessment Question
export const getAttemptId = createAsyncThunk("/student/getAttemptId", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAttemptId(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// based on attemptId
export const submitAnswer = createAsyncThunk("/student/submitAnswer", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.submitAnswer(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// based on getUserProgress
export const getUserProgress = createAsyncThunk("/student/getUserProgress", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getUserProgress(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// based on getUserProgress
export const subjectWiseProgress = createAsyncThunk("/student/subjectWiseProgress", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.subjectWiseProgress(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// based on getUserProgress
export const subjectWiseQuizProgress = createAsyncThunk("/student/subjectWiseQuizProgress", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.subjectWiseProgress(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
 
const subjectSlice = createSlice({
  name: "subjectSlice",
  initialState: {
    allSubject: null,
    classLevel: null,
    subjectDetail: null,
    allSubjectQuestion: null,
    subjectWiseInfo: null,
    subjectWiseQuizInfo: null,
    progressInfo:null,
    attemptId: null,
    loading: false,
    error: null,
    currentSubject: null,
  },
  reducers: {
    setCurrentSubject: (state, action) => {
      state.currentSubject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubject = action.payload?.data;
        state.classLevel = action.payload?.class_level;
      })
      .addCase(getAllSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getAllQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectDetail = action.payload?.subject_details;
        state.allSubjectQuestion = action.payload?.data;
      })
      .addCase(getAllQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getAttemptId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttemptId.fulfilled, (state, action) => {
        state.loading = false;
        state.attemptId = action.payload?.attempt_id;
      })
      .addCase(getAttemptId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(submitAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.attemptId = action.payload?.attempt_id;
        toast.success("Assessment Completed!");
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progressInfo = action.payload?.data;
      })
      .addCase(getUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(subjectWiseProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subjectWiseProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectWiseInfo = action.payload?.data;
      })
      .addCase(subjectWiseProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(subjectWiseQuizProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subjectWiseQuizProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectWiseQuizInfo = action.payload?.data;
      })
      .addCase(subjectWiseQuizProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

  },
});

export const { setCurrentSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
