import { useEffect, useState } from "react";
import ProgressSubjectWise from "../../components/teacher/ProgressSubjectWise";
import { useDispatch, useSelector } from "react-redux";
import { getClassList, getStudentList, getSubjectList } from "../../redux/slices/teacher/dashboardSlice";
import {getTeacherProgressScore, getTeacherSubjectGraph } from "../../redux/slices/teacher/progressSlice";
import { getReportDownloadData } from "../../redux/slices/authSlice";
// import { ReportDownload } from "../../components/teacher/ReportPdfDowload";

const ProgressAndScore = () => {
  const dispatch = useDispatch();
  const currentLevel = localStorage.getItem("classLevel");
  // const { reportData, reportLoading } = useSelector((state) => state.auth);

  const { subjectList, classList, studentList } = useSelector((state) => state.dashboard);
  const { progressAndScoreData, progressGraphData } = useSelector((state) => state.progress);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    if (currentLevel) {
      dispatch(getClassList({ level_id: currentLevel }));
      dispatch(getSubjectList({ level_id: currentLevel }));
    }
  }, [currentLevel]);

  useEffect(() => {
    if (selectedClasses) {
      dispatch(getStudentList({class: selectedClasses?.includes("all") ? ["all"] : selectedClasses}));
    }
  }, [selectedClasses]);

  useEffect(() => {
    const payload = { level_id: currentLevel };

    if (!selectedClasses.includes("all")) {
      payload.class_id = selectedClasses;
    }

    if (!selectedStudents.includes("all")) {
      payload.student_id = selectedStudents;
    }

    if (!selectedCourses.includes("all")) {
      payload.subject_id = selectedCourses;
    }

    dispatch(getTeacherProgressScore(payload));
    dispatch(getTeacherSubjectGraph(payload));
    // dispatch(getReportDownloadData(payload));
    
  }, [selectedClasses, selectedStudents, selectedCourses]);

  const [classSearch, setClassSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  const handleToggle = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id)); // Uncheck
    } else {
      setList([...list, id]); // Check
    }
  };

  const filteredClasses = classList?.filter((item) =>
    item?.name?.toLowerCase()?.includes(classSearch?.toLowerCase())
  );

  const filteredStudents = studentList?.filter((item) =>
    item.name.toLowerCase().includes(studentSearch.toLowerCase())
  );

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
          {/* Class Dropdown */}
          <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button" onClick={() =>
                setActiveDropdown(activeDropdown === "classDropdown" ? null : "classDropdown")
              }
            >
              All Class Names {" "}
              <i className={`fa-regular ${activeDropdown === "classDropdown"? "fa-angle-up": "fa-angle-down"}`}
              ></i>
            </button>
            <div className="influ-drop-list"style={{display: activeDropdown === "classDropdown" ? "block" : "none"}}
            >
              <div className="influ-drop-list-search">
                <button type="submit">
                  <img src="images/search-icon.svg" alt="" />
                </button>
                <input type="text" placeholder="Search" value={classSearch}
                  onChange={(e) => setClassSearch(e.target.value)}
                />
              </div>
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input type="checkbox" checked={selectedClasses.includes("all")}
                    onChange={() =>
                      handleToggle("all", selectedClasses, setSelectedClasses)
                    }
                  />
                  All Classes
                </div>
                {filteredClasses?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={
                        selectedClasses.includes("all") ||
                        selectedClasses.includes(item.name)
                      }
                      disabled={selectedClasses.includes("all")}
                      onChange={() =>
                        handleToggle(
                          item.name,
                          selectedClasses,
                          setSelectedClasses
                        )
                      }
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Dropdown */}
          <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === "studentDropdown"? null: "studentDropdown")
              }
            >
              All Students{" "}
              <i className={`fa-regular ${activeDropdown === "studentDropdown"? "fa-angle-up": "fa-angle-down"
                }`}
              ></i>
            </button>
            <div className="influ-drop-list" 
              style={{display:activeDropdown === "studentDropdown" ? "block" : "none",}}
            >
              <div className="influ-drop-list-search">
                <button type="submit">
                  <img src="images/search-icon.svg" alt="" />
                </button>
                <input type="text" placeholder="Search" value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input type="checkbox" checked={selectedStudents.includes("all")}
                    onChange={() => {
                      if (selectedStudents.includes("all")) {
                        setSelectedStudents([]);
                      } else {
                        setSelectedStudents(["all"]); // Select all
                      }
                    }}
                  />
                  All Students
                </div>
                {filteredStudents?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input type="checkbox" 
                      checked={selectedStudents.includes("all") || selectedStudents.includes(item.id) }
                      disabled={selectedStudents.includes("all")}
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

          {/* Course Dropdown */}
          <div className="influ-dropdown">
            <button className="influ-btn influ-drop-btn" type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === "courseDropdown" ? null : "courseDropdown")
              }
            >
              All Subjects{" "}
              <i className={`fa-regular ${activeDropdown === "courseDropdown" ? "fa-angle-up" : "fa-angle-down"
                }`}
              ></i>
            </button>
            <div className="influ-drop-list"
              style={{display: activeDropdown === "courseDropdown" ? "block" : "none",}}
            >
              <div className="influ-drop-list-inner">
                <div className="influ-drop-list-item">
                  <input type="checkbox" checked={selectedCourses.includes("all")}
                    onChange={() =>
                      handleToggle("all", selectedCourses, setSelectedCourses)
                    }
                  />
                  All Subjects
                </div>
                {subjectList?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input type="checkbox" 
                      checked={selectedCourses.includes("all") || selectedCourses.includes(item.id)}
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
          {/* {
            reportLoading ? <button className="download-cta active" disabled> PDF Loading... </button> : <ReportDownload key={JSON.stringify(reportData)} data={reportData}/>
          } */}
          
          
        </div>
      </div>
      <div className="progress-grid">
        <div className="row g-0">
          <div className="col-lg-3">
            <div className="progress-grid-in ms-0">
              <h2>
                <img src="/images/Overlay.svg" alt="" />{" "}
                Baseline <br /> Assessments
              </h2>
              <h3>
                {progressAndScoreData?.baseline_assessments?.percentage || 0}%
              </h3>
              {/* <p className="text-white">{progressAndScoreData?.baseline_assessments?.completed || 0}/{progressAndScoreData?.baseline_assessments?.total || 0} completed</p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/3.svg" alt="Lesson Quizzes" />{" "}
                Lesson Quizzes
              </h2>
              <h3>{progressAndScoreData?.lesson_progress?.percentage || 0}%</h3>
              {/* <p className="text-black">
                {progressAndScoreData?.lesson_progress?.completed || 0}/
                {progressAndScoreData?.lesson_progress?.total || 0} completed
              </p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/2.svg" alt="Summative Assessment" />{" "}
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
              <h2>
                <img src="/images/dashboard/progress-grid/3.svg" alt="Overall Lesson" />{" "}
                Overall Lesson
              </h2>
              <h3>{progressAndScoreData?.avg_quiz_score || 0}%</h3>
              {/* <p className="text-black">
                {progressAndScoreData?.baseline_assessments?.completed || 0} of{" "}
                {progressAndScoreData?.baseline_assessments?.total || 0} lessons
                completed
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

                        const baseline = parseFloat(subject.baseline_score || 0);
                        const lesson = parseFloat(subject.lesson_score || 0);
                        const summative = parseFloat(subject.summative_score || 0);

                        return (
                          <div className="chart-bar-in" key={subject.subject_id} >
                            <div className="hover-data">
                              <div className="hover-data-in">
                                <p>
                                  <span style={{ backgroundColor: baselineColor }} ></span>{" "}
                                  Baseline Assessment, {baseline}%
                                </p>
                                <p>
                                  <span style={{ backgroundColor: lessonColor }} ></span>{" "}
                                  Lesson Quizzes, {lesson}%
                                </p>
                                <p>
                                  <span style={{ backgroundColor: summativeColor }} ></span>{" "}
                                  Summative Assessment, {summative}%
                                </p>
                              </div>
                            </div>
                            <div className="bar-wrp">
                              <div className="bar" style={{ backgroundColor: baselineColor, height: `${baseline}%`, }} ></div>
                              <span>B</span>
                            </div>
                            <div className="bar-wrp">
                              <div className="bar" style={{ backgroundColor: lessonColor, height: `${lesson}%`, }} ></div>
                              <span>L</span>
                            </div>
                            <div className="bar-wrp">
                              <div className="bar" style={{ backgroundColor: summativeColor, height: `${summative}%`, }} ></div>
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
                    const defaultColor = colors[idx % colors.length];
                    const subjectColor = colors.find(color => color.label === subject.subject_name);
                    const baselineColor = subjectColor ? subjectColor.base : defaultColor.base;

                    return (
                      <li key={subject.subject_id}>
                        <span style={{ backgroundColor: baselineColor }} ></span>{" "}
                        {subject.subject_name}
                      </li>
                    )})}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProgressSubjectWise subjectList={subjectList} classList={classList} />
    </>
  );
};

export default ProgressAndScore;
