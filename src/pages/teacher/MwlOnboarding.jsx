import React from "react";
import { Link, useNavigate } from "react-router";

const MwlOnboarding = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="baseline-ass-wrp">
        <div className="back-btn mb-3">
          <Link to="" onClick={() => navigate(-1)}>
            <img src="../images/baseline-assessment/back-icon.svg" alt="" />{" "}
            Back to the Subject
          </Link>
        </div>
        <div className="less-details">
          <h1>Onboarding</h1>
          <div className="less-details-in">
            <h2>Video Title</h2>
            <p>
              Life Dream helps you visualize success in the future. It also
              keeps you inspired to overcome obstacles when trying to accomplish
              what you want. You have a long life ahead of you filled with many
              opportunities to make a positive impact on the community and
              world.
            </p>
            <p>Agenda</p>
            <p>&#8226; Must I Grow to reach my fullest Potential?</p>
            <p>&#8226; Do I need Courage to become my best?</p>
            <p>&#8226; What is Motivation?</p>
            <p>
              Imagining your future success and staying inspired to get what you
              want in life are strongly related to hope. Take a look at this
              short video to learn what some students hope for.
            </p>
            <video
              className="mt-3"
              width="100%"
              controls
              poster="../images/lesson-details/tumb_1.svg"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.w3schools.com/html/mov_bbb.ogg"
                type="video/ogg"
              />
              Your browser does not support HTML video.
            </video>
          </div>
          <div className="less-details-in">
            <h2>Video Title</h2>
            <p>
              Life Dream helps you visualize success in the future. It also
              keeps you inspired to overcome obstacles when trying to accomplish
              what you want. You have a long life ahead of you filled with many
              opportunities to make a positive impact on the community and
              world.
            </p>
            <p>Agenda</p>
            <p>&#8226; Must I Grow to reach my fullest Potential?</p>
            <p>&#8226; Do I need Courage to become my best?</p>
            <p>&#8226; What is Motivation?</p>
            <p>
              Imagining your future success and staying inspired to get what you
              want in life are strongly related to hope. Take a look at this
              short video to learn what some students hope for.
            </p>
            <video
              className="mt-3"
              width="100%"
              controls
              poster="../images/lesson-details/tumb_3.svg"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.w3schools.com/html/mov_bbb.ogg"
                type="video/ogg"
              />
              Your browser does not support HTML video.
            </video>
          </div>
          <div className="less-details-in">
            <h2>Video Title</h2>
            <p>
              Life Dream helps you visualize success in the future. It also
              keeps you inspired to overcome obstacles when trying to accomplish
              what you want. You have a long life ahead of you filled with many
              opportunities to make a positive impact on the community and
              world.
            </p>
            <p>Agenda</p>
            <p>&#8226; Must I Grow to reach my fullest Potential?</p>
            <p>&#8226; Do I need Courage to become my best?</p>
            <p>&#8226; What is Motivation?</p>
            <p>
              Imagining your future success and staying inspired to get what you
              want in life are strongly related to hope. Take a look at this
              short video to learn what some students hope for.
            </p>
            <video
              className="mt-3"
              width="100%"
              controls
              poster="../images/lesson-details/tumb_2.svg"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.w3schools.com/html/mov_bbb.ogg"
                type="video/ogg"
              />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
        <div className="bottom-cta justify-content-end">
          <a href="javascript:void(0);" className="next-cta">
            Finish Lesson <i className="fa-regular fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default MwlOnboarding;
