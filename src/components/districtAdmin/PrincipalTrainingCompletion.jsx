import { useEffect, useState } from "react";
import { getStudentList2 } from "../../redux/slices/teacher/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

import { getPrincipalTeacherTraining } from "../../redux/slices/principal/principalProgressSlice";
import { getTeacherDetails } from "../../redux/slices/principal/teacherAndStudentsSlice";
import { getSubjectLevel } from "../../redux/slices/principal/principalDashboardSlice";

const PrincipalTrainingCompletion = ({
  subjectList,
  classList,
  selectedSchool,
}) => {
  const dispatch = useDispatch();
  const currentLevel = localStorage.getItem("classLevel");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const { studentList2 } = useSelector((state) => state.dashboard);
  const { teacherTrainingData } = useSelector(
    (state) => state.principalProgress
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [navigationPage, setNavigationPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(teacherTrainingData?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = teacherTrainingData?.slice(startIndex, endIndex);

  // This function is for "Previous" and "Next" buttons only
  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNavigate = (direction) => {
    if (direction === "next" && navigationPage < totalPages) {
      setNavigationPage(navigationPage + 1);
      setCurrentPage(navigationPage + 1);
    } else if (direction === "prev" && navigationPage > 1) {
      setNavigationPage(navigationPage - 1);
      setCurrentPage(navigationPage - 1);
    }
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = navigationPage;
    const endPage = Math.min(navigationPage + 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  //paginnation

  const { classLevels } = useSelector((state) => state.principalDashboard);
  const { teacherDetails } = useSelector((state) => state.teacherAndStudents);

  const [teacherSearch, setTeacherSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [lessonToggle, setLessonToggle] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState(() => {
    return localStorage.getItem("classLevel") || null;
  });

  useEffect(() => {
    dispatch(getSubjectLevel());
  }, [dispatch]);

  useEffect(() => {
    if (selectedLevel) {
      // dispatch(getSubjectsByLevel({ level_id: selectedLevel }));
      // dispatch(getPrincipalSubDashboard({ level_id: selectedLevel }));
      dispatch(
        getTeacherDetails({
          level_id: selectedLevel,
          school_id: selectedSchool,
        })
      );
    }
  }, [dispatch, selectedLevel]);

  useEffect(() => {
    if (!selectedLevel && classLevels?.length > 0) {
      const defaultLevel = classLevels[0].id;
      setSelectedLevel(defaultLevel);
      // localStorage.setItem("classLevel", defaultLevel);
    }
  }, [selectedLevel]);

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setSelectedLevel(newLevel);
    //   localStorage.setItem("classLevel", newLevel);
  };

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
    if (selectedStudents) {
      // dispatch(getPrincipalTeacherTraining({ level_id: classLevels.value, student_id: selectedStudents?.includes("all") ? ["all"] : selectedStudents, subject_id: selectedCourses }))
      dispatch(
        getPrincipalTeacherTraining({
          level_id: selectedLevel,
          user_id: selectedTeacher,
          school_id: selectedSchool,
        })
      );
    }
  }, [selectedTeacher, selectedLevel]);

  const handleToggle = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id)); // Uncheck
    } else {
      setList([...list, id]); // Check
    }
  };

  const filteredTeacher = teacherDetails?.filter((item) =>
    item.name.toLowerCase().includes(teacherSearch?.toLowerCase())
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
          <h1 className="mb-0">Teacher Domain Training Completion</h1>
        </div>
        <div className="influ-btns ms-auto">
          {/* Teachers Dropdown */}
          <div className="influ-dropdown">
            <button
              className="influ-btn influ-drop-btn"
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "teacherDropDown"
                    ? null
                    : "teacherDropDown"
                )
              }
            >
              All Teachers{" "}
              <i
                className={`fa-solid ${
                  activeDropdown === "teacherDropDown"
                    ? "fa-angle-up"
                    : "fa-angle-down"
                }`}
              ></i>
            </button>

            <div
              className="influ-drop-list"
              style={{
                display:
                  activeDropdown === "teacherDropDown" ? "block" : "none",
              }}
            >
              <div className="influ-drop-list-search">
                <button type="submit">
                  <img src="images/search-icon.svg" alt="" />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                />
              </div>
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input
                    type="checkbox"
                    checked={selectedTeacher.includes("all")}
                    onChange={() =>
                      handleToggle("all", selectedTeacher, setSelectedTeacher)
                    }
                  />
                  All Teacher
                </div>
                {filteredTeacher?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={
                        selectedTeacher.includes("all") ||
                        selectedTeacher.includes(item.id)
                      }
                      disabled={selectedTeacher.includes("all")}
                      onChange={() =>
                        handleToggle(
                          item.id,
                          selectedTeacher,
                          setSelectedTeacher
                        )
                      }
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All levels Dropdown */}
          {/* <div className="influ-dropdown">
            <select value={selectedLevel || ""} name="level" onChange={handleLevelChange} >
              <option value={classLevels?.map((l) => l.value).join(",")}>
                All Levels
              </option>
              {classLevels?.map((level, index) => (
                <option key={index} value={level?.value}>
                  {level?.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </div>
      <div className="table-responsive">
        <>
          <table>
            {teacherTrainingData?.length > 0 ? (
              <tbody>
                <tr>
                  <th style={{ width: "250px" }}>Teacher Name</th>
                  <th style={{ width: "150px" }}>Level</th>
                  <th> Completion % </th>
                  <th>Badge Status</th>
                </tr>
                {currentItems.map((trainingData, index) => (
                  <tr key={index}>
                    <td>{trainingData.teacher_name}</td>
                    <td>{trainingData?.class_level}</td>
                    <td>
                      <div className="prog">
                        <span> {trainingData?.overall_completion || 0}% </span>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${
                                trainingData?.overall_completion || 0
                              }%`,
                              backgroundColor: [
                                // "not_started",
                                "not_completed",
                                "in_progress",
                                "retake",
                                "review"
                              ].includes(trainingData?.status)
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
                      {(() => {
                        let completionText = "Not Started";
                        let completionColor = "#4B5563";

                        if (trainingData?.overall_completion === 0) {
                          completionText = "Not Started";
                          completionColor = "#4B5563";
                        } else if (trainingData?.overall_completion < 50) {
                          completionText = "In Progress";
                          completionColor = "#F28100";
                        } else {
                          completionText = "Earned";
                          completionColor = "green";
                        }

                        return (
                          <div
                            className={`status ${
                              [
                                "not_started",
                                "not_completed",
                                "in_progress",
                                "review",
                                "retake"
                              ].includes(trainingData?.overall_completion) &&
                              "review"
                            }`}
                            style={{ backgroundColor: completionColor }}
                          >
                            {completionText}
                          </div>
                        );
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "20px 0" }}
                  >
                    {"Please select any teacher."}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          {/* Pagination Controls */}
          <div
            className="panel-pagination"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <button
              className="page-btn"
              onClick={() => handleNavigate("prev")}
              disabled={navigationPage === 1}
            >
              Prev
            </button>
            {getPageNumbers().map((number) => (
              <button
                className="page-count"
                key={number}
                onClick={() => handlePageNumberClick(number)}
                style={{
                  // margin: "0 5px",
                  fontWeight: number === currentPage ? "bold" : "normal",
                  backgroundColor: number === currentPage ? "#4126A8" : "white",
                  color: number === currentPage ? "white" : "black",
                  border: "1px solid #ccc",
                  // borderRadius: "5px",
                  padding: "2px",
                  cursor: "pointer",
                  width: "40px",
                }}
              >
                {number}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => handleNavigate("next")}
              disabled={navigationPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default PrincipalTrainingCompletion;
