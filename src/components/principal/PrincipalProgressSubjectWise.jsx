import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getStudentList2 } from "../../redux/slices/teacher/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrincipalProgressScore,
  getPrincipalSubjectQuizScore,
} from "../../redux/slices/principal/principalProgressSlice";

const PrincipalProgressSubjectWise = ({ subjectList, classList }) => {
  const dispatch = useDispatch();
  const currentLevel = localStorage.getItem("classLevel");

  const [activeDropdown, setActiveDropdown] = useState(null);

  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const { studentList2 } = useSelector((state) => state.dashboard);
  const { subjectWizeScoreData } = useSelector(
    (state) => state.principalProgress
  );

  const [classSearch, setClassSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [lessonToggle, setLessonToggle] = useState(false);

  useEffect(() => {
    if (selectedClasses) {
      dispatch(
        getStudentList2({
          class: selectedClasses?.includes("all") ? ["all"] : selectedClasses,
        })
      );
    }
  }, [selectedClasses]);

  useEffect(() => {
    if (subjectList) {
      setSelectedCourses([subjectList?.[0]?.id]);
    }
  }, [subjectList]);

  useEffect(() => {
    if (selectedStudents?.length > 0) {
      dispatch(getPrincipalSubjectQuizScore({student_id: selectedStudents?.includes("all") ? ["all"] : selectedStudents,subject_id: selectedCourses}));
    }
  }, [selectedStudents, selectedCourses]);

  const handleToggle = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id)); // Uncheck
    } else {
      setList([...list, id]); // Check
    }
  };

  const filteredClasses = classList?.filter((item) =>
    item.name.toLowerCase().includes(classSearch?.toLowerCase())
  );

  const filteredStudents = studentList2?.filter((item) =>
    item.name.toLowerCase().includes(studentSearch.toLowerCase())
  );

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
    <div className="my-subjects">
      <div className="top-head">
        <div className="top-head-in">
          <h1 className="mb-0"> Scores by Student & Subject </h1>
        </div>
        <div className="influ-btns ms-auto">

          {/* Student Dropdown */}
          <div className="influ-dropdown">
            <button
              className="influ-btn influ-drop-btn"
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "studentDropdown"
                    ? null
                    : "studentDropdown"
                )
              }
            >
              All Students{" "}
              <i
                className={`fa-regular ${
                  activeDropdown === "studentDropdown"
                    ? "fa-angle-up"
                    : "fa-angle-down"
                } `}
              ></i>
            </button>

            <div
              className="influ-drop-list"
              style={{
                display:
                  activeDropdown === "studentDropdown" ? "block" : "none",
              }}
            >
              <div className="influ-drop-list-search">
                <button type="submit">
                  <img src="images/search-icon.svg" alt="" />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>

              <div className="influ-drop-list-inner">
                {filteredStudents?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(item.id)}
                      onChange={() => {
                        if (selectedStudents.includes(item.id)) {
                          setSelectedStudents([]);
                        } else {
                          setSelectedStudents([item.id]);
                        }
                      }}
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* lifedream dropdown */}

          <div className="influ-dropdown">
            <button
              className="influ-btn influ-drop-btn"
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "courseDropdown" ? null : "courseDropdown"
                )
              }
            >
              {subjectList?.find((item) => item.id === selectedCourses[0])
                ?.name || "All Subjects"}{" "}
              <i
                className={`fa-regular ${
                  activeDropdown === "courseDropdown"
                    ? "fa-angle-up"
                    : "fa-angle-down"
                } `}
              ></i>
            </button>
            <div
              className="influ-drop-list"
              style={{
                display: activeDropdown === "courseDropdown" ? "block" : "none",
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
                          setSelectedCourses([]);
                        } else {
                          setSelectedCourses([item.id]);
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
      </div>
      <div className="table-responsive">
        <table>
          {selectedStudents?.length > 0 && selectedCourses?.length > 0 ? (
            <tbody>
              <tr>
                <th style={{ width: "250px" }}> Measurement Type </th>
                <th>Lesson </th>
                <th style={{ width: "250px" }}>Score </th>
                <th>Status </th>
                <th>Action </th>
              </tr>
              <tr>
                <td> Baseline Assessment </td>
                <td>---</td>
                <td>
                  <div className="prog">
                    <span>
                      {subjectWizeScoreData?.[0]?.baseline_score || 0}% 
                    </span>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            subjectWizeScoreData?.[0]?.baseline_score || 0
                          }%`,
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
                    className={`status ${subjectWizeScoreData?.[0]?.baseline_status == "not_started" && "inactive"} ${
                      [ "not_completed", "in_progress"].includes(subjectWizeScoreData?.[0]?.baseline_status) && "review"
                    }`}
                  > 
                    {subjectWizeScoreData?.[0]?.baseline_status
                      ? subjectWizeScoreData?.[0]?.baseline_status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())
                      : "Not Started"}
                  </div>
                </td>
                {!["not_started", "not_completed", "in_progress", "locked"].includes(
                  subjectWizeScoreData?.[0]?.baseline_status
                ) && (
                  <td>
                    <Link
                      to="/principal/progress-student-baseline-assessment"
                      state={{
                        studentId: selectedStudents?.[0],
                        subjectId: selectedCourses?.[0],
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
                  onClick={() => setLessonToggle(!lessonToggle)}
                  style={{ cursor: "pointer" }}
                >
                  All Lessons
                  {subjectWizeScoreData?.[0]?.lesson_wise?.length > 0 && (
                    <button type="button" className="lessons-btn">
                      <i className="fa-regular fa-angle-down"></i>
                    </button>
                  )}
                </td>
                <td> &nbsp; </td>
                <td>
                  <div
                    className={`status ${(subjectWizeScoreData?.[0]?.lesson_overall_status == "not_started" || subjectWizeScoreData?.[0]?.lesson_overall_status == "locked") && "inactive"} ${
                      ["not_completed", "in_progress", "locked"].includes(
                        subjectWizeScoreData?.[0]?.lesson_overall_status
                      ) && "review"
                    }`}
                  >
                    {subjectWizeScoreData?.[0]?.lesson_overall_status
                      ? subjectWizeScoreData?.[0]?.lesson_overall_status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())
                      : "Not Started"}
                  </div>
                </td>
              </tr>

              {/* <!-- LESSONS-DROPDOWN-LIST --> */}
              {subjectWizeScoreData?.[0]?.lesson_wise?.map((item, index) => (
                <tr
                  className="lessons-list"
                  style={{ display: lessonToggle ? "" : "none" }}
                  key={index}
                >
                  <td>&nbsp;</td>
                  <td>{item?.lesson_name}</td>
                  <td>
                    <div className="prog">
                      <span> {item?.percentage || 0}% </span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: `${item?.percentage || 0}%` }}
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
                        ["not_completed", "in_progress"].includes(
                          item?.status
                        ) && "review"
                      } ${(item?.status == "not_started" || item?.status == "locked") && "inactive"}`}
                    >
                      {item?.status
                        ?.replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                        "Not Started"}
                    </div>
                  </td>
                  {!["not_started", "not_completed", "in_progress", "locked"].includes(
                    item?.status
                  ) && (
                    <td>
                      <Link
                        to={`/principal/progress-student-lesson-quiz?lessonId=${item?.lesson_id}&studentId=${selectedStudents?.[0]}`}
                        state={{ param: "/teacher/progress-and-score" }}
                      >
                        <i className="fa-light fa-eye"></i> View Full Details
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
              <tr>
                <td>Summative Assessment</td>
                <td>---</td>
                <td>
                  <div className="prog">
                    <span> {subjectWizeScoreData?.[0]?.summative_score || 0}% </span>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            subjectWizeScoreData?.[0]?.summative_score || 0
                          }%`,
                          backgroundColor: ["review", "not_completed", "in_progress", ].includes(
                            subjectWizeScoreData?.[0]?.summative_status) ? "#F28100" : "#16a34a",
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
                    className={`status ${subjectWizeScoreData?.[0]?.summative_status == "locked" && "inactive"} ${
                      ["not_started", "not_completed", "in_progress", ].includes(
                        subjectWizeScoreData?.[0]?.summative_status
                      ) && "review" 
                    }` }
                  >
                    {subjectWizeScoreData?.[0]?.summative_status
                      ? subjectWizeScoreData?.[0]?.summative_status
                          ?.replace(/_/g, " ")
                          ?.replace(/\b\w/g, (char) => char?.toUpperCase())
                      : "Not Started"}
                  </div>
                </td>
                {!["not_started", "not_completed", "in_progress", "locked"].includes(
                  subjectWizeScoreData?.[0]?.summative_status
                ) && (
                  <td>
                    <Link
                      to="/principal/progress-student-summative-assessment"
                      state={{
                        studentId: selectedStudents?.[0],
                        subjectId: selectedCourses?.[0],
                      }}
                    >
                      <i className="fa-light fa-eye"></i> View Full Details
                    </Link>
                  </td>
                )}
              </tr>
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px 0" }}
                >
                  {selectedCourses?.length < 0
                    ? "Please select any subject."
                    : "Please select any student."}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default PrincipalProgressSubjectWise;
