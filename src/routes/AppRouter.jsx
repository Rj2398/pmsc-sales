import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Roles } from "../utils/roles";
import RoleBasedRoute from "./RoleBasedRoute";

// Layouts
import StudentLayout from "../layout/StudentLayout";
import TeacherLayout from "../layout/TeacherLayout";
import PrincipalLayout from "../layout/PrincipalLayout";
import DistrictAdminLayout from "../layout/DistrictAdminLayout";

// Student Panel Pages
import StudentDashboard from "../pages/student/Dashboard";
import NotFound from "../pages/common/NotFound";
import Login from "../pages/common/Login";
import StudentProfile from "../pages/student/Profile";
import StudentProgressAndScore from "../pages/student/ProgressAndScore";
import BaselineAssessment from "../pages/student/BaselineAssessment";
import SubjectDetail from "../pages/student/SubjectDetail";
import LessonDetail from "../pages/student/LessonDetail";
import SummativeAssessment from "../pages/student/SummativeAssessment";

// Teacher Panel Pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherMwlLibrary from "../pages/teacher/MwlLibrary";
import TeacherProgressAndScore from "../pages/teacher/ProgressAndScore";
import TeacherProfile from "../pages/teacher/Profile";
import TeacherStudentProfile from "../pages/teacher/StudentProfile";
import TeacherClassDetail from "../pages/teacher/ClassDetail";
import TeacherSubjectDetail from "../pages/teacher/SubjectDetail";
import TeacherSubjectSummativeDetail from "../pages/teacher/SubjectSummativeDetail";
import TeacherSubjectLessonDetail from "../pages/teacher/SubjectLessonDetail";
import TeacherMwlMicroCredentialsDomainTraining from "../pages/teacher/MwlMicroCredentialsDomainTraining";
import TeacherMwlMicroCredentialsDomainTrainingSubject from "../pages/teacher/MwlMicroCredentialsDomainTrainingSubject";
import TeacherMwlOnboarding from "../pages/teacher/MwlOnboarding";
import TeacherMwlParentTraining from "../pages/teacher/MwlParentTraining";
import TeacherSubjectBaselineDetail from "../pages/teacher/SubjectBaselineDetail";
import TeacherMwlLessonPrep from "../pages/teacher/MwlLessonPrep";
import TeacherMwlLessonPrepSubject from "../pages/teacher/MwlLessonPrepSubject";
import TeacherMwlMicroCredentialsDomainTrainingLesson from "../pages/teacher/MwlMicroCredentialsDomainTrainingLesson";
import TeacherMwlLessonPrepLesson from "../pages/teacher/MwlLessonPrepLesson";
import TeacherStudentLessonQuiz from "../pages/teacher/StudentLessonQuiz";
import TeacherStudentBaselineAssessment from "../pages/teacher/StudentBaselineAssessment";
import TeacherStudentSummativeAssessment from "../pages/teacher/StudentSummativeAssessment";

//Principal Panel Pages
import PrincipalDashboard from "../pages/principal/Dashboard";
import TeachersAndStudents from "../pages/principal/TeachersAndStudents";
import PrincipalProfile from "../pages/principal/Profile";
import Classdetails from "../pages/principal/Classdetails";
import PricipalStudentprofile from "../pages/principal/PricipalStudentprofile";
import PrincipleStudentbaseline from "../pages/principal/PrincipleStudentbaseline";
import PrincipleStudentLessonquiz from "../pages/principal/PrincipleStudentLessonquiz";
import PrincipleSubjectSummativedetails from "../pages/principal/PrincipleSubjectSummativedetails";
import PrincipleSubjectDetails from "../pages/principal/PrincipleSubjectDetails";
import SubjectBaselineDetail from "../pages/teacher/SubjectBaselineDetail";
import SubjectBaselinedetails from "../pages/principal/SubjectBaselinedetails";
import SubjectLessondetail from "../pages/principal/SubjectLessondetail";

