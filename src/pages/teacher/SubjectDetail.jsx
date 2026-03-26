import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { getSubjectInfo } from '../../redux/slices/teacher/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../common/Loading";

const SubjectDetail = () => {
  const location = useLocation();
  const paramData = useParams();
  const dispatch = useDispatch();
  const subjectId = location?.state?.subjectId ? location?.state?.subjectId : paramData?.subjectId;

  const { subjectInfo,loading } = useSelector((state) => state.dashboard)

  useEffect(() =>{
    if(subjectId) {
        dispatch(getSubjectInfo({subject_id: subjectId}))
    }
  },[subjectId])

  return (
    <>
    <div className="sub-detail-wrap">
        <div className="sub-detail-top">
            <h1 className="mb-2">
                {subjectInfo?.subject?.Subject || "Not Available"}
            </h1>
           
            <div className="sub-pro mb-0">
                <ul>
                    <li><img src="/images/subject-detail/lessons.svg" alt="" /> {subjectInfo?.subject?.total_lessons + " lessons"}</li>
                    <li style={{color: "#4126A8"}}><img src="/images/subject-detail/quizzes.svg" alt="" /> {subjectInfo?.subject?.total_lesson_quizzes + " Quizzes"}
                    </li>
                </ul>
               
            </div>
        </div>
        <div className="assessment-result">
            <h6>Baseline Assessment</h6>
            <div className="sub-lessons-list-in drop-btn">
                <div className="lesson-num-ico"><span></span> <img
                        src="/images/subject-detail/sub-lessons/locked-not-started.svg" alt="" /></div>
                <div className="lesson-data">
                    <h2>
                        {subjectInfo?.subject?.Subject}-Baseline Assessment
                       
                    </h2>
                    <p>{subjectInfo?.subject?.description}</p>
                </div>
                <div className="manage-sub-cta justify-content-end">
                    {/* <a href="subject-baseline-detail.html" >View Content</a> */}
                    <Link to={`/teacher/subject-baseline-detail/${subjectId}`} >View Content</Link>
                   
                </div>
            </div>
        </div>
        
       
        <div className="sub-lessons-list">
            <h3> Lessons</h3>

            {subjectInfo?.lessons?.map((item, index) => (
                <div className="sub-lessons-list-in" key={index}>
                    <div className="lesson-num-ico"><span>{index+1}</span> <img
                            src="/images/subject-detail/sub-lessons/locked-not-started.svg" alt="" /></div>
                    <div className="lesson-data">
                        <h2>{item?.title}</h2>
                        <p>{item?.desc}</p>
                    </div>
                    <div className="manage-sub-cta">
                        <Link to={`/teacher/subject-lesson-detail/${subjectId}/${item?.id}`} >View Content</Link>
                    
                        <div className="sub-lessons-list-in-ryt">
                            <span><i className="fa-light fa-clock"></i> {item?.duration}</span>
                        </div>
                    </div>
                </div>

            ))}
           
        </div>
        <div className="assessment-result">
            <h6>Summative Assessment</h6>
            <div className="sub-lessons-list-in drop-btn">
                <div className="lesson-num-ico"><span></span>
                    <img src="/images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                </div>
                <div className="lesson-data">
                    <h2>
                        {subjectInfo?.subject?.Subject}-Summative Assessment
                       
                    </h2>
                    <p>{subjectInfo?.subject?.description}</p>
                </div>
                
                <div className="manage-sub-cta justify-content-end">
                    {/* <a href="subject-summative-detail.html" >View Content</a> */}
                    <Link to={`/teacher/subject-summative-detail/${subjectId}`} state={{ subjectId: subjectId }} >View Content</Link>
                    
                </div>
               
            </div>
        </div>
    </div>
</>
  )
}

export default SubjectDetail