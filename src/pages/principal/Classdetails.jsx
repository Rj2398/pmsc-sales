import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import {
  getClassDetailBySubject,
  getSubjectList,
  setPrincipalCurrentSubject,
} from "../../redux/slices/principal/principalDashboardSlice";
import { useDispatch, useSelector } from "react-redux";

const Classdetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const paramData = useParams();

  const subjectId = location?.state?.subjectId
    ? location?.state?.subjectId
    : paramData?.subjectId;
  const teachercoming = location?.state?.teachercoming;

  const currentLevel = localStorage.getItem("classLevel");

  const { classDetails, subjectList } = useSelector(
    (state) => state.principalDashboard
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredStudent = classDetails?.students?.filter(
    (student) =>
      student.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (subjectId) {
      dispatch(getClassDetailBySubject({ subject_id: subjectId }));
    }
    if (currentLevel) {
      dispatch(getSubjectList({ level_id: currentLevel }));
    }
  }, [subjectId, currentLevel]);

  useEffect(() => {
    if (selectedCourses?.length > 0) {
      dispatch(getClassDetailBySubject({ subject_id: selectedCourses?.[0] }));
    }
  }, [selectedCourses?.length > 0, selectedCourses]);

  useEffect(() => {
    if (classDetails) {
      dispatch(setPrincipalCurrentSubject(classDetails?.subject_name));
    }
  }, [classDetails]);

  const handleToggle = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id)); // Uncheck
    } else {
      setList([...list, id]); // Check
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll(".influ-dropdown");
      let clickedInsideDropdown = false;

      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target)) {
          clickedInsideDropdown = true;
        }
      });

      if (!clickedInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudent?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  //pagination

  return (
    <>
      <div className="top-head align-items-start">
        <div className="top-head-in">
          <h1>{classDetails?.subject_name || "Not Available"}</h1>
          <p>{classDetails?.subject_desc}</p>
          <ul>
            <li>
              <img src="/images/subject-detail/lessons.svg" alt="" />{" "}
              {classDetails?.total_lesson + " lessons"}
            </li>
          </ul>
        </div>
        <div className="back-btn ms-auto">
          {!teachercoming ? (
            <Link
              to={`/principal/student-subject-detail/${subjectId}`}
              state={{ subjectId: subjectId }}
            >
              <img src="/images/view-icon.svg" alt="View Subject Info" /> View
              Subject Info
            </Link>
          ) : (
            <Link
              to={`/principal/student/subject/detail/${subjectId}`}
              state={{ subjectId: subjectId }}
            >
              <img src="/images/view-icon.svg" alt="View Subject Info" /> View
              Subject Info
            </Link>
          )}
        </div>
        <div className="influ-btns mx-3">
          {/* Dropdown */}
          <div className="influ-dropdown">
            <button
              className="influ-btn influ-drop-btn"
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "courseDropdown" ? null : "courseDropdown"
                )
              }
            >
              All Subjects{" "}
              <i
                className={`fa-solid ${
                  activeDropdown === "courseDropdown"
                    ? "fa-angle-up"
                    : "fa-angle-down"
                }`}
              ></i>
            </button>

            <div
              className="influ-drop-list"
              style={{
                display: activeDropdown === "courseDropdown" ? "block" : "none",
              }}
            >
              <div className="influ-drop-list-inner">
                {subjectList?.map((item) => (
                  <div key={item.id} className="influ-drop-list-item">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(item.id)}
                      onChange={() => {
                        if (selectedCourses.includes(item.id)) {
                          setSelectedCourses([]);
                        } else {
                          setSelectedCourses([item.id]);
                        }
                      }}
                    />
                    {item?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="back-btn">
          <Link onClick={() => navigate(-1)}>
            <img src="/images/baseline-assessment/back-icon.svg" alt="" /> Back
          </Link>
        </div>
      </div>

      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0">
              Students({classDetails?.students?.length || 0})
            </h1>
          </div>

          <div className="students-src">
            <input
              type="text"
              placeholder="Search emails by subject, sen....."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: "250px" }}>Student Name</th>
                <th>Status </th>
                <th style={{ width: "300px" }}>Completion Score </th>
                {/* <th>Avg. Score</th> */}
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              {!currentStudents || currentStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ paddingTop: "25px", textAlign: "center" }}
                  >
                    No Student Available
                  </td>
                </tr>
              ) : (
                currentStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student?.student_name || "Lorem Ipsum"}</td>
                    <td>
                      <div
                        className={`status ${
                          ["not_started", "locked"].includes(student?.status) &&
                          "inactive"
                        } ${
                          ["review", "in_progress"].includes(student?.status) &&
                          "review"
                        }`}
                      >
                        {student?.status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </div>
                    </td>
                    <td>
                      <div className="prog">
                        <span> {student?.overall_percentage ?? "0"}% </span>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${student?.overall_percentage ?? 0}%`,
                            }}
                            role="progressbar"
                            aria-valuenow={student?.overall_percentage ?? 0}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                    {/* <td>
                      <div style={{ color: "#16A34A" }}>
                        {`${student?.overall_percentage ?? 0}%`}
                      </div>
                    </td> */}
                    <td>
                      {teachercoming ? (
                        <Link
                          to="/principal-student-profiles"
                          state={{
                            studentId: student?.student_id,
                            subjectId:
                              selectedCourses?.length > 0
                                ? selectedCourses[0]
                                : subjectId,
                            principalstudentBaseline:
                              "principalstudentBaseline",
                          }}
                        >
                          <i className="fa-light fa-eye"></i> View Details
                        </Link>
                      ) : (
                        <Link
                          to="/principal/student-profile"
                          state={{
                            studentId: student?.student_id,
                            subjectId:
                              selectedCourses?.length > 0
                                ? selectedCourses[0]
                                : subjectId,
                          }}
                        >
                          <i className="fa-light fa-eye"></i> View Details
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Section */}
          <div
            className="panel-pagination"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            {/* Left Side: Showing Info */}
            <div>
              {filteredStudent?.length > 0 && (
                <span>
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredStudent.length)} of{" "}
                  {filteredStudent.length} entries
                </span>
              )}
            </div>

            {/* Right Side: Pagination Controls */}
            <div className="pagination d-flex align-items-center gap-1">
              {/* Previous Button */}
              <button
                className="page-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ padding: "0px 9px" }}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from(
                { length: Math.ceil(filteredStudent?.length / itemsPerPage) },
                (_, i) => {
                  const isActive = currentPage === i + 1;
                  return (
                    <button
                      key={i}
                      className="page-btn"
                      onClick={() => setCurrentPage(i + 1)}
                      style={{
                        width: "40px",
                        color: isActive ? "#fff" : "#000", // White text for active, black for inactive
                        backgroundColor: isActive ? "#4126A8" : "white", // Color for active, white for inactive
                        border: "1px solid #ccc",
                        // borderRadius: "5px",
                        padding: "2px",
                      }}
                    >
                      {i + 1}
                    </button>
                  );
                }
              )}

              {/* Next Button */}
              <button
                className="page-btn"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredStudent?.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredStudent?.length / itemsPerPage)
                }
                style={{ padding: "0px 9px" }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Classdetails;

// import React, { useState, useEffect } from "react";
// import data from "../../assets/principal.json";
// import { Link, useLocation, useNavigate, useParams } from "react-router";
// import { getClassDetailBySubject, getSubjectList, setPrincipalCurrentSubject } from "../../redux/slices/principal/principalDashboardSlice";
// import { useDispatch, useSelector } from "react-redux";

// const Classdetails = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const paramData = useParams();

//   const subjectId = location?.state?.subjectId ? location?.state?.subjectId : paramData?.subjectId;
//   const teachercoming = location?.state?.teachercoming;

//   const currentLevel = localStorage.getItem("classLevel");

//   const { classDetails, subjectList, } = useSelector((state) => state.principalDashboard)

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const filteredStudent = classDetails?.students?.filter((student) => student.student_name.toLowerCase().includes(searchQuery.toLowerCase()) || student.student_email.toLowerCase().includes(searchQuery.toLowerCase()) || student?.status?.toLowerCase().includes(searchQuery.toLowerCase()))

//   useEffect(() => {
//     if (subjectId) {

//       dispatch(getClassDetailBySubject({ subject_id: subjectId }))

//     }
//     if (currentLevel) {
//       dispatch(getSubjectList({ level_id: currentLevel }))
//     }
//   }, [subjectId, currentLevel]);

//   useEffect(() => {
//     if (selectedCourses?.length > 0) {
//       dispatch(getClassDetailBySubject({ subject_id: selectedCourses?.[0] }))
//     }
//   }, [selectedCourses?.length > 0, selectedCourses]);

//   useEffect(() => {
//     if (classDetails) {
//       dispatch(setPrincipalCurrentSubject(classDetails?.subject_name))

//     }
//   }, [classDetails]);

//   const handleToggle = (id, list, setList) => {
//     if (list.includes(id)) {
//       setList(list.filter((item) => item !== id)); // Uncheck
//     } else {
//       setList([...list, id]); // Check
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const dropdowns = document.querySelectorAll(".influ-dropdown");
//       let clickedInsideDropdown = false;

//       dropdowns.forEach((dropdown) => {
//         if (dropdown.contains(event.target)) {
//           clickedInsideDropdown = true;
//         }
//       });

//       if (!clickedInsideDropdown) {
//         setActiveDropdown(null);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   //pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentStudents = filteredStudent?.slice(indexOfFirstItem, indexOfLastItem);
//   //pagination

//   return (
//     <>
//       <div className="top-head align-items-start">
//         {/* <div className="top-head-in">
//           <h1>Life Dream</h1>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
//           <ul>
//             <li>
//               <img src="../images/subject-detail/lessons.svg" alt="" /> 8
//               lessons
//             </li>
//           </ul>
//         </div> */}

//         <div className="top-head-in">
//           <h1>{classDetails?.subject_name || "Not Available"}</h1>
//           <p>{classDetails?.subject_desc || "Not Available"}</p>
//           <ul>
//             <li>
//               <img src="/images/subject-detail/lessons.svg" alt="" /> {classDetails?.total_lesson + " lessons"}
//             </li>
//           </ul>
//         </div>
//         <div className="back-btn ms-auto">

//           {/* <Link to={`/principal/student-subject-detail/${subjectId}`} state={{ subjectId: subjectId }}>
//             <img src="/images/view-icon.svg" alt="" /> View Subject Info
//           </Link> */}

//           {!teachercoming ? (
//             <Link to={`/principal/student-subject-detail/${subjectId}`} state={{ subjectId: subjectId }}>
//               <img src="/images/view-icon.svg" alt="" /> View Subject Info
//             </Link>
//           ) : (
//             <Link to={`/principal/student/subject/detail/${subjectId}`} state={{ subjectId: subjectId }}>
//               <img src="/images/view-icon.svg" alt="" /> View Subject Info
//             </Link>
//           )}
//         </div>
//         <div className="influ-btns mx-3">
//           {/* <!-- INNER-DROPDOWN --> */}
//           <div className="influ-dropdown">
//             <button
//               className="influ-btn influ-drop-btn"
//               type="button"
//               onClick={() =>
//                 setActiveDropdown(
//                   activeDropdown === "courseDropdown" ? null : "courseDropdown"
//                 )
//               }
//             >
//               {/* All Subjects <i className={`fas fa-chevron-down ${activeDropdown === "courseDropdown" ? "active" : ""}`}></i> */}
//               All Subjects{" "}
//               <i
//                 className={`fa-solid ${activeDropdown === "courseDropdown"
//                   ? "fa-angle-up"
//                   : "fa-angle-down"
//                   }`}
//               ></i>
//             </button>

//             <div
//               className="influ-drop-list"
//               style={{
//                 display: activeDropdown === "courseDropdown" ? "block" : "none",
//               }}
//             >
//               <div className="influ-drop-list-inner">
//                 {subjectList?.map((item) => (
//                   // <div key={item.id} className="influ-drop-list-item">
//                   //   <input type="checkbox" style={selectedCourses.length > 0 && !selectedCourses.includes(item.id) ? {backgroundColor:"#d7cdcd"} : {}}
//                   //     checked={selectedCourses.includes(item.id)} disabled={selectedCourses.length > 0 && !selectedCourses.includes(item.id)}
//                   //     onChange={() =>
//                   //       handleToggle(
//                   //         item.id,
//                   //         selectedCourses,
//                   //         setSelectedCourses
//                   //       )
//                   //     }
//                   //   />
//                   //   {item.name}
//                   // </div>
//                   <div key={item.id} className="influ-drop-list-item">
//                     <input
//                       type="checkbox"
//                       checked={selectedCourses.includes(item.id)}
//                       onChange={() => {
//                         if (selectedCourses.includes(item.id)) {
//                           setSelectedCourses([]); // Unselect if already selected
//                         } else {
//                           setSelectedCourses([item.id]); // Select this student only
//                         }
//                       }}
//                     />
//                     {item?.name}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           {/* <!-- INNER-DROPDOWN --> */}
//         </div>
//         {/* <!-- <select name="year" className="mx-3">
// 					<option value="1">Subject Name</option>
// 					<option value="2">Life Dream</option>
// 					<option value="3">Self-Awareness</option>
// 					<option value="4">Cognitive Construction</option>
// 					<option value="5">Coping</option>
// 					<option value="6">Interpersonal Relationships</option>
// 				</select> --> */}
//         <div className="back-btn">
//           <Link onClick={() => navigate(-1)}>
//             <img src="/images/baseline-assessment/back-icon.svg" alt="" />{" "}
//             Back
//           </Link>
//         </div>
//       </div>

//       <div className="my-subjects">
//         <div className="top-head">
//           <div className="top-head-in">
//             <h1 className="mb-0">Students({classDetails?.students?.length})</h1>
//           </div>
//           {/* <div className="students-src">
// 						<input type="text" placeholder="Search emails by subject, sen....." />
// 					</div> */}

//           <div className="students-src">
//             <input
//               type="text"
//               placeholder="Search emails by subject, sen....."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           {/* <!-- <select name="subject" className="ms-auto">
// 						<option value="1">Subject</option>
// 						<option value="2">Life Dream</option>
// 						<option value="3">Subject 2</option>
// 						<option value="4">Subject 3</option>
// 					</select> --> */}
//           {/* <!-- <a href="#" className="details-cta">
// 						<img src="../images/view-icon.svg" alt=''/>
// 						View Full Details
// 					</a> --> */}
//         </div>
//         <div className="table-responsive">
//           <table>
//             <tr>
//               <th style={{ width: "250px" }}>Student Name</th>
//               <th>Status </th>
//               <th style={{ width: "300px" }}>Completion Score </th>
//               <th>Avg. Score</th>
//               <th>Action </th>
//             </tr>

//             {/* {!filteredStudent || filteredStudent.length === 0 ? ( */}
//             {!currentStudents || currentStudents.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="5"
//                   style={{ paddingTop: "25px", textAlign: "center" }}
//                 >
//                   No Student Available
//                 </td>
//               </tr>
//             ) : (
//               // filteredStudent.map((student, index) => (
//               currentStudents.map((student, index) => (
//                 <tr key={index}>
//                   <td>{student?.student_name || "Lorem Ipsum"}</td>
//                   <td>
//                     {/* <div
//                       className={
//                         student?.status == "Completed"
//                           ? "status"
//                           : "inactive status"
//                       }
//                     > */}

//                     <div className="status">{student?.status}</div>
//                     {/* {student?.status || "Completed"}
//                     </div> */}
//                   </td>
//                   <td>
//                     {/* <div className="prog">
// 									{student?.completionScore||"91.0%"}
// 									<div className="progress">
// 										<div className="progress-bar" style={{ width: '91.2%' }} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div> */}

//                     <div className="prog">
//                       {student?.overall_percentage ?? "88.5"}%
//                       <div className="progress">
//                         <div
//                           className="progress-bar"
//                           style={{ width: `${student?.overall_percentage ?? 0}%` }}
//                           role="progressbar"
//                           aria-label="Basic example"
//                           // aria-valuenow={
//                           //   parseFloat(student?.completionScore) || 91.0
//                           // }
//                           aria-valuenow={student?.overall_percentage ?? 0}
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                         ></div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <div style={{ color: "#16A34A" }}>
//                       {`${student?.overall_percentage ?? 0}%`}
//                     </div>
//                   </td>
//                   {/* <td>
//                     <Link to="/principal/student-profile">
//                       <i className="fa-light fa-eye"></i> View Details
//                     </Link>
//                   </td> */}

//                   <td>
//                     {/* <Link
//                       to="/principal/student-profile"
//                       state={{
//                         studentId: student?.student_id,
//                         subjectId:
//                           selectedCourses?.length > 0 ? selectedCourses[0] : subjectId,
//                       }}
//                     >
//                       <i className="fa-light fa-eye"></i> View Details
//                     </Link> */}

//                     {teachercoming ? (
//                       <Link
//                         to="/principal-student-profiles"
//                         state={{
//                           studentId: student?.student_id,
//                           subjectId:
//                             selectedCourses?.length > 0 ? selectedCourses[0] : subjectId,
//                           principalstudentBaseline: "principalstudentBaseline"
//                         }}
//                       >
//                         <i className="fa-light fa-eye"></i> View Details
//                       </Link>
//                     ) : (
//                       <Link

//                         to="/principal/student-profile"
//                         state={{
//                           studentId: student?.student_id,
//                           subjectId:
//                             selectedCourses?.length > 0 ? selectedCourses[0] : subjectId,
//                           //  principalstudentBaseline1:"principalstudentBaseline"
//                         }}
//                       >
//                         <i className="fa-light fa-eye"></i> View Details
//                       </Link>
//                     )}

//                   </td>
//                 </tr>
//               ))
//             )}

//             {/* <tr>
// 							<td>Lorem Ipsum</td>
// 							<td>
// 								<div className="inactive status">Inactive</div>
// 							</td>
// 							<td>
// 								<div className="prog">
// 									91.2%
// 									<div className="progress">
// 										<div className="progress-bar" style={{ width: '91.2%' }} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div style={{ color: "#16A34A" }}>91.2%</div>
// 							</td>
// 							<td>
// 								<Link to="/principal/student-profile"><i className="fa-light fa-eye"></i> View Details</Link>
// 							</td>
// 						</tr>
// 						<tr>
// 							<td>Lorem Ipsum</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								<div className="prog">
// 									91.2%
// 									<div className="progress">
// 										<div className="progress-bar" style={{ width: '91.2%' }} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div style={{ color: "#16A34A" }}>91.2%</div>
// 							</td>
// 							<td>
// 								<Link to="/principal/student-profile"><i className="fa-light fa-eye"></i> View Details</Link>
// 							</td>
// 						</tr>
// 						<tr>
// 							<td>Lorem Ipsum</td>
// 							<td>
// 								<div className="status">Completed</div>
// 							</td>
// 							<td>
// 								<div className="prog">
// 									91.2%
// 									<div className="progress">
// 										<div className="progress-bar" style={{ width: '91.2%' }} role="progressbar"
// 											aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
// 											aria-valuemax="100"></div>
// 									</div>
// 								</div>
// 							</td>
// 							<td>
// 								<div style={{ color: "#16A34A" }}>91.2%</div>
// 							</td>
// 							<td>
// 								<Link to="/principal/student-profile"><i className="fa-light fa-eye"></i> View Details</Link>
// 							</td>
// 						</tr> */}

//           </table>
//           <div className="pagination">
//               {Array.from({ length: Math.ceil(filteredStudent?.length / itemsPerPage) }, (_, i) => (
//                 <button
//                   key={i}
//                   className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Classdetails;
