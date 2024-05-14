import React, { useState, useEffect } from 'react';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';

const Profile = () => {
	const [profileInfo, setProfileInfo] = useState({
		name: '',
		contactNumber: '',
		bio: ''
	});

	useEffect(() => {
		fetchProfileInfo();
	}, []);

	const fetchProfileInfo = async () => {
		try {
			const response = await fetch(apiList.recruiters); // Assuming this is the endpoint to fetch recruiter info
			const json = await response.json();
			if (json.success) {
				setProfileInfo(json.data); // Assuming the response contains the recruiter's profile data
			} else {
				toast.warn(json.message);
			}
		} catch (err) {
			toast.error('Some Error occurred while fetching profile.');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
				<h2 className="text-2xl font-bold mb-4">Profile</h2>
				<div className="space-y-4">
					<label className="block">
						<span className="text-gray-700">Name:</span>
						<input
							type="text"
							value={profileInfo.name}
							readOnly
							className="w-full p-2 border rounded-md outline-none"
						/>
					</label>
					<label className="block">
						<span className="text-gray-700">Contact Number:</span>
						<input
							type="text"
							value={profileInfo.contactNumber}
							readOnly
							className="w-full p-2 border rounded-md outline-none"
						/>
					</label>
					<label className="block">
						<span className="text-gray-700">Bio:</span>
						<textarea
							value={profileInfo.bio}
							readOnly
							className="w-full p-2 border rounded-md outline-none"
						/>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Profile;