import PrincipalTeacherProfile from "../pages/principal/PrincipalTeacherProfile";
import PrincipleSummative from "../pages/principal/PrincipleSummative";
import PrincipalProgressAndScore from "../pages/principal/PrincipalProgressAndScore";
import TermsCondition from "../pages/common/TermsCondition";
import PrivacyPolicy from "../pages/common/PrivacyPolicy";

//Principal Panel Pages
import DistrictAdminDashboard from "../pages/districtAdmin/Dashboard";
import DistrictAdminTeachersAndStudents from "../pages/districtAdmin/TeachersAndStudents";
import DistrictAdminProfile from "../pages/districtAdmin/Profile";
import DistrictAdminClassdetails from "../pages/districtAdmin/Classdetails";
import DistrictAdminStudentprofile from "../pages/districtAdmin/PricipalStudentprofile";
import DistrictAdminStudentbaseline from "../pages/districtAdmin/PrincipleStudentbaseline";
import DistrictAdminStudentLessonquiz from "../pages/districtAdmin/PrincipleStudentLessonquiz";
import DistrictAdminSubjectSummativedetails from "../pages/districtAdmin/PrincipleSubjectSummativedetails";
import DistrictAdminSubjectDetails from "../pages/districtAdmin/PrincipleSubjectDetails";
import DistrictAdminSubjectBaselinedetails from "../pages/districtAdmin/SubjectBaselinedetails";
import DistrictAdminSubjectLessondetail from "../pages/districtAdmin/SubjectLessondetail";

