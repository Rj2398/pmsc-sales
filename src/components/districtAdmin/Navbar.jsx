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
    if (pathname == "/district-admin/dashboard") {
      setHeaderTitle("District Management Dashboard");
    }
    else if (pathname == "/district-admin/teachers-students") {
      setHeaderTitle("Teachers & students");
    }
    else if (pathname == "/district-admin/progress-and-score") {
      setHeaderTitle("Completion & Score");
    }
    else if (pathname == "/district-admin/profile") {
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

        {pathname === "/district-admin/subject-detail" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/dashboard")}
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
          pathname.startsWith("/district-admin/class-detail/") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/dashboard")}>
                District Management Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
            </div>
          )
        }

        {
          pathname.startsWith("/district-admin/student-subject-detail") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/dashboard")}>
                District Management Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalCurrentSubject || localPrincipalCurrentSubject} info</span>

            </div>
          )
        }

        {
          pathname.startsWith("/district-admin/student-profile") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/dashboard")}>
                District Management Dashboard
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalCurrentSubject || localPrincipalCurrentSubject}</span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalStudentName || localPrincipalStudentName}</span>
            </div>
          )
        }

        {
          pathname.startsWith("/district-admin/student-baseline-assesment") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/dashboard")}>
                District Management Dashboard
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
          pathname.startsWith("/district-admin/student-summative") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/dashboard")}>
                District Management Dashboard
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
          pathname.startsWith("/district-admin/student-lesson-quiz") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/dashboard")}>
                District Management Dashboard
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
          pathname.startsWith("/district-admin/teacher-profile") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/teachers-students")}>
                Teachers & students
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>{principalTeacherName || localPrincipalTeacherName}</span>
            </div>
          )
        }

        {pathname.includes("/district-admin/student/profile") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{principalStudentName || localPrincipalStudentName}</span>
          </div>
        )}

        {pathname.includes("/district-admin/students/profile") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/teachers-students")}>
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
          pathname.startsWith("/district-admin/class/detail") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }} >
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/teachers-students")}>
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
          pathname.startsWith("/district-admin/student/subject/detail") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }} >
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/teachers-students")}>
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
                onClick={() => navigate("/district-admin/teachers-students")}>
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

        {pathname.includes("/district-admin/student/baseline/assesment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Baseline Assessment</span>
          </div>
        )}

        {pathname.includes("/district-admin/student/summative") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Summative Assessment</span>
          </div>
        )}

        {pathname.startsWith("/district-admin/student/lesson/quiz") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/teachers-students")}>
              Teachers & students
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>{principalStudentName || localPrincipalStudentName}</span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{PrincipalLessonQuizName || localPrincipalLessonQuizName}</span>
          </div>
        )}




        {pathname.includes("/district-admin/student-baseline/assesment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/teachers-students")}>
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
        {pathname.includes("/district-admin/students-summative") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/teachers-students")}>
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
        {pathname.startsWith("/district-admin/student-lesson/quiz/") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/district-admin/teachers-students")}>
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
              onClick={() => navigate("/district-admin/teachers-students")}>
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
              onClick={() => navigate("/district-admin/teachers-students")}>
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
              onClick={() => navigate("/district-admin/teachers-students")}>
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
              onClick={() => navigate("/district-admin/teachers-students")}>
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
          pathname.includes("/district-admin/progress-student-summative-assessment") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/progress-and-score")}>
                Progress & Score
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>Summative Assessment</span>
            </div>
          )
        }

        {
          pathname.includes("/district-admin/progress-student-baseline-assessment") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/progress-and-score")}>
                Progress & Score
              </span>
              <span style={{ color: "#6B7280" }}>{">"}</span>
              <span style={{ color: "#000" }}>BaseLine Assessment</span>
            </div>
          )
        }

        {
          pathname.startsWith("/district-admin/progress-student-lesson-quiz") && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/district-admin/progress-and-score")}>
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
      <div className="admin-icon" style={{ cursor: "pointer" }} onClick={() => navigate("/district-admin/profile")}>
        <img src="/images/user.svg" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;