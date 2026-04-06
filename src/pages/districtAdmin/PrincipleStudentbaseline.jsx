import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getStudentAnswers } from "../../redux/slices/principal/principalDashboardSlice";

const PrincipleStudentbaseline = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const subjectId = location.state?.subjectId;
  const studentId = location.state?.studentId;

  const { allQuestionAnswer } = useSelector(
    (state) => state.principalDashboard
  );

  const baslineTest = allQuestionAnswer?.baseline_test || {};
  const answer = baslineTest.answers || [];
  const subject = allQuestionAnswer?.subject || {};

  useEffect(() => {
    if (subjectId && studentId) {
      dispatch(
        getStudentAnswers({ subject_id: subjectId, student_id: studentId })
      );
    }
  }, [dispatch, studentId, subjectId]);

  return (
    <>
      <div className="sub-detail-wrap baseline-ass-wrp">
        <div className="sub-detail-top">
          <h1 className="mb-2">
            {baslineTest.subject_name} Baseline Assessment{" "}
            <span className="pe-4 text-black">
              {" "}
              Score: {subject.percentage}%
            </span>
          </h1>

          <div className="sub-pro mb-0">
            <ul>
              <li>
                <img src="/images/subject-detail/lessons.svg" alt="" />{" "}
                {subject.total_lessons} lessons
              </li>
              <li style={{ color: "#4126A8" }}>
                <img src="/images/subject-detail/quizzes.svg" alt="" />{" "}
                {subject.total_lesson_quizzes} Quizzes
              </li>
            </ul>

            {/* <b className="completed">{baslineTest.status}</b> */}

            <b className="completed">
              {baslineTest.status === "not_started"
                ? "Not Started"
                : baslineTest.status}
            </b>
          </div>
        </div>
        <div className="assessment-result baseline-top border-0 p-0">
          <div className="baseline-ass-q-a drop-list">
            <h2>
              <img
                src="/images/dashboard/earned-certificates/earned-certi.svg"
                alt="earned-certi"
              />{" "}
              Submitted assessment answers
            </h2>
            {answer.length === 0 ? (
              <div>No Data Found...</div>
            ) : (
              <>
                {answer.map((item, index) => (
                  <div className="asse-complete-q-a">
                    <h4>
                      Question {index + 1}: {item.question}
                    </h4>
                    {item?.selected_option ? (
                      <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>Your Answer</span>
                        <img
                          src="/images/baseline-assessment/radio-icon.svg"
                          alt=""
                        />
                        {item.selected_option}
                      </p>
                    ) : (
                      <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>No answer submitted</span>
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="back-btn mt-4 mx-auto">
          <Link to="" onClick={() => navigate(-1)}>
            Return to Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default PrincipleStudentbaseline;
