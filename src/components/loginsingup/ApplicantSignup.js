import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';

const ApplicantSignup = () => {
	const [signupDetails, setSignupDetails] = useState({
		type: 'applicant',
		uName: '',
		uEmail: '',
		password: '',
		confirmPassword: '',
		resume: null,
		profile: '',
		education: [],
		skills: []
	});

	const handleChange = (key, value) => {
		setSignupDetails({
			...signupDetails,
			[key]: value
		});
	};

	const handleApplicantSignup = async () => {
		// Signup logic for applicants
		try {
			// Send signupDetails to the server for signup process
			const response = await apiList.signup(signupDetails);
			// Handle success response
			toast.success(response.message);
			// Redirect the user to the login page
			// You might need to implement the redirection logic here
		} catch (error) {
			// Handle error response
			toast.error(error.message);
		}
	};

	const handleLogin = async () => {
		// Login logic
		// You can implement the login logic here
	};

	return (
		<div>
			<h2>Applicant Signup</h2>
			<input
				type="text"
				placeholder="Username"
				value={signupDetails.uName}
				onChange={(e) => handleChange('uName', e.target.value)}
			/>
			<input
				type="email"
				placeholder="Email"
				value={signupDetails.uEmail}
				onChange={(e) => handleChange('uEmail', e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={signupDetails.password}
				onChange={(e) => handleChange('password', e.target.value)}
			/>
			<input
				type="password"
				placeholder="Confirm Password"
				value={signupDetails.confirmPassword}
				onChange={(e) => handleChange('confirmPassword', e.target.value)}
			/>
			{/* Additional fields for resume, profile, education, skills */}
			{/* Implement additional input fields as needed */}
			<button onClick={handleApplicantSignup}>Sign Up</button>
			<p>
				Already have an account? <Link to="/login">Log in</Link>
			</p>
		</div>
	);
};

export default ApplicantSignup;
