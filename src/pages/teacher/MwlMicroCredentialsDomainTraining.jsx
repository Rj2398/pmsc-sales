import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { getMwlCategoryDetail } from "../../redux/slices/teacher/mwlSlice";
import { setMwlTraining } from "../../redux/slices/teacher/dashboardSlice";

const MwlMicroCredentialsDomainTraining = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const categoryId = location?.state?.mwlId;

  var name = location?.state?.name;

  const { mwlSubjectDetail } = useSelector((state) => state.mwl);

  useEffect(() => {
    if (categoryId) {
      dispatch(getMwlCategoryDetail({ category_id: categoryId }));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (name) {
      dispatch(setMwlTraining(name));
    }
  }, [name]);

  const correctOrder = [
    "Life Dream",
    "Self-Awareness",
    "Cognitive Construction",
    "Interpersonal Relationships",
    "Coping",
  ];

  const sortedRubySubjects = mwlSubjectDetail?.data?.[0]?.subjects
    ? [...mwlSubjectDetail.data[0].subjects].sort((a, b) => {
        return correctOrder.indexOf(a.name) - correctOrder.indexOf(b.name);
      })
    : [];

  const sortedEmbraIdSubjects = mwlSubjectDetail?.data?.[1]?.subjects
    ? [...mwlSubjectDetail.data[1].subjects].sort((a, b) => {
        return correctOrder.indexOf(a.name) - correctOrder.indexOf(b.name);
      })
    : [];

  return (
    <>
      <div className="sub-detail-top">
        <h1 className="mb-2">
          {" "}
          {name}{" "}
          <span>
            {" "}
            <b>{mwlSubjectDetail?.percentage}%</b>{" "}
          </span>{" "}
        </h1>
        <div className="sub-pro mb-0">
          <p>Manage education levels, subjects, lessons, and content</p>
          <div className="sub-pro-grp ms-auto">
            <h1 className="mb-0">
              <span>
                {mwlSubjectDetail?.completed_subjects}/
                {mwlSubjectDetail?.total_subjects} Subjects{" "}
              </span>
            </h1>
            <div className="sub-pro-in">
              <ul className="ms-2">
                {" "}
                <li className="me-3">
                  {" "}
                  <span>Overall Progress</span>{" "}
                </li>{" "}
              </ul>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: `${mwlSubjectDetail?.percentage || 0}%` }}
                  role="progressbar"
                  aria-label="Lesson Progress"
                  aria-valuenow={mwlSubjectDetail?.percentage || 0}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="subjects-lesson-progress mt-4 course-management student-mng">
        <div className="row">
          <div className="col-lg-12">
            <div className="my-subjects mt-0">
              <div className="my-subjects-head">
                <h3>
                  {" "}
                  {mwlSubjectDetail?.data?.[0]?.level_name} - Manage Subjects
                  {mwlSubjectDetail?.data?.[0]?.badge_pdf &&
                    name != "Lesson Prep" && (
                      <Link
                        to={mwlSubjectDetail?.data?.[0]?.badge_pdf}
                        className="add-cta"
                        download
                        target="_blank"
                      >
                        <img src="/images/cta-badge.svg" alt="Download Badge" />{" "}
                        View Badge
                      </Link>
                    )}
                </h3>
              </div>
              <div className="manage-sub-grid for-teacher-subjects">
                {sortedRubySubjects.map((item, index) => {
                  let imageSrc = "";
                  if (item.status === "not_started") {
                    imageSrc =
                      "/images/subject-detail/sub-lessons/locked-not-started.svg";
                  } else if (item.status === "in-progress") {
                    imageSrc =
                      "/images/subject-detail/sub-lessons/in-progress.svg";
                  } else if (item.status === "completed") {
                    imageSrc =
                      "/images/subject-detail/sub-lessons/completed.svg";
                  } else {
                    // fallback image if status is something unexpected
                    imageSrc =
                      "/images/subject-detail/sub-lessons/locked-not-started.svg";
                  }

                  return (
                    <div
                      key={index}
                      className="manage-sub-item sub-lessons-list-in"
                    >
                      <div className="lesson-num-ico">
                        <span>{index + 1}</span>
                        <img src={imageSrc} alt={item.status} />
                      </div>
                      <div className="manage-sub-data">
                        <h4>
                          {" "}
                          {item.name.length > 10 ? (
                            <> {item?.name} </>
                          ) : (
                            item.name
                          )}
                          {item.badge && (
                            <img src="/images/badge-icon.svg" alt="" />
                          )}
                        </h4>
                        <ul>
                          <li>
                            <img
                              src="/images/subject-detail/lessons.svg"
                              alt="lesson"
                            />
                            {item.total_lesson} lessons
                          </li>
                        </ul>
                      </div>
                      <div className="manage-sub-cta">
                        <Link
                          to={`/teacher/mwl-micro-credentials-domain-training-subject?id=${item.id}`}
                          state={{
                            name: item?.name,
                            previousName: name,
                            parentName: item?.name,
                          }}
                        >
                          View Content
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {mwlSubjectDetail?.data?.[1]?.level_name && (
              <div className="my-subjects">
                <div className="my-subjects-head">
                  <h3>
                    {mwlSubjectDetail?.data?.[1]?.level_name} - Manage Subjects
                    {mwlSubjectDetail?.data?.[1]?.badge_pdf &&
                      name != "Lesson Prep" && (
                        <Link
                          to={mwlSubjectDetail?.data?.[1]?.badge_pdf}
                          className="add-cta"
                          download
                          target="_blank"
                        >
                          <img
                            src="/images/cta-badge.svg"
                            alt="Download Badge"
                          />{" "}
                          View Badge
                        </Link>
                      )}
                  </h3>
                </div>
                <div className="manage-sub-grid  for-teacher-subjects">
                  {sortedEmbraIdSubjects?.map((item, index) => {
                    let imageSrc = "";
                    if (item.status === "not_started") {
                      imageSrc =
                        "/images/subject-detail/sub-lessons/locked-not-started.svg";
                    } else if (item.status === "in-progress") {
                      imageSrc =
                        "/images/subject-detail/sub-lessons/in-progress.svg";
                    } else if (item.status === "completed") {
                      imageSrc =
                        "/images/subject-detail/sub-lessons/completed.svg";
                    } else {
                      // fallback image if status is something unexpected
                      imageSrc =
                        "/images/subject-detail/sub-lessons/locked-not-started.svg";
                    }

                    return (
                      <div
                        key={index}
                        className="manage-sub-item sub-lessons-list-in"
                      >
                        <div className="lesson-num-ico">
                          <span>{index + 1}</span>
                          <img src={imageSrc} alt={item.status} />
                        </div>
                        <div className="manage-sub-data">
                          <h4>
                            {item.name.length > 10 ? (
                              <> {item.name} </>
                            ) : (
                              item.name
                            )}
                            {item.badge && (
                              <img src="../images/badge-icon.svg" alt="" />
                            )}
                          </h4>
                          <ul>
                            <li>
                              <img
                                src="../images/subject-detail/lessons.svg"
                                alt="lesson"
                              />
                              {item.total_lesson} lessons
                            </li>
                          </ul>
                        </div>
                        <div className="manage-sub-cta">
                          <Link
                            to={`/teacher/mwl-micro-credentials-domain-training-subject?id=${item.id}`}
                            state={{
                              name: item?.name,
                              prevouseName: name,
                              parentName: name,
                            }}
                          >
                            View Content
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MwlMicroCredentialsDomainTraining;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router";
// import { getMwlCategoryDetail } from "../../redux/slices/teacher/mwlSlice";
// import { setMwlTraining } from "../../redux/slices/teacher/dashboardSlice";

// const MwlMicroCredentialsDomainTraining = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const categoryId = location?.state?.mwlId;

//   const name = location?.state?.name;

//   const { mwlSubjectDetail } = useSelector((state) => state.mwl);

//   useEffect(() => {
//     if (categoryId) {
//       dispatch(getMwlCategoryDetail({ category_id: categoryId }));
//     }
//   }, [dispatch, categoryId]);

//     useEffect(() => {
//     if(name){
//       dispatch(setMwlTraining(name))
//     }
//   }, [name]);

//   return (
//     <>
//       <div className="sub-detail-top">
//         <h1 className="mb-2">
//           {name}
//           <span>
//             <b>100%</b>
//           </span>
//         </h1>
//         <div className="sub-pro mb-0">
//           <p>Manage education levels, subjects, lessons, and content</p>
//           <div className="sub-pro-grp ms-auto">
//             <h1 className="mb-0">
//               <span>10/10 Subjects</span>
//             </h1>
//             <div className="sub-pro-in">
//               <ul className="ms-2">
//                 <li className="me-3">
//                   <span>Overall Progress</span>
//                 </li>
//               </ul>
//               <div className="progress">
//                 <div
//                   className="progress-bar w-75"
//                   role="progressbar"
//                   aria-label="Basic example"
//                   aria-valuenow="75"
//                   aria-valuemin="0"
//                   aria-valuemax="100"
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="subjects-lesson-progress mt-4 course-management student-mng">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="my-subjects mt-0">
//               <div className="my-subjects-head">
//                 <h3>
//                   {mwlSubjectDetail?.[0]?.level_name} - Manage Subjects
//                   {/* <a href="javascript:void(0);" className="add-cta">
//                     <img src="../images/cta-badge.svg" alt="" /> View Badge
//                   </a> */}
//                 </h3>
//               </div>
//               <div className="manage-sub-grid">
//                 {mwlSubjectDetail?.[0].subjects.map((item, index) => (
//                   <div
//                     key={index}
//                     className="manage-sub-item sub-lessons-list-in"
//                   >
//                     <div className="lesson-num-ico">
//                       <span>{index + 1}</span>
//                       <img
//                         src="../images/subject-detail/sub-lessons/locked-not-started.svg"
//                         alt=""
//                       />
//                     </div>
//                     <div className="manage-sub-data">
//                       <h4>
//                         {item.name.length > 10 ? (
//                           <>
//                             {item.name.substring(0, 10)}
//                             <br />
//                             {item.name.substring(10)}
//                           </>
//                         ) : (
//                           item.name
//                         )}

//                         {name == "Micro-Credentials & Domain Training" && (
//                           <img src="../images/badge-icon.svg" alt="" />
//                         )}
//                       </h4>
//                       <ul>
//                         <li>
//                           <img
//                             src="../images/subject-detail/lessons.svg"
//                             alt=""
//                           />
//                           {item.total_lesson} lessons
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="manage-sub-cta">
//                       <Link
//                         to={`/teacher/mwl-micro-credentials-domain-training-subject?id=${item.id}`}
//                         state={{ name: item?.name }}
//                       >
//                         Manage Content
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="my-subjects">
//               <div className="my-subjects-head">
//                 <h3>
//                   {mwlSubjectDetail?.[1]?.level_name} - Manage Subjects
//                   {/* <a href="javascript:void(0);" className="add-cta">
//                     <img src="../images/cta-badge.svg" alt="" /> View Badge
//                   </a> */}
//                 </h3>
//               </div>
//               <div className="manage-sub-grid">
//                 {mwlSubjectDetail?.[1].subjects.map((item, index) => (
//                   <div
//                     key={index}
//                     className="manage-sub-item sub-lessons-list-in"
//                   >
//                     <div className="lesson-num-ico">
//                       <span>{index + 1}</span>
//                       <img
//                         src="../images/subject-detail/sub-lessons/locked-not-started.svg"
//                         alt=""
//                       />
//                     </div>
//                     <div className="manage-sub-data">
//                       <h4>
//                         {item.name.length > 10 ? (
//                           <>
//                             {item.name.substring(0, 10)}
//                             <br />
//                             {item.name.substring(10)}
//                           </>
//                         ) : (
//                           item.name
//                         )}
//                         <img src="../images/badge-icon.svg" alt="" />
//                       </h4>
//                       <ul>
//                         <li>
//                           <img
//                             src="../images/subject-detail/lessons.svg"
//                             alt=""
//                           />
//                           {item.total_lesson} lessons
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="manage-sub-cta">
//                       <Link to="/teacher/mwl-micro-credentials-domain-training-subject">
//                         Manage Content
//                       </Link>
//                     </div>
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

// export default MwlMicroCredentialsDomainTraining;