import DistrictAdminTeacherProfile from "../pages/districtAdmin/PrincipalTeacherProfile";
import DistrictAdminSummative from "../pages/districtAdmin/PrincipleSummative";
import DistrictAdminProgressAndScore from "../pages/districtAdmin/PrincipalProgressAndScore";
import Trial from "../pages/Trial";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/terms-and-conditions" element={<TermsCondition />} />
      <Route path="/privacy-and-policy" element={<PrivacyPolicy />} />

      {/* Student */}
      <Route element={<RoleBasedRoute allowedRoles={[Roles.STUDENT]} />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/baseline-assignment/:subject_id" element={<BaselineAssessment />} />
          <Route path="/student/subject-detail" element={<SubjectDetail />} />
          <Route path="/student/lesson-detail" element={<LessonDetail />} />
          <Route path="/student/summative-assessment/:subject_id" element={<SummativeAssessment />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/progress-and-score" element={<StudentProgressAndScore />} />
        </Route>
      </Route>

      {/* Teacher */}
      <Route element={<RoleBasedRoute allowedRoles={[Roles.TEACHER]} />}>
        <Route element={<TeacherLayout />}>
          <Route path="/teacher/trial" element={<Trial />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/mwl-library" element={<TeacherMwlLibrary />} />
          <Route path="/teacher/progress-and-score" element={<TeacherProgressAndScore />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/teacher/class-detail/:subjectId" element={<TeacherClassDetail />} />
          <Route path="/teacher/student-profile" element={<TeacherStudentProfile />} />

          <Route path="/teacher/subject-baseline-detail/:subjectId" element={<TeacherSubjectBaselineDetail />} />
          <Route path="/teacher/subject-detail/:subjectId" element={<TeacherSubjectDetail />} />
          <Route path="/teacher/subject-summative-detail/:subjectId" element={<TeacherSubjectSummativeDetail />} />
          <Route path="/teacher/subject-lesson-detail/:subjectId/:lessonId" element={<TeacherSubjectLessonDetail />} />
          {/* <Route path="/teacher/mwl-micro-credentials-domain-training" element={<TeacherMwlMicroCredentialsDomainTraining />} /> */}
          <Route path="/teacher/mwl-training" element={<TeacherMwlMicroCredentialsDomainTraining />} />

          <Route path="/teacher/mwl-micro-credentials-domain-training-subject" element={<TeacherMwlMicroCredentialsDomainTrainingSubject />} />
          <Route path="/teacher/mwl-onboarding" element={<TeacherMwlOnboarding />} />
          <Route path="/teacher/mwl-parent-training" element={<TeacherMwlParentTraining />} />
          <Route path="/teacher/mwl-lesson-prep" element={<TeacherMwlLessonPrep />} />
          <Route path="/teacher/mwl-lesson-prep-subject" element={<TeacherMwlLessonPrepSubject />} />
          <Route path="/teacher/mwl-lesson-prep-lesson" element={<TeacherMwlLessonPrepLesson />} />
          <Route path="/teacher/mwl-micro-credentials-domain-training-lesson" element={<TeacherMwlMicroCredentialsDomainTrainingLesson />} />
          <Route path="/teacher/student-lesson-quiz" element={<TeacherStudentLessonQuiz />} />
          <Route path="/teacher/student-baseline-assessment" element={<TeacherStudentBaselineAssessment />} />
          <Route path="/teacher/student-summative-assessment" element={<TeacherStudentSummativeAssessment />} />

          <Route path="/teacher/progress-student-baseline-assessment" element={<TeacherStudentBaselineAssessment />} />
          <Route path="/teacher/progress-student-lesson-quiz" element={<TeacherStudentLessonQuiz />} />
          <Route path="/teacher/progress-student-summative-assessment" element={<TeacherStudentSummativeAssessment />} />

          <Route path="/teacher/mwl-micro-credentials-domain-training-lesson" element={<TeacherMwlMicroCredentialsDomainTrainingLesson />} />
          <Route path="/teacher/onboarding" element={<TeacherMwlParentTraining />} />
        </Route>
      </Route>

      {/* Principal */}
      <Route element={<RoleBasedRoute allowedRoles={[Roles.PRINCIPAL]} />}>
        <Route element={<PrincipalLayout />}>
          <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
          <Route path="/principal/teachers-students" element={<TeachersAndStudents />} />
          <Route path="/principal/profile" element={<PrincipalProfile />} />
          <Route path="/principal/class-detail/:subjectId" element={<Classdetails />} />
          <Route path="/principal/student-profile" element={<PricipalStudentprofile />} />
          <Route path="/principal/student-baseline-assesment" element={<PrincipleStudentbaseline />} />
          <Route path="/principal/student-lesson-quiz/:studentId" element={<PrincipleStudentLessonquiz />} />
          <Route path="/principal/student-subject-summative/:subjectId" element={<PrincipleSubjectSummativedetails />} />
          <Route path="/principal/student-subject-detail/:subjectId" element={<PrincipleSubjectDetails />} />
          <Route path="/principal/subject-baseline-detail/:subjectId" element={<SubjectBaselinedetails />} />
          <Route path="/principal/subject-lesson-detail/:subjectId/:lessonId" element={<SubjectLessondetail />} />

          <Route path="/principal/teacher-profile" element={<PrincipalTeacherProfile />} />
          <Route path="/principal/student-summative" element={<PrincipleSummative />} />
          <Route path="/principal/progress-and-score" element={<PrincipalProgressAndScore />} />
          <Route path="/principal/progress-student-baseline-assessment" element={<PrincipleStudentbaseline />} />
          <Route path="/principal/progress-student-summative-assessment" element={<PrincipleSummative />} />
          <Route path="/principal/progress-student-lesson-quiz" element={<PrincipleStudentLessonquiz />} />


          {/* //same components with different path for navbar : Teachers & students tab*/}
          <Route path="/principal/student/profile" element={<PricipalStudentprofile />} />
          <Route path="/principal/students/profile" element={<PricipalStudentprofile />} />
          <Route path="/principal-student-profiles" element={<PricipalStudentprofile />} />
          <Route path="/principal/class/detail/:subjectId" element={<Classdetails />} />
          <Route path="/principal/student/subject/detail/:subjectId" element={<PrincipleSubjectDetails />} />
          <Route path="/principal/student/baseline/assesment" element={<PrincipleStudentbaseline />} />
          <Route path="/principal/student/summative" element={<PrincipleSummative />} />
          <Route path="/principal/student/lesson/quiz/:studentId" element={<PrincipleStudentLessonquiz />} />
          <Route path="/principal/student-baseline/assesment" element={<PrincipleStudentbaseline />} />
          <Route path="/principal/students-summative" element={<PrincipleSummative />} />
          <Route path="/principal/student-lesson/quiz/:studentId" element={<PrincipleStudentLessonquiz />} />
          
          <Route path="/principal-student-baseline/assesment" element={<PrincipleStudentbaseline />} />
          <Route path="/principal-student-summative" element={<PrincipleSummative />} />
          <Route path="/principal-student-lesson/quiz/:studentId" element={<PrincipleStudentLessonquiz />} />

        </Route>
      </Route>


      <Route element={<RoleBasedRoute allowedRoles={[Roles.ADMIN]} />}>
        <Route element={<DistrictAdminLayout />}>
          <Route path="/district-admin/dashboard" element={<DistrictAdminDashboard />} />
          <Route path="/district-admin/teachers-students" element={<DistrictAdminTeachersAndStudents />} />
          <Route path="/district-admin/profile" element={<DistrictAdminProfile />} />
          <Route path="/district-admin/class-detail/:subjectId" element={<DistrictAdminClassdetails />} />
          <Route path="/district-admin/student-profile" element={<DistrictAdminStudentprofile />} />
          <Route path="/district-admin/student-baseline-assesment" element={<DistrictAdminStudentbaseline />} />
          <Route path="/district-admin/student-lesson-quiz/:studentId" element={<DistrictAdminStudentLessonquiz />} />
          <Route path="/district-admin/student-subject-summative/:subjectId" element={<DistrictAdminSubjectSummativedetails />} />
          <Route path="/district-admin/student-subject-detail/:subjectId" element={<DistrictAdminSubjectDetails />} />
          <Route path="/district-admin/subject-baseline-detail/:subjectId" element={<DistrictAdminSubjectBaselinedetails />} />
          <Route path="/district-admin/subject-lesson-detail/:subjectId/:lessonId" element={<DistrictAdminSubjectLessondetail />} />

          <Route path="/district-admin/teacher-profile" element={<DistrictAdminTeacherProfile />} />
          <Route path="/district-admin/student-summative" element={<DistrictAdminSummative />} />
          <Route path="/district-admin/progress-and-score" element={<DistrictAdminProgressAndScore />} />
          <Route path="/district-admin/progress-student-baseline-assessment" element={<DistrictAdminStudentbaseline />} />
          <Route path="/district-admin/progress-student-summative-assessment" element={<DistrictAdminSummative />} />
          <Route path="/district-admin/progress-student-lesson-quiz" element={<DistrictAdminStudentLessonquiz />} />


          {/* //same components with different path for navbar : Teachers & students tab*/}
          <Route path="/district-admin/student/profile" element={<DistrictAdminStudentprofile />} />
          <Route path="/district-admin/students/profile" element={<DistrictAdminStudentprofile />} />
          <Route path="/district-admin-student-profiles" element={<DistrictAdminStudentprofile />} />
          <Route path="/district-admin/class/detail/:subjectId" element={<DistrictAdminClassdetails />} />
          <Route path="/district-admin/student/subject/detail/:subjectId" element={<DistrictAdminSubjectDetails />} />
          <Route path="/district-admin/student/baseline/assesment" element={<DistrictAdminStudentbaseline />} />
          <Route path="/district-admin/student/summative" element={<DistrictAdminSummative />} />
          <Route path="/district-admin/student/lesson/quiz/:studentId" element={<DistrictAdminStudentLessonquiz />} />
          <Route path="/district-admin/student-baseline/assesment" element={<DistrictAdminStudentbaseline />} />
          <Route path="/district-admin/students-summative" element={<DistrictAdminSummative />} />
          <Route path="/district-admin/student-lesson/quiz/:studentId" element={<DistrictAdminStudentLessonquiz />} />
          
          <Route path="/district-admin-student-baseline/assesment" element={<DistrictAdminStudentbaseline />} />
          <Route path="/district-admin-student-summative" element={<DistrictAdminSummative />} />
          <Route path="/district-admin-student-lesson/quiz/:studentId" element={<DistrictAdminStudentLessonquiz />} />

        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
