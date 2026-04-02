import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassDetailBySubject,
  getSubjectList,
  setTeacherCurrentSubject,
} from "../../redux/slices/teacher/dashboardSlice";

const ClassDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const paramData = useParams();
  const navigate = useNavigate();
  const currentLevel = localStorage.getItem("classLevel");

  const subjectId = location?.state?.subjectId
    ? location?.state?.subjectId
    : paramData?.subjectId;
  const { classDetails, subjectList } = useSelector((state) => state.dashboard);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudent = classDetails?.students?.filter(
    (student) =>
      student.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (subjectId) {
      dispatch(getClassDetailBySubject({ subject_id: subjectId }));
    }
    if (currentLevel) {
      dispatch(getSubjectList({ level_id: currentLevel }));
    }
  }, [subjectId, currentLevel]);

  useEffect(() => {
    if (selectedCourses?.length > 0) {
      dispatch(getClassDetailBySubject({ subject_id: selectedCourses?.[0] }));
    }
  }, [selectedCourses?.length > 0, selectedCourses]);

  useEffect(() => {
    if (classDetails) {
      dispatch(setTeacherCurrentSubject(classDetails?.subject_name));
    }
  }, [classDetails]);

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
      <div className="top-head align-items-start">
        <div className="top-head-in">
          <h1>{classDetails?.subject_name}</h1>
          <p>{classDetails?.subject_desc}</p>
          <ul>
            <li>
              <img src="/images/subject-detail/lessons.svg" alt="" />{" "}
              {classDetails?.total_lesson + " lessons"}
            </li>
          </ul>
        </div>
        <div className="back-btn ms-auto">
          <Link
            to={`/teacher/subject-detail/${subjectId}`}
            state={{ subjectId: subjectId }}
          >
            <img src="/images/view-icon.svg" alt="" /> View Subject Info
          </Link>
        </div>
        <div className="influ-btns mx-3">
          {/* <!-- INNER-DROPDOWN --> */}
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
              All Subjects{" "}
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
          {/* <!-- INNER-DROPDOWN --> */}
        </div>

        <div className="back-btn">
          <Link to="#" onClick={() => navigate(-1)}>
            <img src="/images/baseline-assessment/back-icon.svg" alt="back" />{" "}
            Back
          </Link>
        </div>
      </div>
      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">Students </h1>
            {/* <h1 className="mb-0">Students({classDetails?.students?.length})</h1> */}
          </div>
          <div className="students-src">
            <input
              type="text"
              placeholder="Search emails by subject, sen....."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                <th style={{ width: "250px" }}>Student Name</th>
                <th>Status </th>
                <th style={{ width: "250px" }}>Completion Score </th>
                <th> Certificate Earned </th>
                <th>Action </th>
              </tr>
            </thead>

            <tbody>
              {!filteredStudent || filteredStudent.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ paddingTop: "25px", textAlign: "center" }}
                  >
                    No Student Available
                  </td>
                </tr>
              ) : (
                filteredStudent.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.student_name}</td>
                    <td>
                      <div
                        className={`status ${
                          ["not_started", "locked"].includes(item?.status) &&
                          "inactive"
                        } ${
                          ["review", "in_progress"].includes(item?.status) &&
                          "review"
                        }`}
                      >
                        {item?.status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </div>
                    </td>
                    <td>
                      <div className="prog">
                        <span>{item?.overall_percentage}% </span>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${item?.overall_percentage ?? 0}%`,
                              backgroundColor: [
                                "not_started",
                                "not_completed",
                                "in_progress",
                                "In Progress",
                                "review",
                              ].includes(item?.status)
                                ? "#F28100"
                                : "#16a34a",
                            }}
                            role="progressbar"
                            aria-label="Overall percentage"
                            aria-valuenow={item?.overall_percentage ?? 0}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link>
                        <i className="fa-solid fa-eye"></i> View
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="/teacher/student-profile"
                        state={{
                          studentId: item.student_id,
                          subjectId:
                            selectedCourses?.length > 0
                              ? selectedCourses[0]
                              : subjectId,
                        }}
                      >
                        <i className="fa-solid fa-eye"></i> View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClassDetail;
