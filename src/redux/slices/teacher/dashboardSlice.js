import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";
import toast from "react-hot-toast";

//  Get All subject List
export const getSubjectLevel = createAsyncThunk("/student/getSubjectLevel", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getSubjectLevel();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getSubjectsByLevel = createAsyncThunk("/student/getSubjectsByLevel", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getSubjectsByLevel(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getClassDetailBySubject = createAsyncThunk("/student/getClassDetailBySubject", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getClassDetailBySubject(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getSubjectInfo = createAsyncThunk("/student/getSubjectInfo", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getSubjectInfo(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getSubjectList = createAsyncThunk("/student/getSubjectList", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getSubjectList(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getClassList = createAsyncThunk("/student/getClassList", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getClassList(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getStudentList = createAsyncThunk("/student/getStudentList", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getStudentList(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getStudentList2 = createAsyncThunk("/student/getStudentList2", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getStudentList(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getTeacherSubDashboard = createAsyncThunk("/student/getTeacherSubDashboard", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getTeacherSubDashboard(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getTeacherLessionDetail = createAsyncThunk("/student/getTeacherLessionDetail", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getTeacherLessionDetail(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getBaselineSummitiveQuiz = createAsyncThunk("/student/getBaselineSummitiveQuiz", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getBaselineSummitiveQuiz(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const studentProfilePerformance = createAsyncThunk("/student/studentProfilePerformance", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.studentProfilePerformance(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getStudentAnswers = createAsyncThunk("/student/getStudentAnswers", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getStudentAnswers(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// lesson quiz page API

export const getLessonQuizAnswers = createAsyncThunk("/student/getLessonQuizAnswers", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getLessonQuizAnswers(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    classLevels: null,
    allSubjects: null,
    allSubjectsData: null,
    classDetails: null,
    subjectInfo : null,
    subjectList: null,
    classList: null,
    studentList: null,
    studentList2: null,
    subDashboard: null,
    lessonInfo: null,
    baslineSummitiveInfo: null,
    studentProfileInfo:null,
    allQuestionAnswer: null,
    lessonQuizAnswer: null,
    loading: false,
    error: null,
    // reducers 
    teacherCurrentSubject: null,
    teacherStudentName: null,
    lessonQuizName: null,
    mwlTraining: null,
    mwlDomain: null,
  },
  reducers: {
    setTeacherCurrentSubject: (state, action) => {
      state.teacherCurrentSubject = action.payload;
      localStorage.setItem('teacherCurrentSubject', action.payload);
    },

    setTeacherStudentName: (state, action) => {
      state.teacherStudentName = action.payload;
      localStorage.setItem("teacherStudentName",action.payload);
    },
    
    setLessonQuizName: (state, action) => {
      state.lessonQuizName = action.payload;
      localStorage.setItem('lessonQuizName', action.payload);
    },

    setMwlTraining: (state, action) => {
      state.mwlTraining = action.payload;
      localStorage.setItem('mwlTraining', action.payload);
    },

    setMwlDomain: (state, action) => {
      state.mwlDomain = action.payload;
      localStorage.setItem('mwlDomain', action.payload);
    }
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
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getSubjectsByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubjects = action.payload?.data;
        state.allSubjectsData = action.payload;

      })
      .addCase(getSubjectsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
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
        state.error = action.payload?.message || "Failed to fetch client information";
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
        state.error = action.payload?.message || "Failed to fetch client information";
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
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getClassList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassList.fulfilled, (state, action) => {
        state.loading = false;
        state.classList = action.payload?.data;
      })
      .addCase(getClassList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getStudentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentList.fulfilled, (state, action) => {
        state.loading = false;
        state.studentList = action.payload?.data;
      })
      .addCase(getStudentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getStudentList2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentList2.fulfilled, (state, action) => {
        state.loading = false;
        state.studentList2 = action.payload?.data;
      })
      .addCase(getStudentList2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getTeacherSubDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherSubDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.subDashboard = action.payload?.data;
      })
      .addCase(getTeacherSubDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      .addCase(getTeacherLessionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherLessionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonInfo = action.payload;
      })
      .addCase(getTeacherLessionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
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
        state.error = action.payload?.message || "Failed to fetch client information";
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
        state.error = action.payload?.message || "Failed to fetch client information";
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
        state.error = action.payload?.message || "Failed to fetch client information";
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
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

  },
});


export const { setTeacherCurrentSubject, setTeacherStudentName, setLessonQuizName, setMwlTraining, setMwlDomain } = dashboardSlice.actions;
export default dashboardSlice.reducer;