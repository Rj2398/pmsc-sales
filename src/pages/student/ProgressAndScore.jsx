import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubject,
  getUserProgress,
  subjectWiseProgress,
  subjectWiseQuizProgress,
} from "../../redux/slices/student/subjectSlice";
import { Link, useNavigate } from "react-router";
import Select from "react-select";

const ProgressAndScore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSubject, progressInfo, subjectWiseInfo, subjectWiseQuizInfo } =
    useSelector((state) => state.subject);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedProgressSubject, setSelectedProgressSubject] = useState(null);
  const [showLession, setShowLession] = useState(false);

  useEffect(() => {
    dispatch(getAllSubject());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubject) {
      dispatch(
        getUserProgress(
          selectedSubject === "all" ? {} : { subject_id: selectedSubject }
        )
      );
      dispatch(
        subjectWiseProgress(
          selectedSubject === "all" ? {} : { subject_id: selectedSubject }
        )
      );
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedProgressSubject) {
      dispatch(
        subjectWiseQuizProgress({ subject_id: selectedProgressSubject })
      );
    }
  }, [selectedProgressSubject]);

  useEffect(() => {
    if (allSubject) {
      setSelectedProgressSubject(allSubject?.[0]?.id);
    }
  }, [allSubject]);

  const colors = [
    {
      base: "#C951E7",
      lesson: "#D573ED",
      summative: "#F1B7FF",
      label: "Life Dream",
    },
    {
      base: "#6466E9",
      lesson: "#888AF3",
      summative: "#B4B5FC",
      label: "Self Awareness",
    },
    {
      base: "#55E6C1",
      lesson: "#82EBD0",
      summative: "#BDEFE2",
      label: "Cognitive Construction",
    },
    {
      base: "#FFC312",
      lesson: "#FEDB74",
      summative: "#FAE9B7",
      label: "Interpersonal Relationships",
    },
    {
      base: "#ED4C67",
      lesson: "#EC6F84",
      summative: "#F5ABB7",
      label: "Coping",
    },
  ];

  return (
    <>
      <div className="top-head prog-sco-wrp">
        <div className="top-head-in">
          <h1> Completion </h1>
          {/* <p className="top-head-p">Your Progress</p> */}
        </div>
        <Select
          name="subject"
          placeholder="Select a subject..."
          isSearchable={false}
          options={[
            { value: "all", label: "All Subjects" },
            ...(allSubject?.map((item) => ({
              value: item.id,
              label: item.name,
            })) || []),
          ]}
          onChange={(selectedOption) =>
            setSelectedSubject(selectedOption.value)
          }
          defaultValue={{ value: "all", label: "All Subjects" }}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "38px",
              fontSize: "16px",
              width: "260px",
              borderColor: "#4126A8",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#4126A8",
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#4126A8" : "white",
              color: state.isFocused ? "white" : "#333",
              "&:active": {
                backgroundColor: "#4126A8",
              },
            }),
          }}
        />
      </div>
      <div className="progress-grid">
        <div className="row g-0">
          <div className="col-lg-3">
            <div className="progress-grid-in ms-0">
              <h2>
                <img src="/images/Overlay.svg" alt="" /> Baseline Assessment
              </h2>
              <h3>{progressInfo?.baseline_assessments?.percentage}%</h3>
              {/* <p className="text-white"> {progressInfo?.baseline_assessments?.completed}/{progressInfo?.baseline_assessments?.total} Completed </p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/3.svg" alt="" />{" "}
                Lesson Quizzes
              </h2>
              <h3>{progressInfo?.lesson_quiz_progress?.percentage}%</h3>
              {/* <!-- <a href="#">See details <i className="fa-solid fa-arrow-right"></i></a> --> */}
              {/* <p className="text-black">{progressInfo?.lesson_quiz_progress?.completed}/{progressInfo?.lesson_quiz_progress?.total} Completed</p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/2.svg" alt="" />{" "}
                Summative Assessment
              </h2>
              <h3>{progressInfo?.summative_assessments?.percentage}%</h3>
              {/* <p className="text-black">{progressInfo?.summative_assessments?.completed}/{progressInfo?.summative_assessments?.total} Completed</p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/3.svg" alt="" />{" "}
                Overall Lesson
              </h2>
              <h3>{progressInfo?.overall_lesson_progress?.percentage}%</h3>
              {/* <p className="text-black">
                {progressInfo?.overall_lesson_progress?.completed}/
                {progressInfo?.prog?.total} lessons completed
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- Chart ----------------------------------------- */}
      <div className="subjects-lesson-progress mt-2">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="my-subject-heading"> Scores </h3>
            <div className="my-subjects" style={{ marginTop: "0" }}>
              <div className="my-subjects-head mb-4">
                <h3 style={{ fontWeight: "700" }}>
                  <img
                    src="/images/dashboard/chart-icon.svg"
                    alt="chart-icon"
                  />{" "}
                  Subject Performance{" "}
                </h3>
              </div>
              <div className="chart-wrap">
                <div className="chart-in">
                  <p className="performance-text">Score</p>
                  <div className="chart-in-percent-grp">
                    {["100%", "80%", "60%", "40%", "20%", "0"].map(
                      (val, idx) => (
                        <div
                          className={`chart-in-percent ${
                            val === 0 ? "align-items-end" : ""
                          }`}
                          key={idx}
                        >
                          <span>{val}</span>
                          <hr
                            style={val === 0 ? { width: "95%" } : {}}
                            className={val === 0 ? "ms-auto" : ""}
                          />
                        </div>
                      )
                    )}

                    <div className="chart-bar-grp">
                      {subjectWiseInfo?.map((subject, idx) => {
                        const defaultColor = colors[idx % colors.length]; // default color if no match found
                        const subjectColor = colors.find(
                          (color) => color.label === subject.subject_name
                        );

                        const baselineColor = subjectColor
                          ? subjectColor.base
                          : defaultColor.base;
                        const lessonColor = subjectColor
                          ? subjectColor.lesson
                          : defaultColor.lesson;
                        const summativeColor = subjectColor
                          ? subjectColor.summative
                          : defaultColor.summative;

                        const baseline = parseFloat(
                          subject.baseline_score || 0
                        );
                        const lesson = parseFloat(subject.lesson_score || 0);
                        const summative = parseFloat(
                          subject.summative_score || 0
                        );

                        return (
                          <div
                            className="chart-bar-in"
                            key={subject.subject_id}
                          >
                            <div className="hover-data">
                              <div className="hover-data-in">
                                <p>
                                  <span
                                    style={{ backgroundColor: baselineColor }}
                                  ></span>{" "}
                                  Baseline Assessment, {baseline}%
                                </p>
                                <p>
                                  <span
                                    style={{ backgroundColor: lessonColor }}
                                  ></span>{" "}
                                  Lesson Quizzes, {lesson}%
                                </p>
                                <p>
                                  <span
                                    style={{ backgroundColor: summativeColor }}
                                  ></span>{" "}
                                  Summative Assessment, {summative}%
                                </p>
                              </div>
                            </div>
                            <div className="bar-wrp">
                              <div
                                className="bar"
                                style={{
                                  backgroundColor: baselineColor,
                                  height: `${baseline}%`,
                                }}
                              ></div>
                              <span>B</span>
                            </div>
                            <div className="bar-wrp">
                              <div
                                className="bar"
                                style={{
                                  backgroundColor: lessonColor,
                                  height: `${lesson}%`,
                                }}
                              ></div>
                              <span>L</span>
                            </div>
                            <div className="bar-wrp">
                              <div
                                className="bar"
                                style={{
                                  backgroundColor: summativeColor,
                                  height: `${summative}%`,
                                }}
                              ></div>
                              <span>S</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="activity-text"> Measurement Type </p>
                <ul>
                  {subjectWiseInfo?.map((subject, idx) => {
                    const defaultColor = colors[idx % colors.length]; // default color if no match found
                    const subjectColor = colors.find(
                      (color) => color.label === subject.subject_name
                    );
                    const baselineColor = subjectColor
                      ? subjectColor.base
                      : defaultColor.base;
                    return (
                      <li key={subject.subject_id}>
                        <span style={{ backgroundColor: baselineColor }}></span>{" "}
                        {subject.subject_name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}

      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0"> Scores by Subject, Lesson & Status </h1>
          </div>
          <select
            name="subject"
            className="ms-auto"
            onChange={(e) => setSelectedProgressSubject(e.target.value)}
          >
            {allSubject?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <a
            style={{ cursor: "pointer" }}
            className="details-cta"
            onClick={() =>
              navigate(
                `/student/subject-detail?subjectId=${selectedProgressSubject}`
              )
            }
          >
            <img src="/images/view-icon.svg" alt="view-icon" />
            View Full Details
          </a>
        </div>
        <div className="table-responsive">
          <table>
            <tr>
              <th style={{ width: "250px" }}> Measurement Type </th>
              <th>Lesson </th>
              <th style={{ width: "400px" }}>Score </th>
              <th>Status </th>
            </tr>
            <tr>
              <td> Baseline Assessment </td>
              <td>---</td>
              <td>
                <div className="prog">
                  <span>
                    {" "}
                    {subjectWiseQuizInfo?.[0]?.baseline_score || 0}%{" "}
                  </span>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${
                          subjectWiseQuizInfo?.[0]?.baseline_score || 0
                        }%`,
                      }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={
                        subjectWiseQuizInfo?.[0]?.baseline_score || 0
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>

              <td>
                <div
                  className={`status  ${
                    subjectWiseQuizInfo?.[0]?.baseline_status == "in_progress"
                      ? "review"
                      : subjectWiseQuizInfo?.[0]?.baseline_status == "review"
                      ? "review"
                      : subjectWiseQuizInfo?.[0]?.baseline_status ==
                        "in_progress"
                      ? "review"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      subjectWiseQuizInfo?.[0]?.baseline_status ===
                        "not_started" ||
                      subjectWiseQuizInfo?.[0]?.baseline_status ===
                        "undefined" ||
                      subjectWiseQuizInfo?.[0]?.baseline_status === "locked" ||
                      !subjectWiseQuizInfo?.[0]?.baseline_status
                        ? "#4b5563"
                        : "",
                  }}
                >
                  {subjectWiseQuizInfo?.[0]?.baseline_status
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                    "Not Started"}
                </div>
              </td>
            </tr>
            <tr>
              <td> Lesson Quizzes </td>
              <td>
                All Lessons
                {subjectWiseQuizInfo?.[0]?.lesson_wise?.length > 0 && (
                  <button
                    type="button"
                    className="lessons-btn"
                    onClick={() => setShowLession(!showLession)}
                  >
                    <i className="fa-solid fa-angle-down"></i>
                  </button>
                )}
              </td>
              <td>&nbsp;</td>
              <td>
                <div
                  className={`status  ${
                    subjectWiseQuizInfo?.[0]?.lesson_overall_status ==
                    "in_progress"
                      ? "review"
                      : subjectWiseQuizInfo?.[0]?.lesson_overall_status ==
                        "review"
                      ? "review"
                      : subjectWiseQuizInfo?.[0]?.lesson_overall_status ==
                        "in_progress"
                      ? "review"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      subjectWiseQuizInfo?.[0]?.lesson_overall_status ===
                        "not_started" ||
                      subjectWiseQuizInfo?.[0]?.lesson_overall_status ===
                        "locked" ||
                      subjectWiseQuizInfo?.[0]?.lesson_overall_status ===
                        "undefined" ||
                      !subjectWiseQuizInfo?.[0]?.lesson_overall_status
                        ? "#4b5563"
                        : "",
                  }}
                >
                  {subjectWiseQuizInfo?.[0]?.lesson_overall_status
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                    "Not Started"}
                </div>
              </td>
            </tr>
            {showLession && (
              <>
                {subjectWiseQuizInfo?.[0]?.lesson_wise?.map((item, index) => (
                  <tr
                    className="lessons-list"
                    key={index}
                    style={{ display: showLession ? "" : "none" }}
                  >
                    <td>&nbsp;</td>
                    <td>{item?.lesson_name}</td>
                    <td>
                      <div className="prog">
                        <span> {item?.percentage}% </span>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: `${item?.percentage}%` }}
                            role="progressbar"
                            aria-label="Basic example"
                            aria-valuenow={item?.percentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        className={`status  ${
                          item?.status == "in_progress"
                            ? "review"
                            : item?.status == "review"
                            ? "review"
                            : item?.status == "in_progress"
                            ? "review"
                            : ""
                        }`}
                        style={{
                          backgroundColor:
                            item?.status === "not_started" ||
                            item?.status === "locked" ||
                            item?.status === "undefined" ||
                            !item?.status
                              ? "#4b5563"
                              : "",
                        }}
                      >
                        {item?.status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                          "Not Started"}
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}

            <tr>
              <td> Summative Assessment </td>
              <td>---</td>
              <td>
                <div className="prog">
                  <span>
                    {" "}
                    {subjectWiseQuizInfo?.[0]?.summative_score || 0}%{" "}
                  </span>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${subjectWiseQuizInfo?.[0]?.summative_score}%`,
                      }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={subjectWiseQuizInfo?.[0]?.summative_score}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <div
                  className={`status  ${
                    subjectWiseQuizInfo?.[0]?.summative_status == "in_progress"
                      ? "review"
                      : subjectWiseQuizInfo?.[0]?.summative_status == "review"
                      ? "review"
                      : subjectWiseQuizInfo?.[0]?.summative_status ==
                        "in_progress"
                      ? "review"
                      : subjectWiseQuizInfo?.[0]?.summative_status == "retake"
                      ? "review"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      subjectWiseQuizInfo?.[0]?.summative_status ===
                        "not_started" ||
                      subjectWiseQuizInfo?.[0]?.summative_status === "locked" ||
                      subjectWiseQuizInfo?.[0]?.summative_status ===
                        "undefined" ||
                      !subjectWiseQuizInfo?.[0]?.summative_status
                        ? "#4b5563"
                        : "",
                  }}
                >
                  {subjectWiseQuizInfo?.[0]?.summative_status
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                    "Not Started"}
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProgressAndScore;
