import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import { getSubjectInfo } from "../../redux/slices/principal/principalDashboardSlice";

const PrincipleSubjectDetails = () => {
  const location = useLocation();
  const paramData = useParams();
  const dispatch = useDispatch();
  const subjectId = location?.state?.subjectId
    ? location?.state?.subjectId
    : paramData?.subjectId;

  const { subjectInfo } = useSelector((state) => state.principalDashboard);

  useEffect(() => {
    if (subjectId) {
      dispatch(getSubjectInfo({ subject_id: subjectId }));
    }
  }, [subjectId]);
  return (
    <>
      <div className="sub-detail-wrap">
        <div className="sub-detail-top">
          <h1 className="mb-2">
            {subjectInfo?.subject?.Subject || "Not Available"}
            {/* <!-- <span><b>0%</b> 0/8 Lessons</span> --> */}
          </h1>
          {/* <!-- <div className="sub-pro">
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
						<h1 className="mb-0"><span>0/8 Lessons</span></h1>
					</div> --> */}
          <div className="sub-pro mb-0">
            <ul>
              <li>
                <img src="/images/subject-detail/lessons.svg" alt="" />{" "}
                {subjectInfo?.subject?.total_lessons + " lessons"}
              </li>
              <li style={{ color: "#4126A8" }}>
                <img src="/images/subject-detail/quizzes.svg" alt="" />{" "}
                {subjectInfo?.subject?.total_lesson_quizzes + " Quizzes"}
              </li>

              {/* <!-- <li className="me-3"><span>Overall Progress</span></li> --> */}
            </ul>
            {/* <!-- <div className="progress">
							<div className="progress-bar w-75" role="progressbar" aria-label="Basic example"
								aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
						</div> --> */}
          </div>
        </div>
        <div className="assessment-result">
          <h6>Baseline Assessment</h6>
          <div className="sub-lessons-list-in drop-btn">
            <div className="lesson-num-ico">
              <span></span>{" "}
              <img
                src="/images/subject-detail/sub-lessons/locked-not-started.svg"
                alt=""
              />
            </div>
            <div className="lesson-data">
              <h2>{subjectInfo?.subject?.Subject}-Baseline Assessment</h2>
              <p>{subjectInfo?.subject?.description}</p>
            </div>
            <div className="manage-sub-cta justify-content-end">
              {/* <Link to="/principal/subject-baseline-detail" >View Content</Link> */}
              <Link to={`/principal/subject-baseline-detail/${subjectId}`}>
                View Content
              </Link>
              {/* <!-- <button type="button" href="javascript:void(0);" data-bs-target="#delete-popup"
								data-bs-toggle="modal">
								<img src="../images/delete-icon.svg" alt=""/>
							</button> --> */}
            </div>
          </div>
        </div>
        {/* <!-- <div className="baseline-ass-in mt-3">
					<h1 className="mb-0">
						<img src="/images/subject-detail/sub-lessons/completed.svg" alt=""/> Baseline Assessment Complete
						<span>Completed</span>
					</h1>
				</div> --> */}
        {/* <!-- <div className="baseline-ass-in mt-3">
					<h1 className="mb-0">
						<img src="/images/subject-detail/sub-lessons/locked-not-started.svg" alt=""/>
						<a href="summative-assessment.html">Summative Assessment</a>
						<span className="locked">Locked</span>
						<span className="reviewagain">Review Again</span>
					</h1>
				</div> --> */}
        <div className="sub-lessons-list">
          <h3> Lessons</h3>
          {/* <!-- L --> */}
          {subjectInfo?.lessons?.map((item, index) => (
            <div className="sub-lessons-list-in" key={index}>
              <div className="lesson-num-ico">
                <span>{index + 1}</span>{" "}
                <img
                  src="/images/subject-detail/sub-lessons/locked-not-started.svg"
                  alt=""
                />
              </div>
              <div className="lesson-data">
                <h2>{item?.title}</h2>
                <p>{item?.desc}</p>
              </div>
              <div className="manage-sub-cta">
                <Link
                  to={`/principal/subject-lesson-detail/${subjectId}/${item?.id}`}
                >
                  View Content
                </Link>

                <div className="sub-lessons-list-in-ryt">
                  <span>
                    <i className="fa-light fa-clock"></i> {item?.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="assessment-result ">
          <h6>Summative Assessment</h6>
          <div className="sub-lessons-list-in drop-btn ">
            <div className="lesson-num-ico" style={{ width: "100%" }}>
              <span></span>
              <img
                src="/images/subject-detail/sub-lessons/locked-not-started.svg"
                alt=""
              />
              {/* <!-- <img src="/images/subject-detail/sub-lessons/locked-not-started.svg" alt=""/> -->
						</div> */}
              <div className="lesson-data ">
                <h2>{subjectInfo?.subject?.Subject}-Summative Assessment</h2>
                <p>{subjectInfo?.subject?.description}</p>
              </div>
              {/* <!-- <div className="start-quiz-cta">
							<a href="summative-assessment.html">Start Quiz</a>
						</div> --> */}
              <div className="manage-sub-cta justify-content-end">
                <Link
                  to={`/principal/student-subject-summative/${subjectId}`}
                  state={{ subjectId: subjectId }}
                >
                  View Content
                </Link>
                {/* <!-- <button type="button" href="javascript:void(0);" data-bs-target="#delete-popup"
								data-bs-toggle="modal">
								<img src="../images/delete-icon.svg" alt=""/>
							</button> --> */}
              </div>
              {/* <!-- <div className="sub-lessons-list-in-ryt">
							<div className="status completed">Completed</div>
							<div className="status">Locked</div>
							<div className="status retake">Retake Quiz</div>
							<span>&nbsp;</span>
						</div> --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrincipleSubjectDetails;
