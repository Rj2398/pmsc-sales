import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  getTeacherDetails,
  studentList,
} from "../../redux/slices/principal/teacherAndStudentsSlice";
import {
  getSubjectLevel,
  getSubjectsByLevel,
} from "../../redux/slices/principal/principalDashboardSlice";
import Select from "react-select";
import { getAllSchoolList } from "../../redux/slices/districtAdmin/districtSlice";

const TeachersAndStudents = () => {
  const dispatch = useDispatch();
  const { classLevels, subDashboard, allSubjects } = useSelector(
    (state) => state.principalDashboard
  );
  const { teacherDetails, studentData } = useSelector(
    (state) => state.teacherAndStudents
  );
  const { allSchoolList } = useSelector((state) => state.districtDashboard);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showStudents, setShowStudents] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(() => {
    return localStorage.getItem("schoolID") || null;
  });

  const [selectedLevel, setSelectedLevel] = useState(() => {
    return localStorage.getItem("classLevel") || null;
  });

  useEffect(() => {
    dispatch(getSubjectLevel());
    dispatch(getAllSchoolList());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedLevel && classLevels?.length > 0) {
      const defaultLevel = classLevels[0].id;
      setSelectedLevel(defaultLevel);
      localStorage.setItem("classLevel", defaultLevel);
    }
  }, [selectedLevel]);

  useEffect(() => {
    if (selectedSchool == null && allSchoolList?.length > 0) {
      const defaultLevel = allSchoolList?.[0].id;
      setSelectedSchool(defaultLevel);
      localStorage.setItem("schoolID", defaultLevel);
    }
  }, [selectedSchool, allSchoolList]);

  useEffect(() => {
    if (selectedLevel) {
      // dispatch(getSubjectsByLevel({ level_id: selectedLevel }));
      // dispatch(getPrincipalSubDashboard({ level_id: selectedLevel }));
      dispatch(
        getTeacherDetails({
          level_id: selectedLevel,
          search: searchQuery,
          school_id: selectedSchool,
        })
      );
    }
  }, [dispatch, selectedLevel, selectedSchool]);

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setSelectedLevel(newLevel);
    localStorage.setItem("classLevel", newLevel);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeacher = teacherDetails.filter(
    (teacher) =>
      teacher?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTeacherClick = (id) => {
    dispatch(studentList({ teacher_id: id, school_id: selectedSchool }));
    if (selectedTeacher === id) {
      setSelectedTeacher(null);
    } else {
      setSelectedTeacher(id);
    }
    setShowStudents(!showStudents);
  };

  //paginnation for teacher

  const [currentPage, setCurrentPage] = useState(1);
  const [navigationPage, setNavigationPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTeacher?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredTeacher?.slice(startIndex, endIndex);

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

  // const options = classLevels?.map((level) => ({
  //   value: level?.id,
  //   label: level?.name,
  // }));

  const options = classLevels?.slice(1).map((level) => ({
    value: level?.id,
    label: level?.name,
  }));

  const handleSchoolChange = (event) => {
    const newLevel = event.target.value;
    setSelectedSchool(newLevel);
    localStorage.setItem("schoolID", newLevel);
  };

  const schoolOptions = allSchoolList?.map((level) => ({
    value: level?.id,
    label: level?.school,
  }));

  return (
    <>
      <div className="top-head prog-sco-wrp">
        <div className="top-head-in">
          <h1>Teachers & Students</h1>
          <p>Manage teachers and view student assignments</p>
        </div>
        <div className="students-src ms-auto me-3">
          <input
            type="text"
            placeholder="Search emails by subject, sen....."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* <select value={selectedLevel || ""} name="level" onChange={handleLevelChange} >
          {classLevels?.map((level, index) => (
            <option key={index} value={level?.id}> {level?.name}</option>
          ))}
        </select> */}
        <div className="influ-btns">
          <Select
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "38px",
                width: "180px",
                fontSize: "16px",
                borderColor: "#4126A8",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#4126A8",
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#4126A8" : "white",
                color: state.isFocused ? "white" : "#333",
                "&:active": {
                  backgroundColor: "#4126A8",
                },
              }),
            }}
            options={schoolOptions}
            value={schoolOptions?.find((opt) => opt.value == selectedSchool)}
            onChange={(selected) =>
              handleSchoolChange({
                target: { name: "level", value: selected.value },
              })
            }
          />

          <Select
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "38px",
                fontSize: "16px",
                borderColor: "#4126A8",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#4126A8",
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#4126A8" : "white",
                color: state.isFocused ? "white" : "#333",
                "&:active": {
                  backgroundColor: "#4126A8",
                },
              }),
            }}
            className="level-dropdown"
            options={options}
            value={options?.find((opt) => opt.value == selectedLevel)}
            onChange={(selected) =>
              handleLevelChange({
                target: { name: "level", value: selected.value },
              })
            }
          />
        </div>
      </div>
      <div className="subjects-lesson-progress teachers-students-wrp">
        <div className="row">
          <div className="col-lg-6">
            <div className="my-subjects">
              <div className="my-subjects-head">
                <h3>
                  <img src="../images/teachers-students/user.svg" alt="" />{" "}
                  Teachers
                  {/* Teachers ({teacherDetails.length}) */}
                </h3>
              </div>
              <div className="teachers-students-list">
                {currentItems.length === 0 ? (
                  <div>No Data Found...</div>
                ) : (
                  <>
                    {currentItems?.map((teacher) => (
                      <div
                        key={teacher.id}
                        className="teachers-students-item teachers-item"
                        onClick={() => handleTeacherClick(teacher.id)}
                      >
                        <h2>
                          {teacher.name}
                          <span>
                            {/* {teacher.status === 1 ? "Active" : "In-active"} */}
                          </span>

                          <Link
                            to="/district-admin/teacher-profile"
                            state={{ teacherId: teacher.id }}
                          >
                            <img
                              src="../images/teachers-students/eye.svg"
                              alt=""
                            />{" "}
                            View
                          </Link>
                        </h2>
                        <ul>
                          <li>
                            <img
                              src="../images/teachers-students/mail.svg"
                              alt=""
                            />
                            {teacher.email}
                          </li>
                          <li>
                            <img
                              src="../images/teachers-students/cap.svg"
                              alt=""
                            />
                            {teacher.student_count} Students
                          </li>
                        </ul>
                      </div>
                    ))}
                  </>
                )}

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
                      // style={{color: "#fff", backgroundColor: "#4126A8", width: "40px"}}

                      style={{
                        // margin: "0 5px",
                        fontWeight: number === currentPage ? "bold" : "normal",
                        backgroundColor:
                          number === currentPage ? "#4126A8" : "white",
                        color: number === currentPage ? "white" : "black",
                        // borderRadius: "5px",
                        padding: "2px",
                        cursor: "pointer",
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
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="my-subjects">
              <div className="my-subjects-head">
                <h3>
                  <img src="../images/teachers-students/user.svg" alt="" />{" "}
                  Select a Student
                </h3>
              </div>

              <div
                className="no-data-wrap"
                style={selectedTeacher ? { display: "none" } : {}}
              >
                <div className="teachers-students-no-data">
                  <img src="/images/teachers-students/no-users.svg" alt="" />
                  <p>Select a teacher to view their assigned students.</p>
                </div>
              </div>

              <div
                className="students-list"
                style={
                  selectedTeacher ? { display: "block" } : { display: "none" }
                }
              >
                <div className="teachers-students-list">
                  {/* <!-- I --> */}
                  {studentData.length === 0 ? (
                    <div className="teachers-students-item">
                      <p>No Data Found...</p>
                    </div>
                  ) : (
                    <>
                      {studentData.map((student, index) => (
                        <div className="teachers-students-item" key={index}>
                          <h2>
                            {student.name}
                            <span>
                              {/* {student.status === 1 ? "Active" : "In-active"} */}
                            </span>
                            <Link
                              to="/district-admin/student/profile"
                              state={{
                                studentId: student.id,
                                principalComing: "principalComing",
                              }}
                            >
                              <img
                                src="../images/teachers-students/eye.svg"
                                alt=""
                              />
                              View
                            </Link>
                          </h2>
                          <ul>
                            <li>
                              <img
                                src="../images/teachers-students/analytics.svg"
                                alt=""
                              />
                              {student.progress}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeachersAndStudents;
