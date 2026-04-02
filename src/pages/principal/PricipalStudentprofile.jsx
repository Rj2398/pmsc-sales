import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import {
  getSubjectList,
  setprincipalStudentName,
  studentProfilePerformance,
} from "../../redux/slices/principal/principalDashboardSlice";
import EarnedCertificate from "../../components/student/EarnedCertificate";

const PricipalStudentprofile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const currentLevel = localStorage.getItem("classLevel");

  const studentId = location?.state?.studentId;

  const subjectId = location?.state?.subjectId;

  const principalComing = location?.state?.principalComing;
  const teacherStudentComing = location?.state?.teacherStudentComing;
  const principalstudentBaseline = location?.state?.principalstudentBaseline;

  const { studentProfileInfo, subjectList } = useSelector(
    (state) => state.principalDashboard
  );
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showAllLession, setShowAllLesson] = useState(false);

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
    if (subjectList) {
      setSelectedCourses([subjectList?.[0]?.id]);
    }
  }, [subjectList]);

  useEffect(() => {
    if (studentProfileInfo) {
      dispatch(setprincipalStudentName(studentProfileInfo?.student_name));
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
    <div>
      <div className="top-head prog-sco-wrp">
        <div className="top-head-in">
          <h1>Student Profile</h1>
          {/* <p>Detailed view of student performance and progress</p> */}
        </div>
        <div className="back-btn">
          <Link onClick={() => navigate(-1)}>
            <img src="../images/baseline-assessment/back-icon.svg" alt="" />{" "}
            Back
          </Link>
        </div>
      </div>

      <div className="student-short-info">
        <h3>
          {" "}
          {studentProfileInfo?.student_name}
          <span style={{ width: "52px" }}></span>
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
            <h1 className="mb-0"> Scores </h1>
          </div>
          <div className="influ-btns ms-auto">
            {/* <!-- INNER-DROPDOWN --> */}
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
                  <img src="/images/view-icon.svg" alt="view" /> View Full
                  Details
                </a>
              </div>
            )}
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th style={{ width: " 250px" }}>Measurement Type</th>
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
                              "not_completed",
                              "in_progress",
                              "retake",
                              "review",
                            ].includes(studentProfileInfo?.baseline_status)
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
                        studentProfileInfo?.baseline_status == "not_started" &&
                        "inactive"
                      } ${
                        ["not_completed", "in_progress"].includes(
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

                  {showFullDetails &&
                    !["not_started", "not_completed", "in_progress"].includes(
                      studentProfileInfo?.baseline_status
                    ) && (
                      <td>
                        <Link
                          to={
                            principalComing
                              ? "/principal/student/baseline/assesment"
                              : teacherStudentComing
                              ? "/principal/student-baseline/assesment"
                              : principalstudentBaseline
                              ? "/district-admin-student-baseline/assesment"
                              : "/principal/student-baseline-assesment"
                          }
                          state={{
                            studentId: studentId,
                            subjectId:
                              selectedCourses?.length > 0
                                ? selectedCourses?.[0]
                                : subjectId,
                          }}
                        >
                          <i className="fa-light fa-eye"></i> View Full Details
                        </Link>
                      </td>
                    )}
                </tr>
                <tr>
                  <td> Lesson Quizzes </td>
                  <td
                    onClick={() => setShowAllLesson(!showAllLession)}
                    style={{ cursor: "pointer" }}
                  >
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
                        ["not_completed", "in_progress", "retake"].includes(
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
                  <td>
                    {/* <Link to={`/principal/student-lesson-quiz/:studentId=${studentId}`}><i className="fa-light fa-eye"></i> View Full Details</Link> */}
                  </td>
                </tr>
                {studentProfileInfo?.lesson_wise?.map((lesson, index) => (
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
                                "retake",
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
                          [
                            "not_started",
                            "not_completed",
                            "in_progress",
                          ].includes(lesson?.status) && "review"
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
                            to={
                              principalComing
                                ? `/principal/student/lesson/quiz/:studentId=${studentId}`
                                : teacherStudentComing
                                ? `/principal/student-lesson-quiz/:studentId=${studentId}`
                                : principalstudentBaseline
                                ? `/district-admin-student-lesson/quiz/:studentId=${studentId}`
                                : `/principal/student-lesson-quiz/:studentId=${studentId}`
                            }
                            state={{
                              studentId: studentId,
                              lessonId: lesson?.lesson_id,
                              subjectId:
                                selectedCourses?.length > 0
                                  ? selectedCourses?.[0]
                                  : subjectId,
                            }}
                          >
                            <i className="fa-light fa-eye"></i> View Full
                            Details
                          </Link>
                        </td>
                      )}
                  </tr>
                ))}
                <tr>
                  <td> Summative Assessment </td>
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
                              "retake",
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
                        ["not_started", "locked"].includes(
                          studentProfileInfo?.summative_status
                        ) && "inactive"
                      } ${
                        ["not_completed", "in_progress", "retake"].includes(
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

                  {showFullDetails &&
                    ![
                      "not_started",
                      "not_completed",
                      "in_progress",
                      "locked",
                    ].includes(studentProfileInfo?.summative_status) && (
                      <td>
                        <Link
                          to={
                            principalComing
                              ? "/principal/student/summative"
                              : teacherStudentComing
                              ? "/principal/students-summative"
                              : principalstudentBaseline
                              ? "/district-admin-student-summative"
                              : "/principal/student-summative"
                          }
                          state={{
                            studentId: studentId,
                            subjectId:
                              selectedCourses?.length > 0
                                ? selectedCourses?.[0]
                                : subjectId,
                          }}
                        >
                          <i className="fa-light fa-eye"></i> View Full Details
                        </Link>
                      </td>
                    )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {studentId && <EarnedCertificate studentId={studentId} />}
    </div>
  );
};

export default PricipalStudentprofile;
