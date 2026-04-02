import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { getMwlContent } from "../../redux/slices/teacher/mwlSlice";

const MwlParentTraining = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const categoryId = location?.state?.mwlId;
  const { mwlContents, loading } = useSelector((state) => state?.mwl);
  //fetch data parent training data
  useEffect(() => {
    if (categoryId) dispatch(getMwlContent({ category_id: categoryId }));
  }, [dispatch]);

  return (
    <main>
      <div className="baseline-ass-wrp">
        <div className="back-btn mb-3">
          <Link to="" onClick={() => navigate(-1)}>
            <img src="/images/baseline-assessment/back-icon.svg" alt="" /> Back
            to the Subject
          </Link>
        </div>
        {/* <div className="less-details"> */}
        <h1>
          {" "}
          {location?.pathname == "/teacher/onboarding"
            ? "Onboarding"
            : "Parent Training"}
        </h1>

        {(!mwlContents?.contents || mwlContents.contents.length <= 0) &&
          !loading && <div className="no-data-message">No Data Found</div>}
        {mwlContents?.contents?.map(
          (item, index) =>
            item?.type != "quiz" && (
              <div key={index} className="less-details-in">
                {item.type === "video" && (
                  <>
                    <h2 dangerouslySetInnerHTML={{ __html: item.title }}>
                      {/* {item.title.replace(/<[^>]+>/g, "")} */}
                    </h2>
                    {/* <iframe src={item.video_link} width="100%" height="400" allow="autoplay"
                      style={{ border: "none" }} allowFullScreen ></iframe> */}
                    <video
                      width="100%"
                      height="400px"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      style={{ border: 0 }}
                      title={item?.title || "Lesson Video"}
                    >
                      <source src={item?.video_link} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </>
                )}

                {item.type === "text" && (
                  <>
                    <h2 dangerouslySetInnerHTML={{ __html: item.title }}>
                      {/* {item.title.replace(/<[^>]+>/g, "")} */}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: item.desc }}></div>
                  </>
                )}

                {item.type === "image" && (
                  <>
                    <h2 dangerouslySetInnerHTML={{ __html: item.title }}>
                      {/* {item.title.replace(/<[^>]+>/g, "")} */}
                    </h2>
                    <img
                      src={item.image}
                      alt="image"
                      style={{ maxWidth: "100%" }}
                    />
                  </>
                )}
              </div>
            )
        )}
        {/* </div> */}
        {/* <div className="bottom-cta justify-content-end">
          <Link to={`/teacher/mwl-library`} className="next-cta">
            Next Lesson <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div> */}
      </div>
    </main>
  );
};

export default MwlParentTraining;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router";
// import { getMwlContent } from "../../redux/slices/teacher/mwlSlice";

// const content = [
//   {
//     id: 7,
//     subject_id: null,
//     lesson_id: null,
//     category_id: "5",
//     title: "this is static data  ",
//     video_link:
//       "https://drive.google.com/file/d/1C0tQWvicqYFfH_rAq0BMYO26xN9MpSuY/preview",
//     desc: `<p>tLife Dream helps you visualize success in the future. It also keeps you inspired to overcome obstacles when trying to accomplish what you want. You have a long life ahead of you filled with many opportunities to make a positive impact on the community and world.

// Agenda

// • Must I Grow to reach my fullest Potential?

// • Do I need Courage to become my best?

// • What is Motivation?

// Imagining your future success and staying inspired to get what you want in life are strongly related to hope. Take a look at this short video to learn what some students hope for. </p>`,
//     order: 3,
//     created_at: "2025-08-14 12:40:08",
//     updated_at: "2025-08-14 12:55:14",
//     type: "video",
//   },

//   {
//     id: 7,
//     subject_id: null,
//     lesson_id: null,
//     category_id: "5",
//     title: "<p>test video title 2</p>",
//     video_link:
//       "https://drive.google.com/file/d/1C0tQWvicqYFfH_rAq0BMYO26xN9MpSuY/preview",
//     desc: `<p>tLife Dream helps you visualize success in the future. It also keeps you inspired to overcome obstacles when trying to accomplish what you want. You have a long life ahead of you filled with many opportunities to make a positive impact on the community and world.

// Agenda

// • Must I Grow to reach my fullest Potential?

