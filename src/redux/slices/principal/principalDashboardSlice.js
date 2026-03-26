import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";

//  Get All subject List
export const getSubjectLevel = createAsyncThunk("/principal/getSubjectLevel", async (_, { rejectWithValue }) => {
    try {
      const response = await api.getSubjectLevel();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSubjectsByLevel = createAsyncThunk("/principal/getSubjectsByLevel", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalSubjectsByLevel(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPrincipalSubDashboard = createAsyncThunk("/principal/getPrincipalSubDashboard", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalSubDashboard(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getClassDetailBySubject = createAsyncThunk("/principal/getClassDetailBySubject", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalClassDetailBySubject(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSubjectList = createAsyncThunk("/principal/getSubjectList", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalSubjectList(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPrincipalLessionDetail = createAsyncThunk("/principal/getPrincipalLessionDetail", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalLessionDetail(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getStudentAnswers = createAsyncThunk("/principal/getStudentAnswers", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalStudentAnswers(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBaselineSummitiveQuiz = createAsyncThunk("/principal/getBaselineSummitiveQuiz", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalBaselineSummitiveQuiz(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const studentProfilePerformance = createAsyncThunk("/principal/studentProfilePerformance", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.principalStudentProfilePerformance(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSubjectInfo = createAsyncThunk("/principal/getSubjectInfo", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalSubjectInfo(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLessonQuizAnswers = createAsyncThunk("/principal/getLessonQuizAnswers", async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrincipalLessonQuizAnswers(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const principalDashboardSlice = createSlice({
  name: "principalDashboardSlice",
  initialState: {
    classLevels: null,
    allSubjects: null,
    allDashboardData: null,
    classDetails: null,
    subjectInfo: null,
    subjectList: null,
    classList: null,
    studentList: null,
    studentList2: null,
    subDashboard: null,
    lessonInfo: null,
    baslineSummitiveInfo: null,
    studentProfileInfo: null,
    allQuestionAnswer: null,
    lessonQuizAnswer: null,
    loading: false,
    error: null,

    // reducers
    principalCurrentSubject: null,
    principalStudentName: null,
    PrincipalLessonQuizName: null,
    principalTeacherName: null,
  },
  reducers: {
    setPrincipalCurrentSubject: (state, action) => {
      state.principalCurrentSubject = action.payload;
      localStorage.setItem("principalCurrentSubject", action.payload);
    },

    setprincipalStudentName: (state, action) => {
      state.principalStudentName = action.payload;
      localStorage.setItem("principalStudentName", action.payload);
    },

    setPrincipalLessonQuizName: (state, action) => {
      state.PrincipalLessonQuizName = action.payload;
      localStorage.setItem("PrincipalLessonQuizName", action.payload);
    },

    setPrincipalTeacherName: (state, action) => {
      state.principalTeacherName = action.payload;
      localStorage.setItem("principalTeacherName", action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSubjectLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevels = action.payload?.data;
      })
      .addCase(getSubjectLevel.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

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

      .addCase(getPrincipalSubDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrincipalSubDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.subDashboard = action.payload?.data;
      })
      .addCase(getPrincipalSubDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getClassDetailBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassDetailBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.classDetails = action.payload?.data;
      })
      .addCase(getClassDetailBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getSubjectList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectList = action.payload?.data;
      })
      .addCase(getSubjectList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getPrincipalLessionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrincipalLessionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonInfo = action.payload;
      })
      .addCase(getPrincipalLessionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getBaselineSummitiveQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBaselineSummitiveQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.baslineSummitiveInfo = action.payload?.data;
      })
      .addCase(getBaselineSummitiveQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(studentProfilePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentProfilePerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfileInfo = action.payload?.data?.[0];
      })
      .addCase(studentProfilePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getSubjectInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectInfo = action.payload?.data;
      })
      .addCase(getSubjectInfo.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getStudentAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestionAnswer = action.payload;
      })
      .addCase(getStudentAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      // lesson quiz page API
      .addCase(getLessonQuizAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLessonQuizAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonQuizAnswer = action.payload;
      })
      .addCase(getLessonQuizAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })
      ;
  },
});

export const { setPrincipalCurrentSubject, setprincipalStudentName, setPrincipalLessonQuizName, setPrincipalTeacherName, } = principalDashboardSlice.actions;

export default principalDashboardSlice.reducer;