import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router';

const MwlLessonPrep = () => {
    // State for Add Subject popup
    const [showAddSubject, setShowAddSubject] = useState(false);
    const [subjectName, setSubjectName] = useState('');

    // State for Delete Confirmation popup
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleAddSubject = (e) => {
        e.preventDefault();
        // Add subject logic here
        setShowAddSubject(false);
        setSubjectName('');
    };

    const handleDeleteConfirm = (e) => {
        e.preventDefault();
        // Delete confirmation logic here
        setShowDeleteConfirm(false);
        setPassword('');
    };

    return (
        <>
            <div className="sub-detail-top">
                <h1 className="mb-2">
                    Lesson Prep

                </h1>
                <div className="sub-pro mb-0">
                    <p>Manage education levels, subjects, lessons, and content</p>

                </div>

            </div>
            <div className="subjects-lesson-progress mt-4 course-management student-mng">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="my-subjects mt-0">
                            <div className="my-subjects-head">
                                <h3>
                                    Ruby Level - Manage Subjects

                                </h3>
                            </div>
                            <div className="manage-sub-grid">

                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>1</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Life Dream

                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>

                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>


                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>2</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Self-Awareness

                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>


                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>


                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>3</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Cognitive Construction

                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>


                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>


                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>4</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Interpersonal Relationships

                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>


                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>


                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>5</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Coping

                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>


                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="my-subjects">
                            <div className="my-subjects-head">
                                <h3>
                                    Emerald Level - Manage Subjects
                                    <a href="javascript:void(0);" className="add-cta">
                                        <img src="../images/cta-badge.svg" alt="" /> View Badge
                                    </a>

                                    {/* <button className="add-cta" onClick={() => setShowAddSubject(true)}>
                      <img src="../images/cta-badge.svg" alt="" /> Add Subject
                    </button> */}
                                </h3>
                            </div>
                            <div className="manage-sub-grid">

                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>1</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Life Dream

                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>


                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>


                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>2</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Self-Awareness

                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>


                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>


                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>3</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Cognitive Construction

                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>


                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>


                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>4</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Interpersonal Relationships
                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>

                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>

                                <div className="manage-sub-item sub-lessons-list-in">
                                    <div className="lesson-num-ico"><span>5</span> <img
                                        src="../images/subject-detail/sub-lessons/locked-not-started.svg" alt="" />
                                    </div>
                                    <div className="manage-sub-data">
                                        <h4>Coping
                                        </h4>
                                        <ul>
                                            <li><img src="../images/subject-detail/lessons.svg" alt="" /> 08 lessons</li>

                                        </ul>
                                    </div>
                                    <div className="manage-sub-cta">
                                        <Link to="/teacher/mwl-lesson-prep-subject">Manage Content</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* Add Subject Popup */}
            <Modal show={showAddSubject} onHide={() => setShowAddSubject(false)} className="my-popup fade" id="quit-popup" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-edit" role="document">
                    <div className="modal-content clearfix">
                        <div className="modal-heading">
                            <h2>Add Subject</h2>
                            <button type="button" className="close close-btn-front" onClick={() => setShowAddSubject(false)} aria-label="Close">
                                <span aria-hidden="true">
                                    <img src="../images/cross-pop.svg" alt="" />
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="delete-pop-wrap">
                                <form onSubmit={handleAddSubject}>
                                    <div className="delete-pop-inner my-2 align-items-start">
                                        <p>Subject Name</p>
                                    </div>
                                    <div className="form-group mb-4">
                                        <input
                                            type="text"
                                            placeholder="Enter Subject Name"
                                            value={subjectName}
                                            onChange={(e) => setSubjectName(e.target.value)}
                                        />
                                    </div>
                                    <div className="delete-pop-btn">
                                        <button type="button" className="active" onClick={() => setShowAddSubject(false)}>Cancel</button>
                                        <button type="submit">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Popup */}
            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} className="my-popup fade" id="delete-popup" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-edit" role="document">
                    <div className="modal-content clearfix">
                        <div className="modal-heading">
                            <h2>Confirm Deletion</h2>
                            <button type="button" className="close close-btn-front" onClick={() => setShowDeleteConfirm(false)} aria-label="Close">
                                <span aria-hidden="true">
                                    <img src="../images/cross-pop.svg" alt="" />
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="delete-pop-wrap">
                                <form onSubmit={handleDeleteConfirm}>
                                    <div className="delete-pop-inner my-2 mb-3">
                                        <p><b>Are you sure you want to delete this subject?</b></p>
                                        <p>This will permanently remove all its contents, quizzes, and lessons.</p>
                                    </div>
                                    <div className="delete-pop-inner mb-1 align-items-start">
                                        <p>Enter your password to confirm:</p>
                                    </div>
                                    <div className="form-group password-wrapper mb-4">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter Password"
                                            className="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="password-eye" onClick={() => setShowPassword(!showPassword)}>
                                            <div className={`eye ${showPassword ? '' : 'eye-close'}`}></div>
                                        </div>
                                    </div>
                                    <div className="delete-pop-btn">
                                        <button type="submit" className="active">Delete</button>
                                        <button type="button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default MwlLessonPrep