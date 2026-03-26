import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getProfile, updateProfile } from "../../redux/slices/student/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { logout } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { profileData, loading } = useSelector((state) => state.student);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "", email: "", school_name: "", experience: "", department: ""
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.full_name || "",
        email: profileData.email || "",
		school_name: profileData.school_name || "",
		experience: profileData.experience || "",
		department: profileData.department || "",
      });
    }
  }, [profileData]);

  const handleEdit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateProfile(formData));
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    window.location.assign(`https://clever.com/oauth/logout?redirect_uri=https://pmsc.holpentech.com`);
  };

  return (
    <>
      {loading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Spinner animation="border" />
        </div>
      )}

      <div className="top-head">
        <div className="top-head-in">
          <h1>Profile Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="personal-info">
            <h2>Personal Information</h2>
            <h4>
              {profileData?.full_name} <br /> <span>{profileData?.email}</span>
            </h4>
            <form>
              <div className="form-group">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter Your Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail ID"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="school_name">School Name</label>
                <input type="text" name="school_name" placeholder="School Name" 
					value={formData.school_name} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
				<input
					type="text"
					name="experience"
					placeholder="Experience"
					value={formData.experience}
					onChange={handleChange}
					disabled={!isEditing}
				/>
              </div>
              <div className="form-group full-width">
                <label htmlFor="departments">Departments</label>
				<input
					type="text"
					name="departments"
					placeholder="Departments"
					value={formData.department}
					onChange={handleChange}
					disabled={!isEditing}
				/>
              </div>
              {/* <div className="form-group">
                <input
                  type="submit"
                  value={isEditing ? "Update" : "Edit Profile"}
                  onClick={handleEdit}
                />
              </div> */}
            </form>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="personal-info">
            <h2>Quick Actions</h2>
            <Link to="#" onClick={handleLogout}>
              <img src="/images/logout.svg" alt="" /> Log out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

// import React from 'react'

// const Profile = () => {
//   return (
//    <>
// 			<div className="top-head">
// 				<div className="top-head-in">
// 					<h1>Profile Settings</h1>
// 					<p>Manage your account settings and preferences</p>
// 				</div>
// 			</div>
// 			<div className="row">
// 				<div className="col-lg-8">
// 					<div className="personal-info teacher-info">
// 						<h2>Personal Information</h2>
// 						<h4>John Doe <br/> <span>john.doe@example.com</span></h4>
// 						<form action="">
// 							<div className="form-group">
// 								<label for="name">Full Name</label>
// 								<input type="text" placeholder="Enter Your Full Name" value="John Doe"/>
// 							</div>
// 							<div className="form-group">
// 								<label for="name">Email Address</label>
// 								<input type="text" placeholder="E-mail ID" value="john.doe@example.com" readonly/>
// 							</div>
// 							<div className="form-group">
// 								<label for="name">School Name</label>
// 								<input type="text" placeholder="Enter Your School Name" value="Lincoln Elementary School"/>
// 							</div>
// 							<div className="form-group">
// 								<label for="name">Experience</label>
// 								<input type="text" placeholder="Enter Your Experience" value="15 Years"/>
// 							</div>
// 							<div className="form-group full-width">
// 								<label for="name">Departments</label>
// 								<input type="text" placeholder="Enter Your Department" value="Lorem Ipsum"/>
// 							</div>
// 							<div className="form-group">
// 								<input type="submit" value="Edit Profile"/>
// 							</div>
// 						</form>
// 					</div>
// 				</div>
// 				<div className="col-lg-4">
// 					<div className="personal-info">
// 						<h2>Quick Actions</h2>
// 						<a href="#"><img src="../images/logout.svg" alt=""/> Log out</a>
// 					</div>
// 				</div>
// 			</div>
// 		</>
//   )
// }

// export default Profile
