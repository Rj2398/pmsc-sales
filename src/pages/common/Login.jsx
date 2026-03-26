import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/slices/authSlice'; // optional for real sign-in
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    dispatch(signIn(loginData));
  };

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      switch (user.role) {
        case "teacher":
          document.title = "PMSC Teacher Panel";
          break;
        case "principal":
          document.title = "PMSC Principal Panel";
          break;
        case "district_admin":
          document.title = "PMSC District Admin Panel";
          break;
        default:
          document.title = "PMSC Student Panel";
          break;
      }

      navigate(`/${user.role?.replace("_", "-")}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm p-4">
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {error && <div className="text-danger mb-3 d-flex justify-content-center">{error}</div>}
                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

// ---------------------------------------------------------------------------------------

// import { useDispatch, useSelector } from "react-redux";
// import { getMyDetails, signIn } from "../../redux/slices/authSlice"; // optional for real sign-in
// import { useLocation, useNavigate, Link } from "react-router-dom";

// import {Container, Row, Col, Button, Card, Form, Modal,} from "react-bootstrap";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isAuthenticated, isAlreadyVisited, user, error } = useSelector((state) => state.auth);
//   // State for the modal
//   const [showModal, setShowModal] = useState(false);
//   const [isAgreed, setIsAgreed] = useState(false);
//   const [validationError, setValidationError] = useState("");

//   const redirectUri = import.meta.env.VITE_REDIRECT_URL;
//   const backendApi = `${import.meta.env.VITE_API_URL}/get-clever-token`;
//   const clientId = import.meta.env.VITE_CLIENT_ID;
//   // const defaultDistrictId = import.meta.env.VITE_DEFAULT_DISTRICT_ID;

//   const redirectToClever = () => {
//     // window.location.href = `https://clever.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&district_id=${defaultDistrictId}`;
//     window.location.href = `https://clever.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
//   };

//   const handleModalClose = () => {
//     if (isAgreed) {
//       setShowModal(false);
//       setValidationError(""); // Clear validation error on successful close
//       // Navigate to the dashboard after the user agrees and clicks "Okay"
//       if (user?.role) {
//         navigate(`/${user.role}/dashboard`);
//       }
//     } else {
//       setValidationError("You must agree to the terms.");
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     setIsAgreed(e.target.checked);
//     if (e.target.checked) {
//       setValidationError(""); // Clear error when checkbox is checked
//     }
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");

//     if (code) {
//       axios.post(backendApi, { code }).then((response) => {
//         dispatch(getMyDetails({ token: response.data?.access_token }));
//       }).catch((err) => console.error("Error sending code to backend:", err));
//     } else {
//       const hasRedirected = sessionStorage.getItem("clever_redirect_attempt");
//       if (!hasRedirected) {
//         sessionStorage.setItem("clever_redirect_attempt", "true");
//         redirectToClever();
//       }
//     }
//   }, []);

//   useEffect(() => {
//     return () => {
//       sessionStorage.removeItem("clever_redirect_attempt");
//     };
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated && user?.role) {
      
//       if(isAlreadyVisited){
//         setShowModal(true); // Show the modal instead of navigating immediately
//       } else if(!isAlreadyVisited && isAlreadyVisited !== null){
//         navigate(`/${user.role?.replace("_", "-")}/dashboard`);
//       }
      
//       switch (user.role) {
//         case "teacher":
//           document.title = "PMSC Teacher Panel";
//           break;
//         case "principal":
//           document.title = "PMSC Principal Panel";
//           break;
//         default:
//           document.title = "PMSC Student Panel";
//           break;
//       }
//     }
//   }, [isAuthenticated, user, navigate, location.key]);

//   return (
//     <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
//       <Container className="text-center">
//         <h1 className="display-4 text-primary mb-3">Welcome to PMSC</h1>
//         <p className="lead text-muted mb-4"> Redirecting to login with Clever... </p>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <div className="mt-4">
//           <p className="text-secondary small"> 
//             If you are not redirected automatically, click the button below:
//           </p>
//           <button onClick={redirectToClever} className="btn btn-primary btn-lg mt-2" >
//             <i className="fas fa-sign-in-alt me-2"></i> Login with Clever
//           </button>
//         </div>
//       </Container>
//       <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" size="lg" centered >
//         <Modal.Header closeButton style={{ backgroundColor: "#5a2ecf", color: "white" }} >
//           <Modal.Title style={{ fontSize: "18px", fontWeight: "500" }}>
//             ⚠️ Important - Please Read
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body style={{ fontSize: "14px", paddingBottom: "0px" }}>
//           <div style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               borderRadius: "5px",
//               maxHeight: "250px",
//               overflowY: "auto",
//               whiteSpace: "pre-wrap",
//               fontFamily: "Arial, sans-serif",
//               fontSize: "14px",
//               lineHeight: "1.5",
//               color: "#333",
//             }} >
//             <strong> 
//               These are NOT the full Terms & Conditions. You must read and
//               accept the complete agreement before using Holpentech's services.
//               Below is a short recap of key rules unique to our platform:
//             </strong>
//             <br />
//             <br />
//             <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "10px" }}>
//               <li>
//                 <strong>One account, one person - </strong> Your login is just
//                 for you. Sharing access is not allowed.
//               </li>
//               <li>
//                 <strong>No external posting or AI use - </strong> Do not upload
//                 PMSC® content to Course Hero, Chegg, ChatGPT, CoPilot, or any
//                 other third-party site or tool.
//               </li>
//               <li>
//                 <strong>No copying or redistribution - </strong> You may not
//                 copy, print, paraphrase, or distribute PMSC® content, except as
//                 expressly permitted.
//               </li>
//               <li>
//                 <strong>Facilitators only - </strong> Teachers may display
//                 limited facilitator content in class, but cannot distribute it
//                 to students outside the system.
//               </li>
//               <li>
//                 <strong>Rule violations may lead to termination - </strong>{" "}
//                 Breaking these rules may immediately end your license.
//               </li>
//               <li>
//                 <strong>Your feedback is sent to Holpentech - </strong>{" "}
//                 Holpentech may use any suggestions or ideas provided without
//                 payment or credit.
//               </li>
//               <li>
//                 <strong>“As is” service - </strong> Holpentech does not
//                 guarantee the Service will be error-free, and liability is
//                 limited to the cost of your seat/license.
//               </li>
//               <li>
//                 <strong>Dispute process - </strong> Disputes must first go to
//                 mediation. By agreeing, you also waive the right to file or join
//                 a class action.
//               </li>
//               <li>
//                 <strong>Student data is protected - </strong> PMSC® complies
//                 with FERPA and COPPA. We never sell your data.
//               </li>
//             </ul>
//             <p>
//               👉 Please click <strong>“View Full Terms & Conditions”</strong>{" "}
//               below to read the entire agreement before accepting.
//             </p>
//           </div>

//           <Form.Group controlId="formBasicCheckbox" className="mt-3">
//             <Form.Check type="checkbox" checked={isAgreed} onChange={handleCheckboxChange}
//               label={
//                 <span> By checking this box, you agree to our{" "}
//                   <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" >
//                     Terms and Conditions
//                   </Link>{" "} and{" "}
//                   <Link to="/privacy-and-policy" target="_blank" rel="noopener noreferrer" >
//                     Privacy Policy
//                   </Link>
//                   .
//                 </span>
//               }
             
//             />
//           </Form.Group>
//           {validationError && (<p className="text-danger mt-2">{validationError}</p>)}
//         </Modal.Body>

//         <Modal.Footer className="border-0 pt-0">
//           <Button style={{ backgroundColor: "#5a2ecf", border: "none" }} onClick={handleModalClose}>
//             Go to website
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Login;