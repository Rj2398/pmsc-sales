import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjectList,
  setTeacherStudentName,
  studentProfilePerformance,
} from "../../redux/slices/teacher/dashboardSlice";
import EarnedCertificate from "../../components/student/EarnedCertificate";

const StudentProfile = () => {
  const teacherCurrentSubjectTaped = localStorage.getItem(
    "teacherCurrentSubject"
  );
  const isAllowedDomain =
    teacherCurrentSubjectTaped === "Self Awareness" ||
    teacherCurrentSubjectTaped === "Interpersonal Relationships";
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const currentLevel = localStorage.getItem("classLevel");

  const studentId = location?.state?.studentId;
  const subjectId = location?.state?.subjectId;

  const { studentProfileInfo, subjectList } = useSelector(
    (state) => state.dashboard
  );
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAllLession, setShowAllLesson] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    dispatch(
      studentProfilePerformance({
        student_id: studentId,
        subject_id:
          selectedCourses?.length > 0 ? selectedCourses?.[0] : subjectId,
      })
    );
  }, [studentId, selectedCourses]);

  useEffect(() => {
    if (currentLevel) {
      dispatch(getSubjectList({ level_id: currentLevel }));
    }
  }, [currentLevel]);

  useEffect(() => {
    if (studentProfileInfo) {
      dispatch(setTeacherStudentName(studentProfileInfo?.student_name));
    }
  }, [studentProfileInfo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll(".influ-dropdown");
      let clickedInsideDropdown = false;

      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target)) {
          clickedInsideDropdown = true;
        }
      });

      if (!clickedInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="top-head prog-sco-wrp">
        <div className="top-head-in">
          <h1>Student Profile</h1>
          <p>Detailed view of student performance and progress</p>
        </div>
        <div className="back-btn">
          <Link to="#" onClick={() => navigate(-1)}>
            <img src="../images/baseline-assessment/back-icon.svg" alt="back" />{" "}
            Back
          </Link>
        </div>
      </div>

      <div className="student-short-info">
        <h3>
          {" "}
          {studentProfileInfo?.student_name}
          <span style={{ width: "50px" }}></span>
        </h3>
        <p>
          {" "}
          {studentProfileInfo?.student_email}
          {/* <b>{studentProfileInfo?.overall_score}%</b>  */}
        </p>
      </div>

      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">Subject Quiz Scores</h1>
          </div>

          <div className="influ-btns ms-auto">
            <div className="influ-dropdown">
              <button
                className="influ-btn influ-drop-btn"
                type="button"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "courseDropdown"
                      ? null
                      : "courseDropdown"
                  )
                }
              >
                {" "}
                All Subjects
                <i
                  className={`fa-solid ${
                    activeDropdown === "courseDropdown"
                      ? "fa-angle-up"
                      : "fa-angle-down"
                  }`}
                ></i>
              </button>
              <div
                className="influ-drop-list"
                style={{
                  display:
                    activeDropdown === "courseDropdown" ? "block" : "none",
                }}
              >
                <div className="influ-drop-list-inner">
                  {subjectList?.map((item) => (
                    <div key={item.id} className="influ-drop-list-item">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(item.id)}
                        onChange={() => {
                          if (selectedCourses.includes(item.id)) {
                            setSelectedCourses([]); // Unselect if already selected
                          } else {
                            setSelectedCourses([item.id]); // Select this student only
                          }
                        }}
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {!showFullDetails && (
            <div className="back-btn ms-2">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setShowFullDetails((prev) => !prev);
                  setActiveDropdown(
                    activeDropdown === "lessionDropdown"
                      ? null
                      : "lessionDropdown"
                  );
                }}
              >
                <img src="../images/view-icon.svg" alt="" /> View Full Details
              </a>
            </div>
          )}
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: "250px" }}>Assessment Type</th>
                <th>Lesson </th>
                <th style={{ width: "300px" }}>Score </th>
                <th>Status </th>
                {showFullDetails && <th>Action </th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> Baseline Assessment </td>
                <td>---</td>
                <td>
                  <div className="prog">
                    <span>{studentProfileInfo?.baseline_score}% </span>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${studentProfileInfo?.baseline_score}%`,
                          backgroundColor: [
                            "not_started",
                            "not_completed",
                            "in_progress",
                            "retake",
                            "review"
                          ].includes(studentProfileInfo?.status)
                            ? "#F28100"
                            : "#16a34a",
                        }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>

                <td>
                  <div
                    className={`status ${
                      ["not_started", "locked", ""].includes(
                        studentProfileInfo?.baseline_status
                      ) && "inactive"
                    } ${
                      ["not_completed", "in_progress", "review", "retake"].includes(
                        studentProfileInfo?.baseline_status
                      ) && "review"
                    }`}
                  >
                    {studentProfileInfo?.baseline_status
                      ?.replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                      "Not Started"}
                  </div>
                </td>
                <td>
                  {showFullDetails &&
                    ![
                      "not_started",
                      "not_completed",
                      "in_progress",
                      "locked",
                    ].includes(studentProfileInfo?.baseline_status) && (
                      <Link
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: "#999",
                          cursor: "not-allowed",
                          opacity: 0.6,
                        }}
                        to="/teacher/student-baseline-assessment"
                        state={{
                          studentId: studentId,
                          subjectId:
                            selectedCourses?.length > 0
                              ? selectedCourses?.[0]
                              : subjectId,
                        }}
                      >
                        <i className="fa-solid fa-eye"></i> View Full Details
                      </Link>
                    )}
                </td>
              </tr>
              <tr>
                <td>Lesson Quizzes</td>
                <td onClick={() => setShowAllLesson(!showAllLession)}>
                  {" "}
                  All Lessons
                  <button type="button" className="lessons-btn">
                    <i className="fa-solid fa-angle-down"></i>
                  </button>
                </td>
                <td>&nbsp;</td>
                <td>
                  <div
                    className={`status ${
                      ["not_started", "locked", ""].includes(
                        studentProfileInfo?.lesson_overall_status
                      ) && "inactive"
                    } ${
                      ["not_completed", "in_progress", "review", "retake", ""].includes(
                        studentProfileInfo?.lesson_overall_status
                      ) && "review"
                    }`}
                  >
                    {studentProfileInfo?.lesson_overall_status
                      ?.replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                      "Not Started"}
                  </div>
                </td>
              </tr>

              {/* This section dynamically generates the dropdown list */}

              {/* {studentProfileInfo?.lesson_wise?.map((lesson, index) => (
                <tr
                  key={index}
                  className="lessons-list"
                  style={showAllLession ? {} : { display: "none" }}
                >
                  <td>&nbsp;</td>
                  <td>{lesson?.lesson_name}</td>
                  <td>
                    <div className="prog">
                      <span>{lesson?.percentage}% </span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${lesson?.percentage}%`,
                            backgroundColor: [
                              "not_started",
                              "not_completed",
                              "in_progress",
                              "review",
                            ].includes(lesson?.status)
                              ? "#F28100"
                              : "#16a34a",
                          }}
                          role="progressbar"
                          aria-label={`Progress for Lesson ${lesson?.lesson_id}`}
                          aria-valuenow={lesson?.percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`status ${
                        ["not_started", "locked"].includes(lesson?.status) &&
                        "inactive"
                      } ${
                        ["not_completed", "in_progress", "review"].includes(
                          lesson?.status
                        ) && "review"
                      }`}
                    >
                      {lesson?.status
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </div>
                  </td>

                  {showFullDetails &&
                    ![
                      "not_started",
                      "not_completed",
                      "in_progress",
                      "locked",
                    ].includes(lesson?.status) && (
                      <td>
                        <Link
                          to={`/teacher/student-lesson-quiz?lessonId=${lesson?.lesson_id}&studentId=${studentId}`}
                        >
                          <i className="fa-solid fa-eye"></i> View Full Details
                        </Link>
                      </td>
                    )}
                </tr>
              ))} */}
              {studentProfileInfo?.lesson_wise?.map((lesson, index) => (
                <tr
                  key={index}
                  className="lessons-list"
                  style={showAllLession ? {} : { display: "none" }}
                >
                  <td>&nbsp;</td>

                  {/* Lesson Name */}
                  <td>{lesson?.lesson_name}</td>

                  {/* Progress (REAL DATA) */}
                  <td>
                    <div className="prog">
                      <span>{lesson?.percentage}%</span>

                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${lesson?.percentage}%`,
                            backgroundColor: [
                              "not_started",
                              "not_completed",
                              "in_progress",
                              "review",
                              "retake"
                            ].includes(lesson?.status)
                              ? "#F28100"
                              : "#16a34a",
                          }}
                          role="progressbar"
                          aria-label={`Progress for Lesson ${lesson?.lesson_id}`}
                          aria-valuenow={lesson?.percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Status (AS IT IS) */}
                  <td>
                    <div
                      className={`status ${
                        ["not_started", "locked"].includes(lesson?.status) &&
                        "inactive"
                      } ${
                        ["not_completed", "in_progress", "review", "retake"].includes(
                          lesson?.status
                        ) && "review"
                      }`}
                    >
                      {lesson?.status
                        ?.replace(/_/g, " ")
                        ?.replace(/\b\w/g, (char) => char.toUpperCase())}
                    </div>
                  </td>

                  {/* View Full Details (ONLY THIS DISABLED) */}
                  {showFullDetails && (
                    <td>
                      <Link
                        to={
                          isAllowedDomain && index < 2
                            ? `/teacher/student-lesson-quiz?lessonId=${lesson?.lesson_id}&studentId=${studentId}`
                            : "#"
                        }
                        onClick={(e) => {
                          if (!(isAllowedDomain && index < 2)) {
                            e.preventDefault(); // ❌ disable click
                          }
                        }}
                        style={{
                          color: isAllowedDomain && index < 2 ? "" : "#999",
                          cursor:
                            isAllowedDomain && index < 2
                              ? "pointer"
                              : "not-allowed",
                          opacity: isAllowedDomain && index < 2 ? 1 : 0.6,
                        }}
                      >
                        <i className="fa-solid fa-eye"></i> View Full Details
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
              <tr>
                <td>Summative Assessment </td>
                <td>---</td>
                <td>
                  <div className="prog">
                    <span>{studentProfileInfo?.summative_score}% </span>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${studentProfileInfo?.summative_score}%`,
                          backgroundColor: [
                            "not_started",
                            "not_completed",
                            "in_progress",
                            "review",
                            "retake"
                          ].includes(studentProfileInfo?.summative_status)
                            ? "#F28100"
                            : "#16a34a",
                        }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    className={`status ${
                      ["locked", "not_started", ""].includes(
                        studentProfileInfo?.summative_status
                      ) && "inactive"
                    } ${
                      ["not_completed", "in_progress", "review", "retake"].includes(
                        studentProfileInfo?.summative_status
                      ) && "review"
                    }`}
                  >
                    {studentProfileInfo?.summative_status
                      ?.replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                      "Not Started"}
                  </div>
                </td>
                <td>
                  {showFullDetails &&
                    ![
                      "not_started",
                      "not_completed",
                      "in_progress",
                      "locked",
                    ].includes(studentProfileInfo?.summative_status) && (
                      <Link
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: "#999",
                          cursor: "not-allowed",
                          opacity: 0.6,
                        }}
                        to="/teacher/student-summative-assessment"
                        state={{
                          studentId: studentId,
                          subjectId:
                            selectedCourses?.length > 0
                              ? selectedCourses?.[0]
                              : subjectId,
                        }}
                      >
                        <i className="fa-solid fa-eye"></i> View Full Details
                      </Link>
                    )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {studentId && <EarnedCertificate studentId={studentId} />}
    </>
  );
};

export default StudentProfile;
