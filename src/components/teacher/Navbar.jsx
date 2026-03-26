import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const Navbar = ({ setShowSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { teacherCurrentSubject, teacherStudentName, lessonQuizName, mwlTraining, mwlDomain} = useSelector((state) => state.dashboard);
  const [headerTitle, setHeaderTitle] = useState("");
  const [localTeacherCurrentSubject, setLocalTeacherCurrentSubject] = useState("");
  const [localTeacherStudentName, setLocalTeacherStudentName] = useState("");
  
  const [localMwlTraining, setLocalMwlTraining] = useState("");
  const [localMwlDomain, setLocalMwlDomain] = useState("");

  useEffect(() => {
    const savedSubject = localStorage.getItem("teacherCurrentSubject");
    const savedStudent = localStorage.getItem("teacherStudentName");
    if (savedSubject) setLocalTeacherCurrentSubject(savedSubject);
    if (savedStudent) setLocalTeacherStudentName(savedStudent);

    const savedMwlTraining = localStorage.getItem("mwlTraining");
    if (savedMwlTraining) setLocalMwlTraining(savedMwlTraining);

    const savedMwlDomain = localStorage.getItem("mwlDomain");
    if (savedMwlDomain) setLocalMwlDomain(savedMwlDomain);
  }, []);

  useEffect(() => {
    if (pathname == "/teacher/dashboard") {
      setHeaderTitle("Teacher Dashboard");
    } else if (pathname == "/teacher/progress-and-score") {
      setHeaderTitle("Completion & Score");
    } else if (pathname == "/teacher/profile") {
      setHeaderTitle("Profile");
    } else if (pathname == "/teacher/mwl-library") {
      setHeaderTitle("MWL Library");
    } else {
      setHeaderTitle("");
    }
  }, [pathname]);

  return (
    <nav>
      {/* <div className="nav-toggle" onClick={() => setShowSidebar((prev) => !prev)}>
        <div className="bx bx-menu">
          <img src="/images/sidebar-collapse.svg" alt="" />
        </div>
        {headerTitle}
      </div> */}

      <div className="nav-toggle" style={{ display: "flex", alignItems: "center", gap: "8px" }} >
        <div onClick={() => setShowSidebar((prev) => !prev)}>
          <div className="bx bx-menu">
            <img src="/images/sidebar-collapse.svg" alt="menu" />
          </div>
        </div>

        {pathname.startsWith("/teacher/class-detail/") ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} 
              onClick={() => navigate("/teacher/dashboard")} >
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{teacherCurrentSubject}</span>
          </div>
        ) : (
          <span>{headerTitle}</span>
        )}

        {pathname.startsWith("/teacher/subject-detail/") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/teacher/dashboard")}>
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>
              {teacherCurrentSubject || localTeacherCurrentSubject}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{teacherCurrentSubject} Info</span>
          </div>
        )}

        {pathname.startsWith("/teacher/student-profile") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/teacher/dashboard")} >
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate(-1)}>
              {teacherCurrentSubject || localTeacherCurrentSubject}{" "}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>
              {teacherStudentName || localTeacherStudentName}
            </span>
          </div>
        )}

        {pathname.startsWith("/teacher/student-baseline-assessment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate("/teacher/dashboard")} >
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>
              {teacherCurrentSubject || localTeacherCurrentSubject}{" "}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>
              {teacherStudentName || localTeacherStudentName}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Baseline Assessment</span>
          </div>
        )}

        {pathname.startsWith("/teacher/student-summative-assessment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/teacher/dashboard")}>
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>
              {teacherCurrentSubject || localTeacherCurrentSubject}{" "}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>
              {teacherStudentName || localTeacherStudentName}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Summative Assessment</span>
          </div>
        )}

        {/* //currently static for lesson quiz */}
        {pathname.startsWith("/teacher/student-lesson-quiz") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/teacher/dashboard")}>
              Dashboard
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>
              {teacherCurrentSubject || localTeacherCurrentSubject}{" "}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>
              {teacherStudentName || localTeacherStudentName}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{lessonQuizName}</span>
          </div>
        )}

        {pathname === "/teacher/mwl-training" && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/teacher/mwl-library")}>
              MWL Library
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>
              {/* Micro-Credentials & Domain Training */}
             {mwlTraining || localMwlTraining}

              
            </span>
          </div>
        )}

        {/* //currently static for this path */}
        {pathname ===
          "/teacher/mwl-micro-credentials-domain-training-subject" && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/teacher/mwl-library")}>
              MWL Library
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>
              {mwlTraining || localMwlTraining}{" "}
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>


            <span style={{ color: "#000" }}>{mwlDomain || localMwlDomain}</span>
          </div>
        )}

        {pathname === "/teacher/mwl-lesson-prep" && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/teacher/mwl-library")}>
              MWL Library
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280" }}>Lesson Prep</span>
          </div>
        )}

        {pathname === "/teacher/mwl-lesson-prep-subject" && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/teacher/mwl-library")}>
              MWL Library
            </span>
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate(-1)}>
              Lesson Prep
            </span>

            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Life Dream</span>
          </div>
        )}

                {/* //progess baseline assesment */}
        {pathname.includes("/teacher/progress-student-baseline-assessment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate("/teacher/progress-and-score")} >
              Progress & Score
            </span>
 
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Baseline Assessment</span>
          </div>
        )}
 
        {pathname.includes("/teacher/progress-student-summative-assessment") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate("/teacher/progress-and-score")} >
              Progress & Score
            </span>
 
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>Summative Assessment</span>
          </div>
        )}
 
        {pathname.includes("/teacher/progress-student-lesson-quiz") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6B7280", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate("/teacher/progress-and-score")} >
              Progress & Score
            </span>
 
            <span style={{ color: "#6B7280" }}>{">"}</span>
            <span style={{ color: "#000" }}>{lessonQuizName}</span>
          </div>
        )}
 
      </div>
      <div className="notification-btn"></div>
      <div className="admin-icon" style={{cursor:"pointer"}} onClick={()=> navigate("/teacher/profile")}>
        <img src="/images/user.svg" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;