import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { teacherProfile } from "../../redux/slices/principal/teacherAndStudentsSlice";
import {
  getSubjectLevel,
  setPrincipalTeacherName,
  getSubjectList,
} from "../../redux/slices/principal/principalDashboardSlice";

function PrincipalTeacherProfile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { teacherData } = useSelector((state) => state.teacherAndStudents);
  const { subjectList } = useSelector((state) => state.principalDashboard);

  // console.log(teacherData, "teacherDatateacherData");
  // const [selectedLevel, setSelectedLevel] = useState(() => {return localStorage.getItem("classLevel") || null;});
  const currentLevel = localStorage.getItem("classLevel");
  const navigate = useNavigate();

  var teacherId = location?.state?.teacherId;
  const schoolId = localStorage.getItem("schoolID");

  // const [showAllSubject, setShowAllSubject] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState({});

  const toggleLevel = (levelId) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  useEffect(() => {
    const level = Number(currentLevel) === 1 ? "ruby" : "emerald";
    dispatch(
      teacherProfile({
        level_id: level,
        teacher_id: teacherId,
        school_id: schoolId,
      })
    );
  }, [dispatch, currentLevel, teacherId]);

  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [searchQuery3, setSearchQuery3] = useState("");

  useEffect(() => {
    dispatch(getSubjectLevel({ level_id: currentLevel }));
  }, [currentLevel]);

  useEffect(() => {
    dispatch(getSubjectList({ level_id: currentLevel }));
  }, [currentLevel]);

  // With these safer implementations:
  const filterClassesPerformance =
    teacherData?.subjects?.filter(
      (classes) =>
        classes?.subject?.toLowerCase().includes(searchQuery1.toLowerCase()) ||
        classes?.avg_score?.toString().includes(searchQuery1)
    ) || [];

  const filterPrincipalStudent =
    teacherData?.students?.filter((student) =>
      student?.student_name?.toLowerCase().includes(searchQuery2.toLowerCase())
    ) || [];

  const filterTeacherTraining =
    teacherData?.teacher_training?.filter((teacher) =>
      teacher?.level_name?.toLowerCase().includes(searchQuery3.toLowerCase())
    ) || [];

  useEffect(() => {
    if (teacherData) {
      dispatch(setPrincipalTeacherName(teacherData?.name));
    }
  }, [teacherData]);

  return (
    <>
      <div className="top-head prog-sco-wrp">
        <div className="top-head-in">
          <h1>Teacher Profile</h1>
          {/* <p>Detailed view of student performance and progress</p> */}
        </div>
        <div className="back-btn">
          <Link to="" onClick={() => navigate(-1)}>
            <img src="../images/baseline-assessment/back-icon.svg" alt="" />{" "}
            Back
          </Link>
        </div>
      </div>

      <div className="student-short-info for-principal">
        <h3>
          {teacherData?.name}
          {/* <span>Overall Score</span> */}
        </h3>
        <p>
          {teacherData?.email}
          {/* <b>{teacherData.overall_completion}%</b> */}
        </p>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0"> Class Completion </h1>
          </div>
          {/* <div className="students-src ms-auto">
            <input
              type="text"
              placeholder="Search emails by subject, send..."
              value={searchQuery1}
              onChange={(e) => setSearchQuery1(e.target.value)}
            />
          </div> */}
          {/* <div className="back-btn ms-3">
            <a href="">
              <img src="../images/download-certif.svg" alt="" style={{ filter: "brightness(0) invert(1)" }} />
              Export Report
            </a>
          </div> */}
        </div>
        <div className="table-responsive">
          <table>
            <tbody>
              <tr>
                <th style={{ width: "300px" }}>Subject</th>
                <th>Students</th>
                <th style={{ width: "400px" }}>Completion % </th>
                {/* <th>Avg. Score</th> */}
                <th>Action </th>
              </tr>
              {filterClassesPerformance.length === 0 ? (
                <tr>
                  {" "}
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    {" "}
                    No Data Found...{" "}
                  </td>{" "}
                </tr>
              ) : (
                <>
                  {filterClassesPerformance?.map((item, index) => (
                    <tr>
                      <td>{item?.subject}</td>
                      {/* <td>{item?.subject_id}</td> */}
                      <td>{item?.students}</td>
                      <td>
                        <div className="prog">
                          <span> {item?.completion}% </span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${item?.completion}%` }}
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </td>
                      {/* <td>
                        <div style={{ color: "#16A34A" }}>
                          {item?.avg_score}%
                        </div>
                      </td> */}
                      <td>
                        <Link
                          // to={`/district-admin/class/detail/${item?.subject_id}`}
                          to={`/district-admin/class/detail/${item?.subject_id}?teacherId=${teacherId}`}
                          state={{
                            subjectId: item?.subject_id,
                            teachercoming: "teachercoming",
                          }}
                        >
                          <i className="fa-solid fa-eye"></i> View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0"> Student Completion </h1>
            {/* <h1 className="mb-0">Students({filterPrincipalStudent?.length})</h1> */}
          </div>
          <div className="students-src ms-auto">
            <input
              type="text"
              placeholder="Search emails by subject, sen....."
              value={searchQuery2}
              onChange={(e) => setSearchQuery2(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <tbody>
              <tr>
                <th style={{ width: "250px" }}>Student Name</th>
                <th>Status </th>
                <th style={{ width: "350px" }}> Completion % </th>
                {/* <th>Avg. Score</th> */}
                <th>Action </th>
              </tr>
              {filterPrincipalStudent.length === 0 ? (
                // <div>No Data Found...</div>
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Data Found...
                  </td>
                </tr>
              ) : (
                <>
                  {filterPrincipalStudent?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.student_name}</td>
                      <td>
                        <div
                          className={`status ${
                            item.status == "not_started" && "inactive"
                          } ${
                            [
                              "In Progress",
                              "in_progress",
                              "retake",
                              "review",
                            ].includes(item.status) && "review"
                          }`}
                        >
                          {item.status
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                            "Not Started"}
                        </div>
                      </td>
                      <td>
                        <div className="prog">
                          <span> {item.completion_score}% </span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: `${item?.completion_score}%`,
                                backgroundColor: [
                                  "In Progress",
                                  "in_progress",
                                  "retake",
                                  "review",
                                ].includes(item.status)
                                  ? "#f28100"
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
                      {/* <td> <div style={{ color: "#16A34A" }}>{item.avg_score}</div> </td> */}
                      <td>
                        <Link
                          to="/district-admin/students/profile"
                          state={{
                            studentId: item.student_id,
                            teacherStudentComing: "teacherStudentComing",
                          }}
                        >
                          <i className="fa-solid fa-eye"></i> View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">Teacher Training Completion</h1>
          </div>
          <div className="students-src ms-auto">
            {/* <input
              type="text"
              placeholder="Search by teacher name....."
              value={searchQuery3}
              onChange={(e) => setSearchQuery3(e.target.value)}
            /> */}
          </div>
          {/* <div className="back-btn ms-3">
            <a href="">
              <img src="../images/download-certif.svg" alt="" style={{ filter: "brightness(0) invert(1)" }} />
              Export Report
            </a>
          </div> */}
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "300px" }}>Level</th>
                <th style={{ minWidth: "300px" }}>Subject</th>
                {/* <th>Completion</th> */}
                <th>Badge Completion Status</th>
              </tr>
            </thead>

            <tbody>
              {filterTeacherTraining.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Data Found...
                  </td>
                </tr>
              ) : (
                filterTeacherTraining.map((item) => (
                  <React.Fragment key={item.level_id}>
                    {/* Level Row */}
                    <tr>
                      <td>{item.level_name}</td>
                      <td
                        onClick={() => toggleLevel(item.level_id)}
                        style={{ cursor: "pointer" }}
                      >
                        All Subject
                        <button type="button" className="lessons-btn">
                          <i
                            className={`fa-solid ${
                              expandedLevels[item.level_id]
                                ? "fa-angle-up"
                                : "fa-angle-down"
                            }`}
                          ></i>
                        </button>
                      </td>
                      {/* <td>
                        <div className="prog">
                          <span>{item.percentage}% </span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${item.percentage}%` }}
                              role="progressbar"
                              aria-valuenow={item.percentage}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </td> */}
                      <td>
                        <div
                          className={`status ${
                            item.status == "not_started" && "inactive"
                          } ${
                            [
                              "In Progress",
                              "in_progress",
                              "retake",
                              "review",
                            ].includes(item.status) && "review"
                          }`}
                        >
                          {item.status
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                            "Not Started"}
                        </div>
                      </td>
                    </tr>

                    {/* Subjects Rows (only show if expanded) */}
                    {expandedLevels[item.level_id] &&
                      item?.subjects?.map((subject) => (
                        <tr key={subject.id} className="lessons-list">
                          <td>&nbsp;</td>
                          <td>
                            {subject?.name}
                            {subject?.badge && (
                              <img
                                src="/images/badge-icon.svg"
                                alt="badge"
                              ></img>
                            )}
                          </td>
                          {/* <td>
                            <div className="prog">
                              <span>{subject?.percentage}% </span>
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  style={{
                                    width: `${subject?.percentage}%`,
                                    backgroundColor:
                                      subject?.percentage < 70
                                        ? "#F28100"
                                        : undefined,
                                  }}
                                  role="progressbar"
                                  aria-valuenow={subject?.percentage}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </td> */}
                          <td>
                            <div
                              className={`status ${
                                item.status == "not_started" && "inactive"
                              } ${
                                [
                                  "In Progress",
                                  "in_progress",
                                  "retake",
                                  "review",
                                ].includes(item.status) && "review"
                              }`}
                            >
                              {subject?.status
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (char) =>
                                  char.toUpperCase()
                                ) || "Not Started"}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PrincipalTeacherProfile;
