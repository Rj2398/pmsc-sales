import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentAnswers } from '../../redux/slices/teacher/dashboardSlice';

const StudentSummativeAssessment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const subjectId = location.state?.subjectId;
    const studentId = location.state?.studentId;

    const { allQuestionAnswer } = useSelector((state) => state.dashboard)

    const summativeTest = allQuestionAnswer?.summative_test || {};
    const answer = summativeTest.answers || [];
    const subject = allQuestionAnswer?.subject || {};

    useEffect(() => {
        if (subjectId && studentId) {
            dispatch(getStudentAnswers({ subject_id: subjectId, student_id: studentId }))
        }
    }, [dispatch, subjectId, studentId]);

    return (
        <>
            <div className="sub-detail-wrap baseline-ass-wrp">
                <div className="sub-detail-top">
                    <h1 className="mb-2">{summativeTest?.subject_name}-Summative Assessment <span className="pe-4 text-black"> Score: {subject?.percentage}%</span>
                    </h1>

                    <div className="sub-pro mb-0">
                        <ul>
                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> {subject?.total_lessons} lessons</li>
                            <li style={{ color: "#4126A8" }}><img src="../images/subject-detail/quizzes.svg" alt="quizzes" /> {subject?.total_lesson_quizzes} Quizzes
                            </li>
                        </ul>

                        <b className="completed">{summativeTest?.status?.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</b>
                    </div>
                </div>
                <div className="assessment-result baseline-top border-0 p-0">
                    <div className="baseline-ass-q-a drop-list">
                        <h2><img src="../images/dashboard/earned-certificates/earned-certi.svg" alt="" /> Submitted
                            assessment
                            answers
                        </h2>

                        {answer?.map((answer, index) => (
                            <div className="asse-complete-q-a" key={answer.quiz_id || index}>
                                <h4>Question {index + 1}: {answer?.question}</h4>
                                {answer?.selected_option ? <p className="ps-0 d-flex gap-2 justify-content-start">
                                    <span>Your Answer</span>
                                    <img src="../images/baseline-assessment/radio-icon.svg" alt="" />
                                    {answer?.selected_option}
                                </p> :
                                    <p className="ps-0 d-flex gap-2 justify-content-start">
                                        <span>No answer submitted</span>
                                    </p>
                                }


                            </div>
                        ))}
                    </div>
                </div>
                <div class="back-btn mt-4 mx-auto">
                    {/* <a href="student-profile.html">Return to Profile</a> */}
                    {/* <Link to="/teacher/student-profile">Return to Profile</Link> */}
                    <Link to="" onClick={() => navigate(-1)}>Return to Profile</Link>

                </div>
            </div>
        </>
    )
}

export default StudentSummativeAssessment