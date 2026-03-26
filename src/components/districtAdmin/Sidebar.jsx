import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ showSidebar }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/district-admin/dashboard",
      subPath: [
        "/district-admin/class-detail/",
        "/district-admin/student-subject-detail/",
        "/district-admin/student-profile",
        "/district-admin/student-baseline-assesment",
        "/district-admin/student-lesson-quiz/", // Removed :studentId for prefix match
        "/district-admin/student-summative",
      ],
      icon: "/images/menu/1.svg",
    },
    {
      name: "Teacher & Students",
      path: "/district-admin/teachers-students",
      subPath: [
        "/district-admin/teacher-profile",
        "/teacher/mwl-micro-credentials-domain-training-subject",
        "/district-admin/students-summative",
        "/district-admin/student-summative",
        "/district-admin/student/profile",
        "/district-admin/students/profile",
        "/principal-student-profiles",
        "/district-admin/class/detail",
        "/district-admin/student/subject/detail",
        "/district-admin/student/baseline/assesment",
        "/district-admin/student/summative",
        "/district-admin/student/lesson/quiz",
        "/district-admin/student-baseline/assesment",
        "/district-admin/students-summative",
        "/district-admin/student-lesson/quiz",
        "/principal-student-baseline/assesment",
        "/principal-student-summative",
        "/principal-student-lesson/quiz",
      ],
      icon: "/images/menu/7.svg",
    },
    {
      name: "Completion & Score",
      path: "/district-admin/progress-and-score",
      icon: "/images/menu/3.svg",
      subPath: [
        "/district-admin/progress-student-summative-assessment",
        "/district-admin/progress-student-baseline-assessment",
        "/district-admin/progress-student-lesson-quiz",
      ],
    },
    {
      name: "Profile",
      path: "/district-admin/profile",
      icon: "/images/menu/8.svg",
    },
  ];

  const isActive = (item) => {
    if (!item || typeof item !== "object") return false;

    const currentPath = location.pathname;

    const itemPath = item.path?.trim();    // Normalize paths by trimming spaces (to avoid malformed matches)

    if (currentPath === itemPath) return true; // 1. Exact match

    // 2. Match any defined subPath (prefix match)
    if (Array.isArray(item.subPath)) {
      return item.subPath.some(
        (sub) => currentPath.startsWith(sub.trim().replace(/:.*$/, "")) // strip dynamic params
      );
    }

    return false;
  };

  return (
    <section id="sidebar" className={`${showSidebar ? "" : " hide"}`}>
      <Link to="/district-admin/dashboard" className="brand">
        <img src="/images/logo.svg" alt="Brand Logo" />
        <img src="/images/coll-logo.svg" alt="" className="collapsed"></img>
      </Link>

      <ul className="side-menu">
        <h2>Navigation</h2>

        {menuItems.map((item, index) => (
          <li key={index} className={isActive(item) ? "active" : ""}>
            <Link to={item.path}>
              <img src={item.icon} alt={`${item.name} sidebar`} />
              <span className="text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
