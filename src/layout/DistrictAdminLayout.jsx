import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/districtAdmin/Sidebar";
import Navbar from "../components/districtAdmin/Navbar";

const DistrictAdminLayout = () => {
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
    "/student/summative-assessment","/principal/subject-baseline-detail", "/principal/student-subject-summative", "/principal/subject-lesson-detail/", "/district-admin/student-lesson-quiz/", "/district-admin/subject-lesson-detail", "/district-admin/subject-baseline-detail", "/district-admin/student-subject-summative"]


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

export default DistrictAdminLayout;