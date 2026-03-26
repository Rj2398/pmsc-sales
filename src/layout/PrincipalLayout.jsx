import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/principal/Sidebar";
import Navbar from "../components/principal/Navbar";

const PrincipalLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [hideNavSidebar, setHideNavSidebar] = useState(false);

  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

   const hiddenPaths = [
    // "/student/baseline-assignment",
    "/student/baseline-assignment/",
    "/student/lesson-detail",
    "/student/summative-assessment","/principal/subject-baseline-detail", "/principal/student-subject-summative", "/principal/subject-lesson-detail/"]


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

export default PrincipalLayout;