// • Do I need Courage to become my best?

// • What is Motivation?

// Imagining your future success and staying inspired to get what you want in life are strongly related to hope. Take a look at this short video to learn what some students hope for. </p>`,
//     order: 3,
//     created_at: "2025-08-14 12:40:08",
//     updated_at: "2025-08-14 12:55:14",
//     type: "video",
//   },
// ];

// const MwlParentTraining = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const categoryId = location?.state?.mwlId;
//   const { mwlContents } = useSelector((state) => state?.mwl);

//   //fetch data parent training data
//   useEffect(() => {
//     if (categoryId) dispatch(getMwlContent({ category_id: categoryId }));
//   }, [dispatch]);

//   return (
//     <main>
//       <div className="baseline-ass-wrp">
//         <div className="back-btn mb-3">
//           <Link to="" onClick={() => navigate(-1)}>
//             <img src="../images/baseline-assessment/back-icon.svg" alt="" />{" "}
//             Back to the Subject
//           </Link>
//         </div>
//         <div className="less-details">
//           <h1>Parent Training</h1>
//           {content.map((item) => (
//             <div key={item.id} className="less-details-in">
//               {/* Title */}
//               <h2>{item.title.replace(/<[^>]+>/g, "")}</h2>

//               {/* Description */}
//               <div dangerouslySetInnerHTML={{ __html: item.desc }} />

//               {/* Video in iframe */}
//               <iframe
//                 src={item.video_link}
//                 width="100%"
//                 height="400"
//                 frameBorder="0"
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//                 title={`video-${item.id}`}
//                 className="mt-3"
//               ></iframe>
//             </div>
//           ))}

//           {/* <div className="less-details-in">
//             <h2>Video Title</h2>
//             <p>
//               Life Dream helps you visualize success in the future. It also
//               keeps you inspired to overcome obstacles when trying to accomplish
//               what you want. You have a long life ahead of you filled with many
//               opportunities to make a positive impact on the community and
//               world.
//             </p>
//             <p>Agenda</p>
//             <p>&#8226; Must I Grow to reach my fullest Potential?</p>
//             <p>&#8226; Do I need Courage to become my best?</p>
//             <p>&#8226; What is Motivation?</p>
//             <p>
//               Imagining your future success and staying inspired to get what you
//               want in life are strongly related to hope. Take a look at this
//               short video to learn what some students hope for.
//             </p>
//             <video
//               className="mt-3"
//               width="100%"
//               controls
//               poster="../images/lesson-details/tumb_2.svg"
//             >
//               <source
//                 src="https://www.w3schools.com/html/mov_bbb.mp4"
//                 type="video/mp4"
//               />
//               <source
//                 src="https://www.w3schools.com/html/mov_bbb.ogg"
//                 type="video/ogg"
//               />
//               Your browser does not support HTML video.
//             </video>
//           </div>
//           <div className="less-details-in">
//             <h2>Video Title</h2>
//             <p>
//               Life Dream helps you visualize success in the future. It also
//               keeps you inspired to overcome obstacles when trying to accomplish
//               what you want. You have a long life ahead of you filled with many
//               opportunities to make a positive impact on the community and
//               world.
//             </p>
//             <p>Agenda</p>
//             <p>&#8226; Must I Grow to reach my fullest Potential?</p>
//             <p>&#8226; Do I need Courage to become my best?</p>
//             <p>&#8226; What is Motivation?</p>
//             <p>
//               Imagining your future success and staying inspired to get what you
//               want in life are strongly related to hope. Take a look at this
//               short video to learn what some students hope for.
//             </p>
//             <video
//               className="mt-3"
//               width="100%"
//               controls
//               poster="../images/lesson-details/tumb_3.svg"
//             >
//               <source
//                 src="https://www.w3schools.com/html/mov_bbb.mp4"
//                 type="video/mp4"
//               />
//               <source
//                 src="https://www.w3schools.com/html/mov_bbb.ogg"
//                 type="video/ogg"
//               />
//               Your browser does not support HTML video.
//             </video>
//           </div> */}
//         </div>
//         <div className="bottom-cta justify-content-end">
//           <Link to={`/teacher/mwl-library`} className="next-cta">
//             Next Lesson <i className="fa-solid fa-arrow-right"></i>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default MwlParentTraining;
