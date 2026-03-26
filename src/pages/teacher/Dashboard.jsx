import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectLevel, getSubjectsByLevel, getTeacherSubDashboard} from "../../redux/slices/teacher/dashboardSlice";
import Select from "react-select";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { classLevels, allSubjects, subDashboard, allSubjectsData } = useSelector((state) => state.dashboard);

  const [selectedLevel, setSelectedLevel] = useState(() => {
    return localStorage.getItem("classLevel") || null;
  });

  const allowedLevels = JSON.parse(localStorage.getItem("pmsc"))?.class_level;

  useEffect(() => {
    if(allowedLevels == null){
      dispatch(getSubjectLevel());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!selectedLevel && classLevels?.length > 0 && allowedLevels == null) {
      const defaultLevel = classLevels[0].id;
      setSelectedLevel(defaultLevel);
      localStorage.setItem("classLevel", defaultLevel);
    }
  }, [classLevels, selectedLevel]);

  useEffect(() => {
    if (selectedLevel || allowedLevels != null) {
      dispatch(getSubjectsByLevel({ level_id: selectedLevel ? selectedLevel : allowedLevels == "ruby" ? 1 : 2 }));
      dispatch(getTeacherSubDashboard({ level_id: selectedLevel ? selectedLevel : allowedLevels == "ruby" ? 1 : 2 }));
    }
  }, [dispatch, selectedLevel, allowedLevels]);

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setSelectedLevel(newLevel);
    localStorage.setItem("classLevel", newLevel);
  };

  const options = classLevels?.map(level => ({
    value: level?.id,
    label: level?.name,
  }));

  return (
    <>
      <div className="top-head">
        <div className="top-head-in">
          <h1>Welcome, {allSubjectsData?.username}</h1>
          <p className="top-head-p"> Student Completion </p>
        </div>
        {/* <select value={selectedLevel || ""} name="level" onChange={handleLevelChange} >
          {classLevels?.map((level, index) => (
            <option key={index} value={level?.id}>
              {level?.name}
            </option>
          ))}
        </select> */}
        {allowedLevels == null && <Select isSearchable={false}
          styles={{
            control: (base) => ({
              ...base, minHeight: '38px', fontSize:"16px", borderColor:"#4126A8", boxShadow: 'none',
              '&:hover': { borderColor: '#4126A8'}
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#4126A8' : 'white', color: state.isFocused ? 'white' : '#333',
              '&:active': {
                  backgroundColor: '#4126A8'
              }
            }),
          }}
        options={options} value={options?.find(opt => opt.value == selectedLevel)}
          onChange={selected => handleLevelChange({ target: { name: 'level', value: selected.value }})}/>}
      </div>
      <div className="progress-grid">
        <div className="row g-0">
          <div className="col-lg-3">
            <div className="progress-grid-in ms-0">
              <h2>
                {/* <img src="/images/Overlay.svg" alt="" /> */}
                <img src="/images/Overlay.svg" alt="Baseline" />
                Baseline <br /> Assessments
              </h2>
              <h3>{subDashboard?.baseline_assessments?.percentage}%</h3>
              {/* <!-- <a href="#">See details <i className="fa-regular fa-arrow-right"></i></a> --> */}
              {/* <p className="text-white">{subDashboard?.baseline_assessments?.completed}/{subDashboard?.baseline_assessments?.total} completed</p> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="../images/dashboard/progress-grid/4.svg" alt="Lessons" />
                Lesson Quizzes
              </h2>
              <h3>{subDashboard?.lesson_quiz_progress?.percentage}%</h3>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="../images/dashboard/progress-grid/2.svg" alt="Summative Assessments" />
                Summative Assessments
              </h2>
              <h3>{subDashboard?.summative_assessments?.percentage}%</h3>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="../images/dashboard/progress-grid/3.svg" alt="Overall Level" /> Overall Level
              </h2>
              <h3>{subDashboard?.mwl_progress?.percentage}%</h3>
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
                  <img src="../images/dashboard/book-icon.svg" alt="icon" />{" "}
                  Classes
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
                        {subject?.complete_completion}/{subject?.total_completion}
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
                      </li>
                    </ul>
                    <div className="last-active">
                      <img src="../images/time.svg" alt="time" />
                      <p>
                        Last activity: {subject?.last_activity + " hours ago"}
                      </p>
                    </div>
                    <Link
                      to={`/teacher/class-detail/${subject?.subject_id}`}
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


// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { getSubjectLevel, getSubjectsByLevel, getTeacherSubDashboard} from "../../redux/slices/teacher/dashboardSlice";
// import Select from "react-select";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { classLevels, allSubjects, subDashboard, allSubjectsData } = useSelector((state) => state.dashboard);

//   const [selectedLevel, setSelectedLevel] = useState(() => {
//     return localStorage.getItem("classLevel") || null;
//   });

//   useEffect(() => {
//     dispatch(getSubjectLevel());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!selectedLevel && classLevels?.length > 0) {
//       const defaultLevel = classLevels[0].id;
//       setSelectedLevel(defaultLevel);
//       localStorage.setItem("classLevel", defaultLevel);
//     }
//   }, [classLevels, selectedLevel]);

//   useEffect(() => {
//     if (selectedLevel) {
//       dispatch(getSubjectsByLevel({ level_id: selectedLevel }));
//       dispatch(getTeacherSubDashboard({ level_id: selectedLevel }));
//     }
//   }, [dispatch, selectedLevel]);

//   const handleLevelChange = (event) => {
//     const newLevel = event.target.value;
//     setSelectedLevel(newLevel);
//     localStorage.setItem("classLevel", newLevel);
//   };

//   const options = classLevels?.map(level => ({
//     value: level?.id,
//     label: level?.name,
//   }));

//   return (
//     <>
//       <div className="top-head">
//         <div className="top-head-in">
//           <h1>Welcome, {allSubjectsData?.username}</h1>
//           <p className="top-head-p"> Student Completion </p>
//         </div>
//         {/* <select value={selectedLevel || ""} name="level" onChange={handleLevelChange} >
//           {classLevels?.map((level, index) => (
//             <option key={index} value={level?.id}>
//               {level?.name}
//             </option>
//           ))}
//         </select> */}
//         <Select isSearchable={false}
//           styles={{
//             control: (base) => ({
//               ...base,
//               minHeight: '38px',
//               fontSize:"16px",
//               borderColor:"#4126A8",
//               boxShadow: 'none',
//               '&:hover': {
//                 borderColor: '#4126A8'
//               }
//             }),
//             option: (base, state) => ({
//               ...base,
//               backgroundColor: state.isFocused ? '#4126A8' : 'white',
//               color: state.isFocused ? 'white' : '#333',
//               '&:active': {
//                   backgroundColor: '#4126A8'
//               }
//             }),
//           }}
//         options={options} value={options?.find(opt => opt.value == selectedLevel)}
//           onChange={selected => handleLevelChange({ target: { name: 'level', value: selected.value }})}/>
//       </div>
//       <div className="progress-grid">
//         <div className="row g-0">
//           <div className="col-lg-3">
//             <div className="progress-grid-in ms-0">
//               <h2>
//                 {/* <img src="/images/Overlay.svg" alt="" /> */}
//                 <img src="/images/Overlay.svg" alt="Baseline" />
//                 Baseline <br /> Assessment
//               </h2>
//               <h3>{subDashboard?.baseline_assessments?.percentage}%</h3>
//               {/* <!-- <a href="#">See details <i className="fa-regular fa-arrow-right"></i></a> --> */}
//               {/* <p className="text-white">{subDashboard?.baseline_assessments?.completed}/{subDashboard?.baseline_assessments?.total} completed</p> */}
//             </div>
//           </div>
//           <div className="col-lg-3">
//             <div className="progress-grid-in">
//               <h2>
//                 <img src="../images/dashboard/progress-grid/4.svg" alt="Lessons" />
//                 Lesson Quizzes
//               </h2>
//               <h3>{subDashboard?.lesson_quiz_progress?.percentage}%</h3>
//             </div>
//           </div>
//           <div className="col-lg-3">
//             <div className="progress-grid-in">
//               <h2>
//                 <img src="../images/dashboard/progress-grid/2.svg" alt="Summative Assessments" />
//                 Summative Assessment
//               </h2>
//               <h3>{subDashboard?.summative_assessments?.percentage}%</h3>
//             </div>
//           </div>
//           <div className="col-lg-3">
//             <div className="progress-grid-in">
//               <h2>
//                 <img src="../images/dashboard/progress-grid/3.svg" alt="Overall Level" /> Overall Level
//               </h2>
//               <h3>{subDashboard?.mwl_progress?.percentage}%</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="subjects-lesson-progress">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="my-subjects">
//               <div className="my-subjects-head">
//                 <h3>
//                   <img src="../images/dashboard/book-icon.svg" alt="icon" />{" "}
//                   Classes
//                 </h3>
//               </div>
//               <div className="my-subjects-grid">
//                 {allSubjects?.map((subject, index) => (
//                   <div className="my-subjects-itm" key={index}>
//                     <div className="my-subjects-itm-head">
//                       <h4>
//                         {subject?.subject_name} <br />{" "}
//                         <b> {subject?.total_lesson} lessons</b>
//                       </h4>
//                       <span>
//                         <img src="../images/student-count.svg" alt="" />
//                         {subject?.total_student}
//                       </span>
//                     </div>
//                     <div className="subject-rate green">
//                       <h5>
//                         <i className="fa-solid fa-circle"></i>&nbsp; Completion
//                         Rate
//                       </h5>
//                       <span>
//                         ({subject?.completion_rate}%) &nbsp;
//                         {subject?.complete_completion}/{subject?.total_completion}
//                       </span>
//                     </div>
//                     <div className="progress">
//                       <div
//                         className="progress-bar"
//                         style={{ width: `${subject?.completion_rate}%` }}
//                       ></div>
//                     </div>
//                     <div className="subject-rate">
//                       <h5>
//                         <i className="fa-solid fa-circle"></i>&nbsp; Average
//                         Quiz Score
//                       </h5>
//                       <span>{subject?.avg_quiz_score}%</span>
//                     </div>
//                     <ul>
//                       <li>
//                         <p>
//                           {" "}
//                           <img
//                             src="../images/dashboard/subjects/circle-tick.svg"
//                             alt="tick"
//                           />{" "}
//                           Baseline Assessment{" "}
//                         </p>
//                         <span>
//                           {subject?.baseline_assessments?.completed}/
//                           {subject?.baseline_assessments?.total}
//                         </span>
//                       </li>
//                       <li>
//                         <p>
//                           {" "}
//                           <img
//                             src="../images/dashboard/subjects/circle-tick.svg"
//                             alt="tick"
//                           />{" "}
//                           Summative Assessment{" "}
//                         </p>
//                         <span>
//                           {subject?.summative_assessments?.completed}/
//                           {subject?.summative_assessments?.total}
//                         </span>
//                       </li>
//                     </ul>
//                     <div className="last-active">
//                       <img src="../images/time.svg" alt="time" />
//                       <p>
//                         Last activity: {subject?.last_activity + " hours ago"}
//                       </p>
//                     </div>
//                     <Link
//                       to={`/teacher/class-detail/${subject?.subject_id}`}
//                       state={{ subjectId: subject?.subject_id }}
//                     >
//                       View Subject Details
//                       <i className="fa-solid fa-angle-right"></i>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
