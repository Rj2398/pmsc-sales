import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/teacher/Sidebar";
import Navbar from "../components/teacher/Navbar";
import { useState, useEffect } from "react";

const TeacherLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [hideNavSidebar, setHideNavSidebar] = useState(false);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  const hiddenPaths = [
    // "/student/baseline-assignment",
    "/teacher/subject-lesson-detail/",
    "/teacher/subject-baseline-detail",
    "/teacher/mwl-parent-training",
    "/teacher/subject-summative-detail",
    "/teacher/mwl-onboarding",
    "/teacher/mwl-micro-credentials-domain-training-lesson",
    "/teacher/onboarding",

  ]

  useEffect(() => {
      // setHideNavSidebar(hiddenPaths.includes(location.pathname));
    const shouldHide = hiddenPaths.some((path) =>
    location.pathname.startsWith(path.replace(/:\w+/, '')) // remove :params
  );
  setHideNavSidebar(shouldHide);
  }, [location.pathname]);

  return (
    hideNavSidebar ? ( <main> <Outlet /> </main> ) : (
    <>
      <Sidebar showSidebar={showSidebar} />
      <section id="content">
        <Navbar setShowSidebar={setShowSidebar} />
        <main>
          <Outlet />
        </main>
      </section>
    </>)
  );
};

export default TeacherLayout;