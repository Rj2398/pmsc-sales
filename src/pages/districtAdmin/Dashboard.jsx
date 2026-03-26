import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrincipalSubDashboard, getSubjectLevel, getSubjectsByLevel, } from "../../redux/slices/principal/principalDashboardSlice";
import Select from "react-select";
import { getAllSchoolList } from "../../redux/slices/districtAdmin/districtSlice";

const Dashboard = () => {
  const loaction = useLocation();
  const dispatch = useDispatch();
  const { classLevels, subDashboard, allSubjects, allDashboardData } = useSelector((state) => state.principalDashboard);
  const { allSchoolList } = useSelector((state) => state.districtDashboard);

  const [selectedLevel, setSelectedLevel] = useState(() => {
    return localStorage.getItem("classLevel") || null;
  });

  const [selectedSchool, setSelectedSchool] = useState(() => {
    return localStorage.getItem("schoolID") || null;
  });

  useEffect(() => {
    dispatch(getSubjectLevel());
    dispatch(getAllSchoolList());
  }, [dispatch]);

  useEffect(() => {
    if (selectedLevel == null && classLevels?.length > 0) {
      const defaultLevel = classLevels?.[0].id;
      setSelectedLevel(defaultLevel);
      localStorage.setItem("classLevel", defaultLevel);
    }
  }, [selectedLevel, classLevels]);

  useEffect(() => {
    if (selectedSchool == null && allSchoolList?.length > 0) {
      const defaultLevel = allSchoolList?.[0].id;
      setSelectedSchool(defaultLevel);
      localStorage.setItem("schoolID", defaultLevel);
    }
  }, [selectedSchool, allSchoolList]);

  useEffect(() => {
    dispatch(getSubjectsByLevel({ level_id: selectedLevel || "1", school_id: selectedSchool || "1" }));
    dispatch(getPrincipalSubDashboard({ level_id: selectedLevel || "1", school_id: selectedSchool || "1"}));
  }, [dispatch, selectedLevel,selectedSchool, loaction.key]);

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setSelectedLevel(newLevel);
    localStorage.setItem("classLevel", newLevel);
  };

  const handleSchoolChange = (event) => {
    const newLevel = event.target.value;
    setSelectedSchool(newLevel);
    localStorage.setItem("schoolID", newLevel);
  };

  const options = classLevels?.map(level => ({
    value: level?.id,
    label: level?.name,
  }));

  const schoolOptions = allSchoolList?.map(level => ({
    value: level?.id,
    label: level?.school,
  }));

  return (
    <>
      <div className="top-head">

        <div className="top-head-in">
          <h1>Welcome, {allDashboardData?.username}</h1>
          <p className="top-head-p">{allSchoolList?.find(school => school.id == selectedSchool)?.school} Completion</p>
        </div>
        
        <div style={{display:"flex",gap:10}}>
          <Select isSearchable={false} styles={{
              control: (base) => ({
                ...base,
                minHeight: '38px',
                width:'220px',
                fontSize:"16px",
                borderColor:"#4126A8",
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#4126A8'
                }
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#4126A8' : 'white',
                color: state.isFocused ? 'white' : '#333',
                '&:active': {
                    backgroundColor: '#4126A8'
                }
              }),
            }} options={schoolOptions} value={schoolOptions?.find(opt => opt.value == selectedSchool)}
            onChange={selected => handleSchoolChange({ target: { name: 'level', value: selected.value }})}/>

          <Select isSearchable={false} styles={{
              control: (base) => ({
                ...base,
                minHeight: '38px',
                fontSize:"16px",
                borderColor:"#4126A8",
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#4126A8'
                }
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#4126A8' : 'white',
                color: state.isFocused ? 'white' : '#333',
                '&:active': {
                    backgroundColor: '#4126A8'
                }
              }),
            }} options={options} value={options?.find(opt => opt.value == selectedLevel)}
            onChange={selected => handleLevelChange({ target: { name: 'level', value: selected.value }})}/>
        </div>
      </div>
      {/* </div> */}
      <div className="progress-grid principal-progress">
        <div className="row g-0">
          <div className="col-lg-3">

            <div className="progress-grid-in ms-0">
              <h2>
                <img src="/images/Overlay.svg" alt="" />
                Baseline <br /> Assessments
              </h2>
              <h3>{subDashboard?.baseline_assessments?.percentage || "0"}%</h3>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="../images/dashboard/progress-grid/4.svg" alt="" />
                Lesson Quizzes
              </h2>
              <h3>{subDashboard?.lesson_quiz_progress?.percentage || "0"}%</h3>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="../images/dashboard/progress-grid/2.svg" alt="" />
                Summative Assessments
              </h2>
              <h3>{subDashboard?.summative_assessments?.percentage || "0"}%</h3>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="../images/dashboard/progress-grid/3.svg" alt="" />{" "}
                Overall Level
              </h2>
              <h3>
                {subDashboard?.overall_lesson_progress?.percentage || "0"}%
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="subjects-lesson-progress">
        <div className="row">
          <div className="col-lg-12">
            <div className="my-subjects">
              <div className="my-subjects-head">
                <h3>
                  <img src="/images/dashboard/book-icon.svg" alt="" />
                  {allSubjects?.title || "All Classes"}
                </h3>

              </div>

              <div className="my-subjects-grid">
                {allSubjects?.map((subject, index) => (
                  <div className="my-subjects-itm" key={index}>
                    <div className="my-subjects-itm-head">
                      <h4>
                        {subject?.subject_name} <br />{" "}
                        <b> {subject?.total_lesson} lessons</b>
                      </h4>
                      <span>
                        <img src="../images/student-count.svg" alt="" />
                        {subject?.total_student}
                      </span>
                    </div>
                    <div className="subject-rate green">
                      <h5>
                        <i className="fa-solid fa-circle"></i>&nbsp; Completion
                        Rate
                      </h5>
                      <span>
                        ({subject?.completion_rate}%) &nbsp;
                        {subject?.complete_completion} / {subject?.total_completion}
                      </span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${subject?.completion_rate}%` }}
                      ></div>
                    </div>
                    {/* <div className="subject-rate">
                      <h5> <i className="fa-solid fa-circle"></i>&nbsp; Average Quiz Score </h5>
                      <span>{subject?.avg_quiz_score}%</span>
                    </div> */}
                    <ul>
                      <li>
                        <p>
                          {" "}
                          <img
                            src="../images/dashboard/subjects/circle-tick.svg"
                            alt="tick"
                          />{" "}
                          Baseline Assessment{" "}
                        </p>
                        <span>
                          {subject?.baseline_assessments?.completed}/
                          {subject?.baseline_assessments?.total}
                        </span>
                        {/* <span>{subject?.baselineAssessment}</span>  */}
                      </li>
                      <li>
                        <p>
                          {" "}
                          <img
                            src="../images/dashboard/subjects/circle-tick.svg"
                            alt="tick"
                          />{" "}
                          Summative Assessment{" "}
                        </p>
                        <span>
                          {subject?.summative_assessments?.completed}/
                          {subject?.summative_assessments?.total}
                        </span>
                        {/* <span>{subject?.summativeAssessment}</span> */}
                      </li>
                    </ul>
                    <div className="last-active">
                      <img src="../images/time.svg" alt="time" />
                      <p>
                        Last activity: {subject?.last_activity + " hours ago"}
                      </p>
                    </div>
                    <Link
                      to={`/district-admin/class-detail/${subject?.subject_id}`}
                      state={{ subjectId: subject?.subject_id }}
                    >
                      View Subject Details
                      <i className="fa-solid fa-angle-right"></i>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
