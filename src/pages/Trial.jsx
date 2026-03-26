import React from "react";
import VideoPlayer from "../components/teacher/DriveVideoPlayer"; // Your MP4 video player component

const mwlContents = {
  status: true,
  subject: {
    Subject: "Life Dream",
    level: "Ruby Level",
    description: "",
    total_lessons: 8,
    total_lesson_quizzes: 0,
  },
  lesson: {
    id: 157,
    subject_id: "14",
    title: "Lesson 1",
    desc: null,
    created_at: "2025-09-09 13:08:02",
    updated_at: "2025-09-09 13:08:02",
    contents: [
      {
        id: 159,
        subject_id: "14",
        lesson_id: "157",
        category_id: null,
        title: "",
        video_link:
          "https://pmsc-lms-data.s3.us-east-1.amazonaws.com/videos/Ruby%2C+LD%2C+Lesson+1%2C+Video+2%2C+Manny's+wants.mp4",
        desc: "",
        video_status: "completed",
        current_duration: null, // in seconds
        order: 0,
        created_at: "2025-09-10 06:06:19",
        updated_at: "2025-09-10 06:06:19",
        type: "video",
      },
      {
        id: 160,
        subject_id: "14",
        lesson_id: "157",
        category_id: null,
        title: "",
        video_link:
          "https://pmsc-lms-data.s3.us-east-1.amazonaws.com/videos/Ruby%2C+LD%2C+Lesson+1%2C+Video+2%2C+Manny's+wants.mp4",
        desc: "",
        video_status: "progress",
        current_duration: "9.54", // in seconds
        order: 1,
        created_at: "2025-09-10 06:06:19",
        updated_at: "2025-09-10 06:06:19",
        type: "video",
      },
      {
        id: 161,
        subject_id: "14",
        lesson_id: "157",
        category_id: null,
        title: "",
        video_link:
          "https://pmsc-lms-data.s3.us-east-1.amazonaws.com/videos/Ruby%2C+LD%2C+Lesson+1%2C+Video+2%2C+Manny's+wants.mp4",
        desc: "",
        video_status: "locked",
        current_duration: null, // in seconds
        order: 2,
        created_at: "2025-09-10 06:06:19",
        updated_at: "2025-09-10 06:06:19",
        type: "video",
      },
      {
        id: 162,
        subject_id: "14",
        lesson_id: "157",
        category_id: null,
        title: "",
        video_link:
          "https://pmsc-lms-data.s3.us-east-1.amazonaws.com/videos/Ruby%2C+LD%2C+Lesson+1%2C+Video+2%2C+Manny's+wants.mp4",
        desc: "",
        video_status: "locked",
        current_duration: null, // in seconds
        order: 3,
        created_at: "2025-09-10 06:06:19",
        updated_at: "2025-09-10 06:06:19",
        type: "video",
      },
    ],
  },
};

const Trial = () => {
  return (
    <div>
      <h1>
        {mwlContents?.subject?.Subject} - {mwlContents?.lesson?.title}
      </h1>

      {mwlContents?.lesson?.contents?.map((item, index) => {
        return (
          <div key={index} style={{ marginBottom: "30px" }}>
            <VideoPlayer
              src={item.video_link}
              status={item.video_status} // progress | completed | locked
              current_duration={item.current_duration} // in seconds
              onEvent={(event, time, duration) => {
                console.log("📡 Event:",event,"Time:",time,"Video ID:",item.id, "duration:", duration);
                // 🔥 Replace with API call if needed
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Trial;
