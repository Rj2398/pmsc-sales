import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getClassList, getStudentList, getSubjectList, } from "../../redux/slices/teacher/dashboardSlice";
import PrincipalProgressSubjectWise from "../../components/districtAdmin/PrincipalProgressSubjectWise";
import PrincipalTrainingCompletion from "../../components/districtAdmin/PrincipalTrainingCompletion";
import { getPrincipalProgressScore, getPrincipalSubjectGraph, } from "../../redux/slices/principal/principalProgressSlice";
import { ReportDownload } from "../../components/teacher/ReportPdfDowload";
import { getReportDownloadData } from "../../redux/slices/authSlice";
import { DistrictReportDownload, PDFPreviewButton } from "../../components/districtAdmin/DistrictReportDownload";
import Select from "react-select";
import { getAllSchoolList, getDistrictReportDownloadData, getTeacherList } from "../../redux/slices/districtAdmin/districtSlice";
import axios from "axios";

const PrincipalProgressAndScore = () => {
  const dispatch = useDispatch();
  const currentLevel = localStorage.getItem("classLevel");
  const { subjectList, classList, studentList } = useSelector((state) => state.dashboard);
  const { progressAndScoreData, progressGraphData } = useSelector((state) => state.principalProgress);
  const { classLevels } = useSelector((state) => state.principalDashboard);
  
  const { allSchoolList, allTeacherList, reportData, reportLoading } = useSelector((state) => state.districtDashboard);

  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [selectedSchool, setSelectedSchool] = useState([]);
  // const [selectedSchool, setSelectedSchool] = useState(() => {return localStorage.getItem("schoolID") || null;});
  const [selectedLevel, setSelectedLevel] = useState(() => {return localStorage.getItem("classLevel") || null;});
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    if (currentLevel) {
      dispatch(getClassList({ level_id: currentLevel }));
      dispatch(getSubjectList({ level_id: currentLevel }));
      dispatch(getTeacherList({ level_id: currentLevel }));
    }
  }, [currentLevel]);

  useEffect(() => {
    dispatch(getAllSchoolList());
  }, [dispatch]);

  // useEffect(() => {
  //   if (selectedSchool == null && allSchoolList?.length > 0) {
  //     const defaultLevel = allSchoolList?.[0].id;
  //     setSelectedSchool(defaultLevel);
  //     localStorage.setItem("schoolID", defaultLevel);
  //   }
  // }, [selectedSchool, allSchoolList]);

  useEffect(() => {
    if (selectedLevel == null && classLevels?.length > 0) {
      const defaultLevel = classLevels?.[0].id;
      setSelectedLevel(defaultLevel);
      localStorage.setItem("classLevel", defaultLevel);
    }
  }, [selectedLevel, classLevels]);

  useEffect(() => {
    const payload = { level_id: currentLevel, school_id: selectedSchool };

    // if (!selectedClasses.includes("all")) {
    //   payload.class_id = selectedClasses;
    // }

    // if (!selectedStudents.includes("all")) {
    //   payload.student_id = selectedStudents;
    // }
    
    payload.level_id = selectedLevel;
    payload.school_id = selectedSchool;

    if (!selectedTeachers.includes("all")) {
      payload.teacher_id = selectedTeachers;
    }

    if (!selectedCourses.includes("all")) {
      payload.subject_id = selectedCourses;
    }
    
    dispatch(getPrincipalProgressScore(payload));
    dispatch(getPrincipalSubjectGraph(payload));
    dispatch(getDistrictReportDownloadData(payload));
  }, [selectedLevel, selectedTeachers, selectedCourses, selectedSchool]);
  // }, [selectedClasses, selectedStudents, selectedCourses, selectedSchool]);

  const [classSearch, setClassSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  const handleToggle = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id)); // Uncheck
    } else {
      setList([...list, id]); // Check
    }
  };

  const filteredTeachers = allTeacherList?.filter((item) =>
    item?.name?.toLowerCase()?.includes(teacherSearch?.toLowerCase())
  );

  const filteredSchools = allSchoolList?.filter((item) =>
    item?.school?.toLowerCase()?.includes(schoolSearch?.toLowerCase())
  );

  // const filteredClasses = classList?.filter((item) =>
  //   item?.name?.toLowerCase()?.includes(classSearch?.toLowerCase())
  // );

  // const filteredStudents = studentList?.filter((item) =>
  //   item.name.toLowerCase().includes(studentSearch.toLowerCase())
  // );

  const colors = [
    {
      base: "#C951E7",
      lesson: "#D573ED",
      summative: "#F1B7FF",
      label: "Life Dream",
    },
    {
      base: "#6466E9",
      lesson: "#888AF3",
      summative: "#B4B5FC",
      label: "Self Awareness",
    },
    {
      base: "#55E6C1",
      lesson: "#82EBD0",
      summative: "#BDEFE2",
      label: "Cognitive Construction",
    },
    {
      base: "#FFC312",
      lesson: "#FEDB74",
      summative: "#FAE9B7",
      label: "Interpersonal Relationships",
    },
    {
      base: "#ED4C67",
      lesson: "#EC6F84",
      summative: "#F5ABB7",
      label: "Coping",
    },
  ];

  const handleSchoolChange = (event) => {
    const newLevel = event.target.value;
    setSelectedSchool(newLevel);
    localStorage.setItem("schoolID", newLevel);
  };
  
  const schoolOptions = allSchoolList?.map(level => ({
    value: level?.id,
    label: level?.school,
  }));

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setSelectedLevel(newLevel);
    localStorage.setItem("classLevel", newLevel);
  };

  const options = classLevels?.map(level => ({
    value: level?.id,
    label: level?.name,
  }));

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
          <h1> Student Completion </h1>
          {/* <p>Your Progress</p> */}
        </div>

        <div className="influ-btns ms-auto">
          {/* <Select isSearchable={false} styles={{
              control: (base) => ({
                ...base,
                minHeight: '44px',
                width:'150px',
                fontSize:"16px",
                borderRadius:"10px",
                borderColor:"#4126A8",
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#4126A8'
                }
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#4126A8' : 'white',
                color: state.isFocused ? 'white' : '#333',
                '&:active': {
                    backgroundColor: '#4126A8'
                }
              }),
            }} options={schoolOptions} value={schoolOptions?.find(opt => opt.value == selectedSchool)}
            onChange={selected => handleSchoolChange({ target: { name: 'level', value: selected.value }})}/> */}
          
          <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button"
              onClick={() => setActiveDropdown(activeDropdown === "schoolDropdown" ? null : "schoolDropdown")}>
              All Schools
              <i className={`fa-regular ${ activeDropdown === "schoolDropdown" ? "fa-angle-up": "fa-angle-down"}`}
              ></i>
            </button>
            <div className="influ-drop-list" style={{ display: activeDropdown === "schoolDropdown" ? "block" : "none",}}>
              <div className="influ-drop-list-search">
                <button type="submit">
                  <img src="images/search-icon.svg" alt="" />
                </button>
                <input type="text" placeholder="Search" value={schoolSearch} 
                  onChange={(e) => setSchoolSearch(e.target.value)}
                />
              </div>
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input type="checkbox" checked={selectedSchool.includes("all")}
                    onChange={() => {
                      if (selectedSchool.includes("all")) {
                        setSelectedSchool([]);
                      } else {
                        setSelectedSchool(["all"]);
                      }
                    }}
                  />
                  All Schools
                </div>

                {/* Individual Teacher Checkboxes */}
                {filteredSchools?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={selectedSchool.includes(item.id)}
                      onChange={() => {
                        if (selectedSchool.includes(item.id)) {
                          setSelectedSchool(selectedSchool.filter((id) => id !== item.id));
                        } else {
                          setSelectedSchool([...selectedSchool, item.id]);
                        }
                      }}
                    />
                    {item.school}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Select isSearchable={false} styles={{
              control: (base) => ({
                ...base,
                minHeight: '44px',
                width:'150px',
                fontSize:"16px",
                borderRadius:"10px",
                borderColor:"#4126A8",
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#4126A8'
                }
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#4126A8' : 'white',
                color: state.isFocused ? 'white' : '#333',
                '&:active': {
                    backgroundColor: '#4126A8'
                }
              }),
            }} options={options} value={options?.find(opt => opt.value == selectedLevel)}
            onChange={selected => handleLevelChange({ target: { name: 'level', value: selected.value }})}/>

          {/* Classes Dropdown */}
          <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button"
              onClick={() => setActiveDropdown(activeDropdown === "teacherDropdown" ? null : "teacherDropdown")}>
              All Teachers
              <i className={`fa-regular ${ activeDropdown === "teacherDropdown" ? "fa-angle-up": "fa-angle-down"}`}
              ></i>
            </button>
            <div className="influ-drop-list" style={{ display: activeDropdown === "teacherDropdown" ? "block" : "none",}}>
              <div className="influ-drop-list-search">
                <button type="submit">
                  <img src="images/search-icon.svg" alt="" />
                </button>
                <input type="text" placeholder="Search" value={teacherSearch} 
                  onChange={(e) => setTeacherSearch(e.target.value)}
                />
              </div>
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input type="checkbox" checked={selectedTeachers.includes("all")}
                    onChange={() => {
                      if (selectedTeachers.includes("all")) {
                        setSelectedTeachers([]);
                      } else {
                        setSelectedTeachers(["all"]);
                      }
                    }}
                  />
                  All Teachers
                </div>

                {/* Individual Teacher Checkboxes */}
                {filteredTeachers?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={selectedTeachers.includes(item.name)}
                      onChange={() => {
                        if (selectedTeachers.includes(item.name)) {
                          setSelectedTeachers(selectedTeachers.filter((name) => name !== item.name));
                        } else {
                          setSelectedTeachers([...selectedTeachers, item.name]);
                        }
                      }}
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Classes Dropdown */}
          {/* <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button"
              onClick={() => setActiveDropdown(activeDropdown === "studentDropdown" ? null : "studentDropdown")}>
              All Classes{" "}
              <i className={`fa-regular ${ activeDropdown === "studentDropdown" ? "fa-angle-up": "fa-angle-down"}`}
              ></i>
            </button>
            <div className="influ-drop-list" style={{ display: activeDropdown === "studentDropdown" ? "block" : "none",}}>
              <div className="influ-drop-list-search">
                <button type="submit">
                  <img src="images/search-icon.svg" alt="" />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  value={classSearch}
                  onChange={(e) => setClassSearch(e.target.value)}
                />
              </div>
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input
                    type="checkbox"
                    checked={selectedClasses.includes("all")}
                    onChange={() => {
                      if (selectedClasses.includes("all")) {
                        setSelectedClasses([]);
                      } else {
                        setSelectedClasses(["all"]);
                      }
                    }}
                  />
                  All Classes
                </div>

                {filteredClasses?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes(item.name)}
                      onChange={() => {
                        if (selectedClasses.includes(item.name)) {
                          setSelectedClasses(
                            selectedClasses.filter((name) => name !== item.name)
                          );
                        } else {
                          setSelectedClasses([...selectedClasses, item.name]);
                        }
                      }}
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Students Dropdown */}
          {/* <div className="influ-dropdown">
            <button
              className="influ-btn influ-drop-btn"
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "studentDropdown2"
                    ? null
                    : "studentDropdown2"
                )
              }
            >
              All Students{" "}
              <i
                className={`fa-regular ${
                  activeDropdown === "studentDropdown2"
                    ? "fa-angle-up"
                    : "fa-angle-down"
                }`}
              ></i>
            </button>
            <div
              className="influ-drop-list"
              style={{
                display:
                  activeDropdown === "studentDropdown2" ? "block" : "none",
              }}
            >
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes("all")}
                    onChange={() =>
                      handleToggle("all", selectedStudents, setSelectedStudents)
                    }
                  />
                  All Students
                </div>
                {filteredStudents?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={
                        selectedStudents.includes("all") ||
                        selectedStudents.includes(item.id)
                      }
                      disabled={selectedStudents.includes("all")}
                      // onChange={() => handleToggle( item.id, selectedStudents, setSelectedStudents )}
                      onChange={() => {
                        if (selectedStudents.includes(item.id)) {
                          setSelectedStudents([]);
                        } else {
                          setSelectedStudents([item.id]);
                        }}}
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Subjects Dropdown */}
          <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button"
              onClick={() =>setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown")}>
              All Subjects{" "}
              <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"}`}
              ></i>
            </button>
            <div className="influ-drop-list" 
              style={{ display: activeDropdown === "courseDropdown" ? "block" : "none", }} >
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input type="checkbox" checked={selectedCourses.includes("all")}
                    onChange={() => handleToggle("all", selectedCourses, setSelectedCourses) } />
                  All Subjects
                </div>
                {subjectList?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input type="checkbox"
                      checked={ selectedCourses.includes("all") || selectedCourses.includes(item.id) }
                      disabled={selectedCourses.includes("all")}
                      onChange={() =>
                        handleToggle(
                          item.id,
                          selectedCourses,
                          setSelectedCourses
                        )
                      }
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
            {reportLoading ? <button className="download-cta active" disabled> PDF Loading... </button> : <DistrictReportDownload key={JSON.stringify(reportData)} data={reportData}/>}
            {/* <PDFPreviewButton data={reportData} /> */}
          {/* {
            reportLoading ? <button className="download-cta active" disabled> PDF Loading... </button> : <DistrictReportDownload key={JSON.stringify(axiosReportData)} data={axiosReportData}/>
          } */}
        </div>
      </div>

      <div className="progress-grid">
        <div className="row g-0">
          <div className="col-lg-3">
            <div className="progress-grid-in ms-0">
              <h2> <img src="/images/Overlay.svg" alt="" />{" "} Baseline <br /> Assessments </h2>
              <h3> {progressAndScoreData?.baseline_assessments?.percentage || 0}% </h3>
              {/* <p className="text-white">
                {progressAndScoreData?.baseline_assessments?.completed || 0}/
                {progressAndScoreData?.baseline_assessments?.total || 0}{" "}
                completed
              </p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2> <img src="../images/dashboard/progress-grid/3.svg" alt="" />{" "} Lesson Quizzes </h2>
              <h3> {progressAndScoreData?.lesson_quiz_progress?.percentage || 0}% </h3>
              {/* <p className="text-black">
                {progressAndScoreData?.lesson_quiz_progress?.completed || 0}/
                {progressAndScoreData?.lesson_quiz_progress?.total || 0}{" "}
                completed
              </p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="../images/dashboard/progress-grid/2.svg" alt="" />{" "}
                Summative <br /> Assessments
              </h2>
              <h3>
                {progressAndScoreData?.summative_assessments?.percentage || 0}%
              </h3>
              {/* <p className="text-black">
                {progressAndScoreData?.summative_assessments?.completed || 0}/
                {progressAndScoreData?.summative_assessments?.total || 0}{" "}
                completed
              </p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2> <img src="../images/dashboard/progress-grid/3.svg" alt="" />{" "} Overall Level </h2>
              <h3>{progressAndScoreData?.overall_lesson_progress?.percentage || 0} % </h3>
              {/* <p className="text-black">
                {progressAndScoreData?.overall_lesson_progress?.completed || 0}{" "}
                of {progressAndScoreData?.overall_lesson_progress?.total || 0}{" "}
                lessons completed
              </p> */}
            </div>
          </div>
        </div>
      </div>
      
      <div className="subjects-lesson-progress mt-2">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="my-subject-heading"> Scores </h3>

            <div className="my-subjects" style={{marginTop:"0"}}>
              <div className="my-subjects-head mb-4">
                <h3> <img src="/images/dashboard/chart-icon.svg" alt="chart-icon" /> Subject Performance </h3>
              </div>
              <div className="chart-wrap">
                <div className="chart-in">
                  <p className="performance-text"> Score </p>
                  <div className="chart-in-percent-grp">
                    {["100%", "80%", "60%", "40%", "20%", 0].map((val, idx) => (
                      <div
                        className={`chart-in-percent ${
                          val === 0 ? "align-items-end" : ""
                        }`}
                        key={idx}
                      >
                        <span>{val}</span>
                        <hr
                          style={val === 0 ? { width: "95%" } : {}}
                          className={val === 0 ? "ms-auto" : ""}
                        />
                      </div>
                    ))}

                    <div className="chart-bar-grp">
                      {progressGraphData?.map((subject, idx) => {
                        const defaultColor = colors[idx % colors.length]; // default color by index
                        const subjectColor = colors.find(color => color.label === subject.subject_name);
                        
                        const baselineColor = subjectColor ? subjectColor.base : defaultColor.base;
                        const lessonColor = subjectColor ? subjectColor.lesson : defaultColor.lesson;
                        const summativeColor = subjectColor ? subjectColor.summative : defaultColor.summative;

                        const baseline = parseFloat(subject?.scores?.baseline_score || 0);
                        const lesson = parseFloat(subject?.scores?.lesson_score || 0);
                        const summative = parseFloat(subject?.scores?.summative_score || 0);

                        return (
                          <div className="chart-bar-in" key={subject?.subject_id} >
                            <div className="hover-data">
                              <div className="hover-data-in">
                                <p>
                                  <span style={{ backgroundColor: baselineColor, }}></span>{" "}
                                  Baseline Assessment, {baseline}%
                                </p>
                                <p>
                                  <span style={{ backgroundColor: lessonColor, }}></span>{" "}
                                  Lesson Quizzes, {lesson}%
                                </p>
                                <p>
                                  <span style={{ backgroundColor: summativeColor, }} ></span>{" "}
                                  Summative Assessment, {summative}%
                                </p>
                              </div>
                            </div>
                            <div className="bar-wrp">
                              <div className="bar" style={{ backgroundColor: baselineColor, height: `${baseline}%`, }} ></div>
                              <span>B</span>
                            </div>
                            <div className="bar-wrp">
                              <div className="bar" style={{
                                  backgroundColor: lessonColor,
                                  height: `${lesson}%`,
                                }}
                              ></div>
                              <span>L</span>
                            </div>
                            <div className="bar-wrp">
                              <div className="bar" style={{
                                  backgroundColor: summativeColor,
                                  height: `${summative}%`,
                                }}
                              ></div>
                              <span>S</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="activity-text"> Measurement Type </p>
                <ul>
                  {progressGraphData?.map((subject, idx) => {
                    const defaultColor = colors[idx % colors.length]; // default color by index
                    const subjectColor = colors.find(color => color.label === subject.subject_name);
                    const baselineColor = subjectColor ? subjectColor.base : defaultColor.base;

                    return (
                      <li key={subject.subject_id}>
                        <span style={{ backgroundColor: baselineColor, }} ></span>{" "}
                        {subject.subject_name}
                      </li>
                  )})}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PrincipalProgressSubjectWise
        subjectList={subjectList}
        classList={classList}
        selectedSchool={selectedSchool}
      />
      <PrincipalTrainingCompletion
        subjectList={subjectList}
        classList={classList}
        selectedSchool={selectedSchool}
      />
    </>
  );
};

export default PrincipalProgressAndScore;
