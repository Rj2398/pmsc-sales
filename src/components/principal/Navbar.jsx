import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const Navbar = ({ setShowSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { currentSubject } = useSelector((state) => state.subject)
  const [headerTitle, setHeaderTitle] = useState("");

  const { principalCurrentSubject, principalStudentName, PrincipalLessonQuizName, principalTeacherName } = useSelector((state) => state.principalDashboard);

  const [localPrincipalCurrentSubject, setLocalPrincipalCurrentSubject] = useState("");
  const [localPrincipalStudentName, setLocalPrincipalStudentName] = useState("");
  const [localPrincipalLessonQuizName, setLocalPrincipalLessonQuizName] = useState("");
  const [localPrincipalTeacherName, setLocalPrincipalTeacherName] = useState("");

  useEffect(() => {
    const savedPrincipalSubject = localStorage.getItem("principalCurrentSubject");
    const savedPrincipalStudentName = localStorage.getItem("principalStudentName");
    const savedPrincipalLessonQuizName = localStorage.getItem("PrincipalLessonQuizName");
    const savedPrincipalTeacherName = localStorage.getItem("principalTeacherName");
    if (savedPrincipalSubject) setLocalPrincipalCurrentSubject(savedPrincipalSubject);
    if (savedPrincipalStudentName) setLocalPrincipalStudentName(savedPrincipalStudentName);
    if (savedPrincipalLessonQuizName) setLocalPrincipalLessonQuizName(savedPrincipalLessonQuizName);
    if (savedPrincipalTeacherName) setLocalPrincipalTeacherName(savedPrincipalTeacherName);
  }, [])


  useEffect(() => {
    if (pathname == "/principal/dashboard") {
      setHeaderTitle("Staff Dashboard");
    }
    else if (pathname == "/principal/teachers-students") {
      setHeaderTitle("Teachers & students");
    }
    else if (pathname == "/principal/progress-and-score") {
      setHeaderTitle("Completion & Score");
    }
    else if (pathname == "/principal/profile") {
      setHeaderTitle("Profile");
    }
    else {
      setHeaderTitle("");
    }
  }, [pathname])

  return (
    <nav>
      <div className="nav-toggle" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div onClick={() => setShowSidebar((prev) => !prev)} >
          <div className="bx bx-menu">
            <img src="/images/sidebar-collapse.svg" alt="menu" />
          </div>
        </div>

        {pathname === "/principal/subject-detail" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/dashboard")}
            >
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000", }}>{currentSubject && currentSubject || "Life Dream"}</span>
          </div>
        ) : (
          <span>{headerTitle}</span>
        )}

        {
          pathname.startsWith("/principal/class-detail/") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/dashboard")}>
                Staff Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
            </div>
          )
        }

        {
          pathname.startsWith("/principal/student-subject-detail") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/dashboard")}>
                Staff Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalCurrentSubject || localPrincipalCurrentSubject} info</span>

            </div>
          )
        }

        {
          pathname.startsWith("/principal/student-profile") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/dashboard")}>
                Staff Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalStudentName || localPrincipalStudentName}</span>
            </div>
          )
        }

        {
          pathname.startsWith("/principal/student-baseline-assesment") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/dashboard")}>
                Staff Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>Baseline Assessment</span>
            </div>
          )
        }

        {
          pathname.startsWith("/principal/student-summative") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/dashboard")}>
                Staff Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>Summative Assessment</span>
            </div>
          )
        }

        {
          pathname.startsWith("/principal/student-lesson-quiz") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/dashboard")}>
                Staff Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{PrincipalLessonQuizName || localPrincipalLessonQuizName}</span>

            </div>
          )
        }

        {
          pathname.startsWith("/principal/teacher-profile") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/teachers-students")}>
                Teachers & students
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalTeacherName || localPrincipalTeacherName}</span>
            </div>
          )
        }

        {pathname.includes("/principal/student/profile") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{principalStudentName || localPrincipalStudentName}</span>
          </div>
        )}

        {pathname.includes("/principal/students/profile") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{principalStudentName || localPrincipalStudentName}</span>
          </div>
        )}

        {
          pathname.startsWith("/principal/class/detail") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }} >
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/teachers-students")}>
                Teachers & students
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
            </div>
          )
        }

        {
          pathname.startsWith("/principal/student/subject/detail") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }} >
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/teachers-students")}>
                Teachers & students
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}> {">"} </span>
              <span style={{ color: "#000" }}>{principalCurrentSubject || localPrincipalCurrentSubject} info</span>
            </div>
          )
        }

        {
          pathname.includes("/principal-student-profiles") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }} >
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/teachers-students")}>
                Teachers & students
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalStudentName || localPrincipalStudentName}</span>
            </div>
          )
        }

        {pathname.includes("/principal/student/baseline/assesment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Baseline Assessment</span>
          </div>
        )}

        {pathname.includes("/principal/student/summative") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Summative Assessment</span>
          </div>
        )}

        {pathname.startsWith("/principal/student/lesson/quiz") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{PrincipalLessonQuizName || localPrincipalLessonQuizName}</span>
          </div>
        )}




        {pathname.includes("/principal/student-baseline/assesment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
            {/* <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span> */}
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Baseline Assessment</span>
          </div>
        )}
        {pathname.includes("/principal/students-summative") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
            {/* <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span> */}
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Summative Assessment</span>
          </div>
        )}
        {pathname.startsWith("/principal/student-lesson/quiz/") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
            {/* <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span> */}
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{PrincipalLessonQuizName || localPrincipalLessonQuizName}</span>
          </div>
        )}

{pathname.includes("/principal-student-baseline/assesment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Baseline Assessment</span>
          </div>
        )}
        {pathname.includes("/principal-students-summative") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            {/* <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span> */}
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Summative Assessment</span>
          </div>
        )}

{pathname.includes("/principal-student-summative") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Summative Assessment</span>
          </div>
        )}

        {pathname.startsWith("/principal-student-lesson/quiz/") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/principal/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalTeacherName || localPrincipalTeacherName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{PrincipalLessonQuizName || localPrincipalLessonQuizName}</span>
          </div>
        )}


        {/* //progress and score */}

        {
          pathname.includes("/principal/progress-student-summative-assessment") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/progress-and-score")}>
                Progress & Score
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>Summative Assessment</span>
            </div>
          )
        }

        {
          pathname.includes("/principal/progress-student-baseline-assessment") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/progress-and-score")}>
                Progress & Score
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>BaseLine Assessment</span>
            </div>
          )
        }

        {
          pathname.startsWith("/principal/progress-student-lesson-quiz") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/principal/progress-and-score")}>
                Progress & Score
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{PrincipalLessonQuizName || localPrincipalLessonQuizName}</span>
            </div>
          )
        }

        


      </div>
      <div className="notification-btn">
      </div>
      <div className="admin-icon" style={{ cursor: "pointer" }} onClick={() => navigate("/principal/profile")}>
        <img src="/images/user.svg" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;