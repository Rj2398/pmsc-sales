import axios from "axios";
import toast from "react-hot-toast";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("pmsc");
    const token = user ? JSON.parse(user)?.token : null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message;
    if (message == "Unauthenticated." || error?.response?.status == 401) {
      toast.error("Token Expired");
      localStorage.removeItem("pmsc");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export const signIn = (formData) => API.post(`/login`, formData);
export const logout = () => API.post(`/logout`, {});

export const getTermsCondition = () => API.post(`/get-terms-conditions`, {});
export const getPrivacyPolicy = () => API.post(`/get-privacy-policy`, {});
export const dashboardInfo = () => API.get(`/dashboard`, {});
export const getAllSubject = () => API.post(`/stud-sub`, {});
export const getAllQuestion = (formData) => API.post(`/get-question`, formData);
export const getAttemptId = (formData) => API.post(`/start-quiz`, formData);
export const removeAttemptId = (formData) =>
  API.post(`/delete-quiz-attempt`, formData);
export const submitAnswer = (formData) => API.post(`/submit-answers`, formData);
export const getUserProgress = (formData) =>
  API.post(`/get-user-progress`, formData);
export const subjectWiseProgress = (formData) =>
  API.post(`/subject-wise-performance`, formData);
export const getProfile = () => API.get(`/view-profile`);
export const updateProfile = (formData) =>
  API.post(`/update-profile`, formData);

// --------
export const getAllLession = (formData) =>
  API.post(`/get-subject-lessons`, formData);
export const getLessionDetails = (formData) =>
  API.post(`/lessons-content`, formData);
export const startLession = (formData) => API.post(`/start-lesson`, formData);
export const startQuiz = (formData) => API.post(`/start-quiz`, formData);
export const lessionSubmit = (formData) =>
  API.post(`/submit-answers`, formData);
export const completeLesson = (formData) =>
  API.post(`/complete-lesson`, formData);
export const retriveLesson = (formData) =>
  API.post(`/lessons-review`, formData);
export const getEarnedCertificate = (formData) =>
  API.post(`/get-user-certificate`, formData);
export const getWhiteboard = (formData) =>
  API.post(`/submit-whiteboard-answer`, formData);

// ------------------------------------- Teacher Panel Api -------------------------------------------------

export const getSubjectLevel = () => API.get(`/subject-level`, {});
export const getSubjectsByLevel = (formData) =>
  API.post(`/teacher-dashboard`, formData);
export const getTeacherSubDashboard = (formData) =>
  API.post(`/teacher-sub-dashboard`, formData);
export const getClassDetailBySubject = (formData) =>
  API.post(`/class-details`, formData);
export const getSubjectList = (formData) => API.post(`/get-subject`, formData);
export const getClassList = (formData) => API.post(`/get-classes`, formData);
export const getStudentList = (formData) =>
  API.post(`/get-students-class`, formData);
export const getSubjectInfo = (formData) =>
  API.post(`/subject-details`, formData);
export const getTeacherLessionDetail = (formData) =>
  API.post(`/view-lesson-details`, formData);
export const getBaselineSummitiveQuiz = (formData) =>
  API.post(`/baseline-and-summative-questions`, formData);
export const studentProfilePerformance = (formData) =>
  API.post(`/student-performance`, formData);
export const getStudentAnswers = (formData) =>
  API.post(`/student-answers`, formData);
export const getMwlCategories = () => API.get(`/mwl-category`);
export const getMwlCategoryDetail = (formData) =>
  API.post(`/mwl-details`, formData);
export const getLessonQuizAnswers = (formData) =>
  API.post(`/student-lessons-review`, formData);
export const getTeacherProgressScore = (formData) =>
  API.post(`/progress-score`, formData);
export const getTeacherSubjectQuizScore = (formData) =>
  API.post(`/subject-wise-quiz-score`, formData);
export const getTeacherSubjectGraph = (formData) =>
  API.post(`/subject-wise-graph`, formData);
export const getmwlLesson = (formData) =>
  API.post(`/get-mwl-lessons`, formData);
export const getMwlContent = (formData) => API.post(`/mwl-content`, formData);

// ------------------------------------- Principal Panel Api -------------------------------------------------

export const getPrincipalSubDashboard = (formData) =>
  API.post(`/principal-progress-dashboard`, formData);
export const getPrincipalSubjectsByLevel = (formData) =>
  API.post(`/principal-classes-dashboard`, formData);
export const getPrincipalClassDetailBySubject = (formData) =>
  API.post(`/class-details`, formData);
export const getPrincipalSubjectList = (formData) =>
  API.post(`/get-subject`, formData);
export const getPrincipalLessionDetail = (formData) =>
  API.post(`/view-lesson-details`, formData);
export const getPrincipalBaselineSummitiveQuiz = (formData) =>
  API.post(`/baseline-and-summative-questions`, formData);
export const principalStudentProfilePerformance = (formData) =>
  API.post(`/student-performance`, formData);
export const getPrincipalSubjectInfo = (formData) =>
  API.post(`/subject-details`, formData);
export const getPrincipalStudentAnswers = (formData) =>
  API.post(`/student-answers`, formData);
export const getPrincipalLessonQuizAnswers = (formData) =>
  API.post(`/student-lessons-review`, formData);

//principal teacher and student
//24-03-2026 api end pointed changed
export const getTeacherDetails = (formData) =>
  API.post(`/sales-teacher-students-detail`, formData);
// export const getReportDownloadData = (formData) => API.post(`/download-report`, formData);
export const getReportDownloadData = (formData) =>
  API.post(`/principal-download-report`, formData);

//prinicipal progress and score
export const getPrincipalProgressScore = (formData) =>
  API.post(`/principal-progress-dashboard`, formData);
export const getPrinicpalSubjectGraph = (formData) =>
  API.post(`/subject-performance`, formData);
export const getPrincipalSubjectQuizScore = (formData) =>
  API.post(`/subject-quiz-score`, formData);
export const getPrinicipalTeacherTrainingScore = (formData) =>
  API.post(`/teacher-training-score`, formData);
export const studentList = (formData) =>
  API.post(`/sales-get-students`, formData);
export const teacherProfile = (formData) =>
  API.post(`/teacher-profile`, formData);
export const getMyDetails = (formData) => API.post(`/get-my-details`, formData);

// ------------------------------------- District Admin Panel Api -------------------------------------------------

export const getAllSchoolList = () => API.get(`/school-list`);
export const getDistrictSubDashboard = (formData) =>
  API.post(`/district-progress-dashboard`, formData);
export const getTeacherList = (formData) => API.post(`/teacher-list`, formData);
export const getDistrictReportDownloadData = (formData) =>
  API.post(`/district-download-report`, formData);
