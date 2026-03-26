//
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  getMwlContent,
  getmwlLesson,
} from "../../redux/slices/teacher/mwlSlice";
import {
  completeLesson,
  startLession,
} from "../../redux/slices/student/lessionSlice";
import { useLocation } from "react-router";
import toast from "react-hot-toast";

const MwlMicroCredentialsDomainTrainingLesson = () => {
  const trainingName = localStorage.getItem("mwlTraining");
  const [searchParams] = useSearchParams();
  const lesson_id = searchParams.get("lesson_id");
  const location = useLocation();
  var id = searchParams.get("id");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // location.state?.name == "Self-Awareness" ||  location.state?.previousName == "Micro-Credentials & Domain Training",

  console.log(
    location.state?.name,
    location.state?.previousName,
    "Location********"
  );

  const { mwlContents, mwlessondetail } = useSelector((state) => state?.mwl);
  const [activeVideoId, setActiveVideoId] = React.useState(null);
  const [videoState, setVideoState] = React.useState({});

  useEffect(() => {
    if (mwlContents?.lesson?.contents) {
      const initialVideoState = mwlContents?.lesson?.contents
        ?.filter((item) => item.type === "video")
        .reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {});

      setVideoState((prev) => ({
        ...initialVideoState, // ensure all lesson video IDs exist
        ...prev, // keep old values (true stays true)
      }));
    }
  }, [lesson_id, location, mwlContents]);

  var simulateMatchingQuizAnswered =
    location.state?.simulateMatchingQuizAnswered;

  var previousName = location.state?.previousName;

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, [location]);
  // fetch data

  useEffect(() => {
    if (lesson_id) dispatch(getMwlContent({ lesson_id: parseInt(lesson_id) }));
  }, [dispatch, lesson_id, location.key]);

  useEffect(() => {
    if (id) dispatch(getmwlLesson({ subject_id: id }));
  }, [dispatch, id]);

  const openVideo = (id) => {
    setVideoState((prev) => ({
      ...prev,
      [id]: true, // toggle only this video
    }));
    setActiveVideoId(id);
  };

  const handleNextSubmit = async () => {
    if (trainingName === "Lesson Prep") {
      dispatch(completeLesson({ lesson_id: lesson_id })).then((response) => {
        const data = response?.payload;
        if (data) {
          dispatch(getMwlContent({ category_id: data?.next_lesson_id }));
          dispatch(startLession({ lesson_id: data?.next_lesson_id }));

          navigate(
            data?.next_lesson_id
              ? `/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${data?.next_lesson_id}&id=${id}`
              : `/teacher/mwl-micro-credentials-domain-training-subject?id=${id}`
          );
        }
      });
    } else {
      const hasUnwatched = Object.values(videoState).some(
        (val) => val === false
      );

      if (hasUnwatched) {
        toast.error("Please watch all videos before next lesson.");
        return; // stop here if not all watched
      }

      // ✅ only runs if ALL videos are watched
      dispatch(completeLesson({ lesson_id: lesson_id })).then((response) => {
        const data = response?.payload;
        if (data) {
          dispatch(getMwlContent({ category_id: data?.next_lesson_id }));
          dispatch(startLession({ lesson_id: data?.next_lesson_id }));

          navigate(
            data?.next_lesson_id
              ? `/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${data?.next_lesson_id}&id=${id}`
              : `/teacher/mwl-micro-credentials-domain-training-subject?id=${id}`
          );
        }
      });
    }
  };

  return (
    <>
      <div className="baseline-ass-wrp">
        <div className="back-btn mb-3">
          <Link
            to={`/teacher/mwl-micro-credentials-domain-training-subject?id=${id}`}
          >
            <img src="/images/baseline-assessment/back-icon.svg" alt="" /> Back
            to the Subject
          </Link>
        </div>
        <div className="less-wrapper">
          <div className="less-details">
            {mwlContents?.subject && (
              <>
                <h1>
                  {mwlContents?.subject?.Subject}, {mwlContents?.subject?.level}{" "}
                  , {mwlContents?.lesson?.title}
                </h1>
                <h1 style={{ color: "#4126A8" }}>
                  {" "}
                  {mwlContents?.subject?.Subject} component of PMSC!{" "}
                </h1>
              </>
            )}

            {mwlContents?.lesson?.contents?.length > 0 ? (
              mwlContents.lesson.contents.map((item, index) => {
                return (
                  <div key={`${item.id}-${index}`}>
                    {/* {item.type === "video" && (
                      <div onClick={() => openVideo(item.id)}>
                        <div className="less-details-in">
                          <h2 onClick={() => openVideo(item.id)}>
                            {item.title.replace(/<[^>]+>/g, "")}
                          </h2>
                          <iframe src={item.video_link} width="100%" height="400" allow="autoplay"
                            style={{ border: "none" }} allowFullScreen onClick={() => openVideo(item.id)}
                          ></iframe>
                        </div>
                        <hr />
                      </div>
                    )} */}

                    {item.type === "video" && (
                      <div className="less-details-in">
                        <h2>{item.title.replace(/<[^>]+>/g, "")}</h2>
                        <div style={{ position: "relative" }}>
                          {/* <iframe id={`video-${item.id}`} src={item.video_link} width="100%" height="400" style={{ border: "none" }}  allow="autoplay; fullscreen" allowFullScreen ></iframe>
                          {!videoState[item.id] && (
                            <div onClick={() => openVideo(item.id)}
                              style={{ position: "absolute", top: 0, left: 0, width: "100%",
                                height: "100%", cursor: "pointer", background: "rgba(0,0,0,0.3)", // overlay until play
                              }} />
                          )} */}
                          <video
                            id={`video-${item.id}`}
                            style={{ border: 0 }}
                            width="100%"
                            height="400"
                            controls
                            controlsList="nodownload noremoteplayback"
                            disablePictureInPicture
                            title={`video-${item.id}`}
                            onPlay={() =>
                              setVideoState((prevState) => ({
                                ...prevState,
                                [item.id]: true,
                              }))
                            } // Mark as playing
                          >
                            <source src={item.video_link} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          {/* Overlay to handle play action */}
                          {!videoState[item.id] && (
                            <div
                              onClick={() => {
                                const videoElement = document.getElementById(
                                  `video-${item.id}`
                                );
                                videoElement.play();
                                setVideoState((prevState) => ({
                                  ...prevState,
                                  [item.id]: true,
                                })); // Update state to show that the video is playing
                              }}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "400px",
                                cursor: "pointer",
                                background: "rgba(0, 0, 0, 0.3)",
                                borderRadius: "10px", // Overlay until play
                              }}
                            />
                          )}
                        </div>
                        <hr />
                      </div>
                    )}

                    {item.type === "image" && (
                      <>
                        <div className="less-details-in">
                          <h2>{item.title.replace(/<[^>]+>/g, "")}</h2>
                          <img
                            src={item.image}
                            alt="image"
                            style={{ maxWidth: "100%" }}
                          />
                        </div>
                        <hr />
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No data found.</p>
            )}
          </div>
          {previousName == "Micro-Credentials & Domain Training" && (
            <div className="less-details-list">
              <div className="less-details-in mt-0">
                <h2>Videos Outline</h2>
                <div className="less-details-list-in">
                  {mwlessondetail?.lessons?.length > 0 ? (
                    mwlessondetail.lessons.map((lesson) => {
                      let imageSrc = "";
                      if (lesson.status === "locked") {
                        imageSrc =
                          "/images/subject-detail/sub-lessons/locked-not-started.svg";
                      } else if (lesson.status === "in-progress") {
                        imageSrc =
                          "/images/subject-detail/sub-lessons/in-progress.svg";
                      } else if (lesson.status === "completed") {
                        imageSrc =
                          "/images/subject-detail/sub-lessons/completed.svg";
                      } else {
                        imageSrc =
                          "/images/subject-detail/sub-lessons/locked-not-started.svg"; // fallback image
                      }

                      return (
                        <div className="item" key={lesson.id + 1}>
                          <img src={imageSrc} alt={lesson.status} />
                          {lesson.title}
                        </div>
                      );
                    })
                  ) : (
                    <p>No lessons found.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bottom-cta justify-content-end">
          {simulateMatchingQuizAnswered ? (
            // If quiz is answered, show nothing (or your commented-out span)
            <></>
          ) : // Nested Logic: Check location state only if quiz is NOT answered
          (location.state?.name === "Self-Awareness" &&
              location.state?.previousName ===
                "Micro-Credentials & Domain Training") ||
            (location.state?.name === "Interpersonal Relationships" &&
              location.state?.previousName ===
                "Micro-Credentials & Domain Training") ||
            (location.state?.name == "Self-Awareness" &&
              location.state?.previousName == "Lesson Prep") ||
            (location.state?.name == "Interpersonal Relationships" &&
              location.state?.previousName == "Lesson Prep") ? (
            <></>
          ) : (
            <Link
              to={`/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${lesson_id}&id=${id}`}
              onClick={handleNextSubmit}
              className="next-cta"
            >
              {location.state?.isLastLesson ? "Finish Lesson" : "Next Lesson"}
              <i className="fa-regular fa-arrow-right"></i>
            </Link>
          )}
        </div>
      </div>

      {/* Confirmation Modal JSX */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="my-popup"
        dialogClassName="modal-dialog-edit"
        id="quit-popup"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-content clearfix">
          <div className="modal-heading">
            <h2>Confirmation</h2>
            <button
              type="button"
              className="close close-btn-front"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <span aria-hidden="true">
                <img src="../images/cross-pop.svg" alt="" />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="delete-pop-wrap">
              <form>
                <div className="delete-pop-inner">
                  <p>
                    <b>Have you answered all your questions?</b>
                  </p>
                  <p>
                    Completing them can help you feel more confident and reduce
                    stress. Keep going you’re doing great!
                  </p>
                </div>
                <div className="delete-pop-btn">
                  <a
                    href="#"
                    className="active"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  >
                    Review
                  </a>
                  <a href="#">Continue</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MwlMicroCredentialsDomainTrainingLesson;

//

//date-26-03-2026 by Rajan Malakar
// import React, { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useSearchParams } from "react-router";
// import {
//   getMwlContent,
//   getmwlLesson,
// } from "../../redux/slices/teacher/mwlSlice";
// import {
//   completeLesson,
//   startLession,
// } from "../../redux/slices/student/lessionSlice";
// import { useLocation } from "react-router";
// import toast from "react-hot-toast";

// const MwlMicroCredentialsDomainTrainingLesson = () => {
//   const trainingName = localStorage.getItem("mwlTraining");
//   const [searchParams] = useSearchParams();
//   const lesson_id = searchParams.get("lesson_id");
//   const location = useLocation();
//   var id = searchParams.get("id");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { mwlContents, mwlessondetail } = useSelector((state) => state?.mwl);
//   const [activeVideoId, setActiveVideoId] = React.useState(null);
//   const [videoState, setVideoState] = React.useState({});

//   useEffect(() => {
//     if (mwlContents?.lesson?.contents) {
//       const initialVideoState = mwlContents?.lesson?.contents
//         ?.filter((item) => item.type === "video")
//         .reduce((acc, item) => {
//           acc[item.id] = false;
//           return acc;
//         }, {});

//       setVideoState((prev) => ({
//         ...initialVideoState, // ensure all lesson video IDs exist
//         ...prev, // keep old values (true stays true)
//       }));
//     }
//   }, [lesson_id, location, mwlContents]);

//   var simulateMatchingQuizAnswered =
//     location.state?.simulateMatchingQuizAnswered;

//   var previousName = location.state?.previousName;

//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   useEffect(() => {
//     window.history.pushState(null, document.title, window.location.href);
//     window.addEventListener("popstate", function (event) {
//       window.history.pushState(null, document.title, window.location.href);
//     });
//   }, [location]);
//   // fetch data

//   useEffect(() => {
//     if (lesson_id) dispatch(getMwlContent({ lesson_id: parseInt(lesson_id) }));
//   }, [dispatch, lesson_id, location.key]);

//   useEffect(() => {
//     if (id) dispatch(getmwlLesson({ subject_id: id }));
//   }, [dispatch, id]);

//   const openVideo = (id) => {
//     setVideoState((prev) => ({
//       ...prev,
//       [id]: true, // toggle only this video
//     }));
//     setActiveVideoId(id);
//   };

//   const handleNextSubmit = async () => {
//     if (trainingName === "Lesson Prep") {
//       dispatch(completeLesson({ lesson_id: lesson_id })).then((response) => {
//         const data = response?.payload;
//         if (data) {
//           dispatch(getMwlContent({ category_id: data?.next_lesson_id }));
//           dispatch(startLession({ lesson_id: data?.next_lesson_id }));

//           navigate(
//             data?.next_lesson_id
//               ? `/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${data?.next_lesson_id}&id=${id}`
//               : `/teacher/mwl-micro-credentials-domain-training-subject?id=${id}`
//           );
//         }
//       });
//     } else {
//       const hasUnwatched = Object.values(videoState).some(
//         (val) => val === false
//       );

//       if (hasUnwatched) {
//         toast.error("Please watch all videos before next lesson.");
//         return; // stop here if not all watched
//       }

//       // ✅ only runs if ALL videos are watched
//       dispatch(completeLesson({ lesson_id: lesson_id })).then((response) => {
//         const data = response?.payload;
//         if (data) {
//           dispatch(getMwlContent({ category_id: data?.next_lesson_id }));
//           dispatch(startLession({ lesson_id: data?.next_lesson_id }));

//           navigate(
//             data?.next_lesson_id
//               ? `/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${data?.next_lesson_id}&id=${id}`
//               : `/teacher/mwl-micro-credentials-domain-training-subject?id=${id}`
//           );
//         }
//       });
//     }
//   };

//   return (
//     <>
//       <div className="baseline-ass-wrp">
//         <div className="back-btn mb-3">
//           <Link
//             to={`/teacher/mwl-micro-credentials-domain-training-subject?id=${id}`}
//           >
//             <img src="/images/baseline-assessment/back-icon.svg" alt="" /> Back
//             to the Subject
//           </Link>
//         </div>
//         <div className="less-wrapper">
//           <div className="less-details">
//             {mwlContents?.subject && (
//               <>
//                 <h1>
//                   {mwlContents?.subject?.Subject}, {mwlContents?.subject?.level}{" "}
//                   , {mwlContents?.lesson?.title}
//                 </h1>
//                 <h1 style={{ color: "#4126A8" }}>
//                   {" "}
//                   {mwlContents?.subject?.Subject} component of PMSC!{" "}
//                 </h1>
//               </>
//             )}

//             {mwlContents?.lesson?.contents?.length > 0 ? (
//               mwlContents.lesson.contents.map((item, index) => {
//                 return (
//                   <div key={`${item.id}-${index}`}>
//                     {/* {item.type === "video" && (
//                       <div onClick={() => openVideo(item.id)}>
//                         <div className="less-details-in">
//                           <h2 onClick={() => openVideo(item.id)}>
//                             {item.title.replace(/<[^>]+>/g, "")}
//                           </h2>
//                           <iframe src={item.video_link} width="100%" height="400" allow="autoplay"
//                             style={{ border: "none" }} allowFullScreen onClick={() => openVideo(item.id)}
//                           ></iframe>
//                         </div>
//                         <hr />
//                       </div>
//                     )} */}

//                     {item.type === "video" && (
//                       <div className="less-details-in">
//                         <h2>{item.title.replace(/<[^>]+>/g, "")}</h2>
//                         {/* 25-03-2026 Rajan */}
//                         {/* <div style={{ position: "relative" }}> */}
//                         {/* <iframe id={`video-${item.id}`} src={item.video_link} width="100%" height="400" style={{ border: "none" }}  allow="autoplay; fullscreen" allowFullScreen ></iframe>
//                           {!videoState[item.id] && (
//                             <div onClick={() => openVideo(item.id)}
//                               style={{ position: "absolute", top: 0, left: 0, width: "100%",
//                                 height: "100%", cursor: "pointer", background: "rgba(0,0,0,0.3)", // overlay until play
//                               }} />
//                           )} */}
//                         {/* 25-03-2026 Rajan */}
//                         {/* <video
//                             id={`video-${item.id}`}
//                             style={{ border: 0 }}
//                             width="100%"
//                             height="400"
//                             controls
//                             controlsList="nodownload noremoteplayback"
//                             disablePictureInPicture
//                             title={`video-${item.id}`}
//                             onPlay={() =>
//                               setVideoState((prevState) => ({
//                                 ...prevState,
//                                 [item.id]: true,
//                               }))
//                             } // Mark as playing
//                           >
//                             <source src={item.video_link} type="video/mp4" />
//                             Your browser does not support the video tag.
//                           </video> */}
//                         {/* Overlay to handle play action */}
//                         {/* 25-03-2026 Rajan */}
//                         {/* {!videoState[item.id] && (
//                             <div
//                               onClick={() => {
//                                 const videoElement = document.getElementById(
//                                   `video-${item.id}`
//                                 );
//                                 videoElement.play();
//                                 setVideoState((prevState) => ({
//                                   ...prevState,
//                                   [item.id]: true,
//                                 })); // Update state to show that the video is playing
//                               }}
//                               style={{
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 width: "100%",
//                                 height: "400px",
//                                 cursor: "pointer",
//                                 background: "rgba(0, 0, 0, 0.3)",
//                                 borderRadius: "10px", // Overlay until play
//                               }}
//                             />
//                           )} */}
//                         {/* </div> */}
//                         {/* 25-03-2026 Rajan */}

//                         <div
//                           style={{
//                             position: "relative",
//                             filter:
//                               item.flag === 0
//                                 ? "grayscale(100%) opacity(0.6)"
//                                 : "none",
//                           }}
//                         >
//                           <video
//                             id={`video-${item.id}`}
//                             style={{
//                               border: 0,
//                               pointerEvents: item.flag === 0 ? "none" : "auto",
//                             }} // Disables native controls if flag is 0
//                             width="100%"
//                             height="400"
//                             controls={item.flag === 1} // Only show controls if playable
//                             controlsList="nodownload noremoteplayback"
//                             disablePictureInPicture
//                             title={`video-${item.id}`}
//                             onPlay={() =>
//                               item.flag === 1 &&
//                               setVideoState((prevState) => ({
//                                 ...prevState,
//                                 [item.id]: true,
//                               }))
//                             }
//                           >
//                             <source src={item.video_link} type="video/mp4" />
//                             Your browser does not support the video tag.
//                           </video>

//                           {/* Overlay Logic */}
//                           {(!videoState[item.id] || item.flag === 0) && (
//                             <div
//                               onClick={() => {
//                                 if (item.flag === 0) return; // Do nothing if locked

//                                 const videoElement = document.getElementById(
//                                   `video-${item.id}`
//                                 );
//                                 videoElement.play();
//                                 setVideoState((prevState) => ({
//                                   ...prevState,
//                                   [item.id]: true,
//                                 }));
//                               }}
//                               style={{
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 width: "100%",
//                                 height: "400px",
//                                 cursor:
//                                   item.flag === 1 ? "pointer" : "not-allowed",
//                                 background:
//                                   item.flag === 1
//                                     ? "rgba(0, 0, 0, 0.3)"
//                                     : "rgba(128, 128, 128, 0.5)",
//                                 borderRadius: "10px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               {/* Optional: Show a Lock Icon if flag is 0 */}
//                               {item.flag === 0 && (
//                                 <span
//                                   style={{
//                                     color: "white",
//                                     fontSize: "24px",
//                                     fontWeight: "bold",
//                                   }}
//                                 >
//                                   🔒 Locked
//                                 </span>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <hr />
//                       </div>
//                     )}

//                     {item.type === "image" && (
//                       <>
//                         <div className="less-details-in">
//                           <h2>{item.title.replace(/<[^>]+>/g, "")}</h2>
//                           <img
//                             src={item.image}
//                             alt="image"
//                             style={{ maxWidth: "100%" }}
//                           />
//                         </div>
//                         <hr />
//                       </>
//                     )}
//                   </div>
//                 );
//               })
//             ) : (
//               <p>No data found.</p>
//             )}
//           </div>
//           {previousName == "Micro-Credentials & Domain Training" && (
//             <div className="less-details-list">
//               <div className="less-details-in mt-0">
//                 <h2>Videos Outline</h2>
//                 <div className="less-details-list-in">
//                   {mwlessondetail?.lessons?.length > 0 ? (
//                     mwlessondetail.lessons.map((lesson) => {
//                       let imageSrc = "";
//                       if (lesson.status === "locked") {
//                         imageSrc =
//                           "/images/subject-detail/sub-lessons/locked-not-started.svg";
//                       } else if (lesson.status === "in-progress") {
//                         imageSrc =
//                           "/images/subject-detail/sub-lessons/in-progress.svg";
//                       } else if (lesson.status === "completed") {
//                         imageSrc =
//                           "/images/subject-detail/sub-lessons/completed.svg";
//                       } else {
//                         imageSrc =
//                           "/images/subject-detail/sub-lessons/locked-not-started.svg"; // fallback image
//                       }

//                       return (
//                         <div className="item" key={lesson.id + 1}>
//                           <img src={imageSrc} alt={lesson.status} />
//                           {lesson.title}
//                         </div>
//                       );
//                     })
//                   ) : (
//                     <p>No lessons found.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="bottom-cta justify-content-end">
//           {simulateMatchingQuizAnswered ? (
//             <>
//               {/* <span className="next-cta disabled" disabled
//               style={{
//                 backgroundColor: "#4126A8", color: "white", width: "160px", height: "40px",
//                 borderRadius: "10px", justifyContent: "space-around", alignItems: "center",
//                 display: "flex", opacity: 0.8, }} >
//               {location.state?.isLastLesson?.isLastLesson ? "Finish Lesson" : "Finish Lesson"}{" "}
//               <i className="fa-regular fa-arrow-right"></i>
//             </span> */}
//             </>
//           ) : (
//             <Link
//               to={`/teacher/mwl-micro-credentials-domain-training-lesson?lesson_id=${lesson_id}&id=${id}`}
//               onClick={(e) => {
//                 // e.preventDefault(); // stop navigation
//                 handleNextSubmit();
//               }}
//               className="next-cta"
//             >
//               {location.state?.isLastLesson?.isLastLesson
//                 ? "Finish Lesson"
//                 : "Finish Lesson"}{" "}
//               <i className="fa-regular fa-arrow-right"></i>
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Confirmation Modal JSX */}
//       <Modal
//         show={showModal}
//         onHide={handleCloseModal}
//         centered
//         className="my-popup"
//         dialogClassName="modal-dialog-edit"
//         id="quit-popup"
//         aria-labelledby="myModalLabel"
//       >
//         <div className="modal-content clearfix">
//           <div className="modal-heading">
//             <h2>Confirmation</h2>
//             <button
//               type="button"
//               className="close close-btn-front"
//               onClick={handleCloseModal}
//               aria-label="Close"
//             >
//               <span aria-hidden="true">
//                 <img src="../images/cross-pop.svg" alt="" />
//               </span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="delete-pop-wrap">
//               <form>
//                 <div className="delete-pop-inner">
//                   <p>
//                     <b>Have you answered all your questions?</b>
//                   </p>
//                   <p>
//                     Completing them can help you feel more confident and reduce
//                     stress. Keep going you’re doing great!
//                   </p>
//                 </div>
//                 <div className="delete-pop-btn">
//                   <a
//                     href="#"
//                     className="active"
//                     onClick={handleCloseModal}
//                     aria-label="Close"
//                   >
//                     Review
//                   </a>
//                   <a href="#">Continue</a>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default MwlMicroCredentialsDomainTrainingLesson;
