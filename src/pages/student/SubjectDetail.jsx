import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLessionSlice,
  startLession,
  startQuiz,
} from "../../redux/slices/student/lessionSlice";
import { setCurrentSubject } from "../../redux/slices/student/subjectSlice";

const SubjectDetail = () => {
  const getTapedDomain = localStorage.getItem("DomainStudent");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subjectId") || location?.state?.subjectId;

  const storeAllLession = useSelector(({ lession }) => lession);
  const lessonMap = storeAllLession?.storeAllLession?.lessons;

  const [showBaslineModal, setShowBaselineModal] = useState(false);
  const [showSubmittiveModal, setShowSubmittiveModal] = useState(false);

  useEffect(() => {
    if (subjectId) {
      dispatch(getLessionSlice({ subject_id: subjectId }));
    }
  }, [dispatch, subjectId, location?.key]);

  useEffect(() => {
    if (storeAllLession) {
      dispatch(
        setCurrentSubject(storeAllLession?.storeAllLession?.subject?.Subject)
      );
    }
  }, [storeAllLession]);

  const handleStartLesson = async (lessonId, subjectId, status) => {
    dispatch(
      startQuiz({
        lesson_id: lessonId,
        subject_id: subjectId,
        quiz_type: "lesson",
      })
    ).then((response) => {
      const converedResponse = response.payload?.attempt_id;

      if (converedResponse) {
        // sessionStorage.setItem("hasNavigatedToMyComponent", "true");
        if (status == "completed") {
          sessionStorage.setItem("isCompleted", "true");
        }
        navigate(
          `/student/lesson-detail?lessonId=${lessonId}&attemptId=${converedResponse}&subjectId=${subjectId}`,
          {
            state: {
              simulateMatchingQuizAnswered:
                status == "completed" ? true : false,
              // isReload: false,
            },
          }
        );
      }
    });
  };

  return (
    <>
      <div className="sub-detail-wrap">
        <div className="sub-detail-top">
          <h1 className="mb-2">
            {storeAllLession?.storeAllLession?.subject?.Subject}
            <span>
              <b>{storeAllLession?.storeAllLession?.subject?.percentage}%</b>
            </span>
          </h1>
          <div className="sub-pro">
            <p>{storeAllLession?.storeAllLession?.subject?.description}</p>
            <h1 className="mb-0">
              <span>
                {storeAllLession?.storeAllLession?.subject?.completed} /
                {storeAllLession?.storeAllLession?.subject?.total_lessons}
              </span>
            </h1>
          </div>
          <div className="sub-pro mb-0">
            <ul className="w-100">
              <li>
                <img src="/images/subject-detail/lessons.svg" alt="" />
                {storeAllLession?.storeAllLession?.subject?.total_lessons}{" "}
                lessons
              </li>
              <li>
                <img src="/images/subject-detail/quizzes.svg" alt="" />
                {
                  storeAllLession?.storeAllLession?.subject
                    ?.total_lesson_quizzes
                }{" "}
                Quizzes
              </li>
              <li className="me-3">
                <span>Overall Progress</span>
              </li>
            </ul>
            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${
                    (storeAllLession?.storeAllLession?.subject?.completed /
                      storeAllLession?.storeAllLession?.subject
                        ?.total_lessons) *
                      100 || 0
                  }%`,
                }}
                role="progressbar"
                aria-valuenow={
                  Math.round(
                    (storeAllLession?.storeAllLession?.subject?.completed /
                      storeAllLession?.storeAllLession?.subject
                        ?.total_lessons) *
                      100
                  ) || 0
                }
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        {/* Baseline Assessment */}
        <div className="assessment-result">
          <h6>Baseline Assessment</h6>
          <div className="sub-lessons-list-in drop-btn">
            <div className="lesson-num-ico">
              <span></span>
              {/* <img
                src="/images/subject-detail/sub-lessons/completed.svg"
                alt=""
              /> */}
              <img
                src={`/images/subject-detail/sub-lessons/${
                  storeAllLession?.storeAllLession?.baseline_test?.status ==
                    "locked" ||
                  storeAllLession?.storeAllLession?.baseline_test?.status ==
                    "not_started"
                    ? "locked-not-started"
                    : storeAllLession?.storeAllLession?.baseline_test?.status ==
                      "completed"
                    ? "completed"
                    : "in-progress"
                }.svg`}
                alt={"Baseline Assessment"}
              />
            </div>
            <div className="lesson-data">
              <h2>
                {storeAllLession?.storeAllLession?.baseline_test?.subject_name}{" "}
                - Baseline Assessment
                {storeAllLession?.storeAllLession?.baseline_test?.status ==
                  "not_started" ||
                  ("locked" && (
                    <button
                      type="button"
                      className={showBaslineModal ? "active" : ""}
                      onClick={() => setShowBaselineModal(!showBaslineModal)}
                    >
                      <i className="fa-solid fa-angle-down"></i>
                    </button>
                  ))}
              </h2>
              <p>
                {storeAllLession?.storeAllLession?.baseline_test?.description}
              </p>
            </div>
            <div className="sub-lessons-list-in-ryt">
              <div
                className={`status ${
                  ["not_started", "locked", ""].includes(
                    storeAllLession?.storeAllLession?.baseline_test?.status
                  ) && "inactive"
                } ${
                  ["not_completed", "in_progress", "retake"].includes(
                    storeAllLession?.storeAllLession?.baseline_test?.status
                  ) && "review"
                }`}
              >
                {storeAllLession?.storeAllLession?.baseline_test?.status
                  ?.replace(/_/g, " ")
                  ?.replace(/\b\w/g, (char) => char.toUpperCase()) ||
                  "Not Started"}
              </div>
              <span>&nbsp;</span>
            </div>
          </div>

          {/* Assessment Answers */}
          <div
            className="baseline-ass-q-a drop-list"
            style={{ display: showBaslineModal ? "block" : "none" }}
          >
            <h2>
              <img
                src="/images/dashboard/earned-certificates/earned-certi.svg"
                alt="earned certificate"
              />
              Submitted assessment answers
            </h2>

            {storeAllLession?.storeAllLession?.baseline_test?.answers &&
            storeAllLession.storeAllLession.baseline_test.answers.length > 0 ? (
              storeAllLession.storeAllLession.baseline_test.answers.map(
                (answer, index) => (
                  <div className="asse-complete-q-a" key={index}>
                    <h4>
                      {" "}
                      Question {index + 1}: {answer.question}{" "}
                    </h4>
                    {answer.selected_option ? (
                      <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>Your Answer</span>
                        <img
                          src="/images/baseline-assessment/radio-icon.svg"
                          alt="icon"
                        />
                        {answer.selected_option}
                      </p>
                    ) : (
                      <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>No answer submitted.</span>
                      </p>
                    )}
                  </div>
                )
              )
            ) : (
              <p>
                {" "}
                No data found or no answers submitted for the baseline test.{" "}
              </p>
            )}
          </div>
        </div>

        {/* Lessons */}
        <div className="sub-lessons-list">
          <h3>Lessons</h3>
          {lessonMap && lessonMap.length > 0 ? (
            lessonMap?.map((lesson, index) => (
              <div
                className="sub-lessons-list-in"
                key={lesson?.id}
                style={{
                  pointerEvents: lesson?.status === "locked" ? "none" : "auto",
                  opacity: lesson?.status === "locked" ? 1 : 1,
                  cursor:
                    lesson?.status === "locked" ? "not-allowed" : "pointer",
                }}
              >
                <div className="lesson-num-ico">
                  <span>{index + 1}</span>
                  <img
                    src={`/images/subject-detail/sub-lessons/${
                      lesson?.status == "not_started"
                        ? "locked-not-started"
                        : lesson?.status == "completed"
                        ? "completed"
                        : lesson?.status == "locked"
                        ? "locked-not-started"
                        : "in-progress"
                    }.svg`}
                    alt={lesson?.status}
                  />
                </div>
                <div className="lesson-data">
                  <h2>
                    <Link
                      to="#"
                      onClick={() =>
                        handleStartLesson(
                          lesson?.id,
                          lesson?.subject_id,
                          lesson?.status
                        )
                      }
                    >
                      {lesson?.title}
                    </Link>
                  </h2>
                  <p>{lesson?.desc}</p>
                </div>
                <div className="sub-lessons-list-in-ryt">
                  <div
                    className={`status ${
                      ["not_started", "locked", ""].includes(lesson?.status) &&
                      "inactive"
                    } ${
                      ["not_completed", "in_progress", "retake"].includes(
                        lesson?.status
                      ) && "review"
                    }`}
                  >
                    {lesson?.status
                      ?.replace(/_/g, " ")
                      ?.replace(/\b\w/g, (char) => char.toUpperCase())}
                  </div>
                  <span>
                    <i className="fa-solid fa-clock"></i> {lesson?.duration}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666" }}>
              No lesson found
            </p>
          )}
        </div>

        {/* Summative Assessment */}
        <div className="assessment-result">
          <h6>Summative Assessment</h6>
          <div className="sub-lessons-list-in drop-btn">
            <div className="lesson-num-ico">
              <span></span>
              <img
                src={`/images/subject-detail/sub-lessons/${
                  storeAllLession?.storeAllLession?.summative_test?.status ==
                  "locked"
                    ? "locked-not-started"
                    : storeAllLession?.storeAllLession?.summative_test
                        ?.status == "completed"
                    ? "completed"
                    : storeAllLession?.storeAllLession?.summative_test
                        ?.status == "not_started"
                    ? "locked-not-started"
                    : "in-progress"
                }.svg`}
                alt="lesson icon"
              />
            </div>
            <div className="lesson-data">
              <h2
                style={{ cursor: "pointer" }}
                onClick={() =>
                  storeAllLession?.storeAllLession?.summative_test?.status !=
                    "locked" &&
                  storeAllLession?.storeAllLession?.summative_test?.status !=
                    "completed" &&
                  navigate(`/student/summative-assessment/${subjectId}`, {
                    state: { subjectId: subjectId },
                  })
                }
              >
                {storeAllLession?.storeAllLession?.summative_test?.subject_name}{" "}
                - Summative Assessment
                {storeAllLession?.storeAllLession?.summative_test?.status ===
                  "completed" && (
                  <button
                    type="button"
                    className={showSubmittiveModal ? "active" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSubmittiveModal(!showSubmittiveModal);
                    }}
                  >
                    <i className="fa-solid fa-angle-down"></i>
                  </button>
                )}
              </h2>
              <p>
                {storeAllLession?.storeAllLession?.summative_test?.description}
              </p>
            </div>
            {storeAllLession?.storeAllLession?.summative_test?.status ===
              "retake" && (
              <div className="start-quiz-cta">
                <Link
                  to={
                    `/student/summative-assessment/${subjectId}`
                    // storeAllLession?.storeAllLession?.summative_test?.quizLink
                  }
                  state={{ subjectId: subjectId, isRetake: 1 }}
                >
                  Start Quiz
                </Link>
              </div>
            )}
            <div className="sub-lessons-list-in-ryt">
              <div
                className={`status ${
                  ["not_started", "locked", ""].includes(
                    storeAllLession?.storeAllLession?.summative_test?.status
                  ) && "inactive"
                } ${
                  ["not_completed", "in_progress", "retake"].includes(
                    storeAllLession?.storeAllLession?.summative_test?.status
                  ) && "review"
                }`}
              >
                {storeAllLession?.storeAllLession?.summative_test?.status
                  ?.replace(/_/g, " ")
                  ?.replace(/\b\w/g, (char) => char.toUpperCase()) ||
                  "Not Started"}
              </div>
              <span>&nbsp;</span>
            </div>
          </div>

          {/* Summative Answers */}
          <div
            className="baseline-ass-q-a drop-list"
            style={{ display: showSubmittiveModal ? "block" : "none" }}
          >
            <h2>
              <img
                src="/images/dashboard/earned-certificates/earned-certi.svg"
                alt="earned certificate"
              />
              Submitted assessment answers
            </h2>

            {storeAllLession?.storeAllLession?.summative_test?.answers &&
            storeAllLession.storeAllLession.summative_test.answers.length >
              0 ? (
              storeAllLession.storeAllLession.summative_test.answers.map(
                (answer, index) => (
                  <div className="asse-complete-q-a" key={index}>
                    <h4>{answer.question}</h4>
                    {answer.selected_option ? (
                      <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>Your Answer</span>
                        <img
                          src="/images/baseline-assessment/radio-icon.svg"
                          alt="icon"
                        />
                        {answer.selected_option}
                      </p>
                    ) : (
                      <p className="ps-0 d-flex gap-2 justify-content-start">
                        <span>No answer submitted</span>
                      </p>
                    )}
                  </div>
                )
              )
            ) : (
              <p>
                {" "}
                No data found or no answers submitted for the summative test.{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectDetail;
