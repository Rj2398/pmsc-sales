import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { getBaselineSummitiveQuiz } from '../../redux/slices/principal/principalDashboardSlice';

const SubjectBaselinedetails = () => {
     const navigate=useNavigate()
	  const dispatch = useDispatch();
    const paramData = useParams();
    const subjectId = location?.state?.subjectId ? location?.state?.subjectId : paramData?.subjectId;

	// const baslineSummitiveInfo= data?.summative_baseline;
     const { baslineSummitiveInfo } = useSelector((state) => state.principalDashboard)

    useEffect(() => {
        if (subjectId) {
            dispatch(getBaselineSummitiveQuiz({ subject_id: subjectId }));
        }
    }, [subjectId]);

	
  return (
      <>
      <main>
		<div className="bas-sum-asses-wrp">
			<div className="back-btn mb-5">
				<Link onClick={()=>navigate(-1)}>
					<img src="/images/baseline-assessment/back-icon.svg" alt=""/> Back to the Subject
				</Link>
			</div>
			  <h1>{baslineSummitiveInfo?.baseline_test?.subject_name}-Baseline Assessment</h1>
        <form>
            {baslineSummitiveInfo?.baseline_test?.answers?.map((item, index) => (
                <div className="less-details-in" key={index}>
				{/* <h2> {item?.type === "standard" ? "Multiple Choice Question with one correct answer" : item?.type === "fill_points" ? "Fill in the Blank with Points" : item?.type === "fill_blank" ? "Fill in the Blank" : ""} </h2> */}
				
				<h4>Question</h4>
                <input readOnly type="text" className="q-fiel" value={item?.question}/>
                <h4>Options</h4>
                <div className="options-list-grp">
                    {item?.options?.map((item, index) => (
                        <div className="options-list-in" key={index}>
                            <span></span>
                            <input readOnly type="text" className="option-fiel" value={item?.option}/>
                        </div>
                    ))}
                </div>

            </div>
            ))}
        </form>
		</div>
	</main>
      </>
  )
}

export default SubjectBaselinedetails
