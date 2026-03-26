import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardInfo } from "../../redux/slices/student/studentSlice";

const WelcomeDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(dashboardInfo());
  }, [dispatch]);

  return (
    <>
      <div className="top-head">
        <div className="top-head-in">
          <h1>Welcome, {dashboardData?.username}!</h1>
          <p className="top-head-p"> Completion </p>
        </div>
      </div>

      <div className="progress-grid">
        <div className="row g-0">
          <div className="col-lg-3">
            <div className="progress-grid-in ms-0">
              <h2>
                {/* <img src="/images/dashboard/progress-grid/1.svg" alt="" /> */}
                <img src="/images/Overlay.svg" alt="" />
                Baseline Assessment
              </h2>
              <h3>{dashboardData?.baseline_assessments?.percentage}%</h3>
              <p style={{ color: "white", fontWeight: "400" }}>
                {/* {dashboardData?.baseline_assessments?.completed}/{dashboardData?.baseline_assessments?.total} Completed */}
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/3.svg" alt="" />
                Lesson Quizzes
              </h2>
              <h3>{dashboardData?.lesson_quiz_progress?.percentage}%</h3>
              <p className="text-black">
                {/* {dashboardData?.lesson_quiz_progress?.completed}/
                {dashboardData?.lesson_quiz_progress?.total} Completed{" "} */}
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/2.svg" alt="" />
                Summative Assessment
              </h2>
              <h3>{dashboardData?.summative_assessments?.percentage}%</h3>
              <p className="text-black">
                {/* {dashboardData?.summative_assessments?.completed}/
                {dashboardData?.summative_assessments?.total} Completed{" "} */}
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/3.svg" alt="" />
                Overall Lesson
              </h2>
              <h3>{dashboardData?.overall_lesson_progress?.percentage}%</h3>
              <p className="text-black">
                {/* {dashboardData?.overall_lesson_progress?.completed}/
                {dashboardData?.overall_lesson_progress?.total} Completed{" "} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeDashboard;
