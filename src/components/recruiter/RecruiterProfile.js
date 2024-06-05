import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiList from "../../libs/apiLists";
import accountImg from "../../Images/Account-rafiki.png";

const RecruiterProfile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
    type: "",
    companyName: "",
    location: "",
    industry: "",
    companyDescription: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiList.user, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const json = await response.json();
      if (json.success) {
        setProfileDetails(json.data);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Failed to fetch user data.");
    }
  };

  const handleInputChange = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  const handleUpdate = async () => {
    if (profileDetails.contactNumber.length !== 13) {
      toast.warn("Enter a valid contact number with +91 prefix.");
      return;
    }

    setIsClicked(true);

    try {
      const response = await fetch(apiList.user, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileDetails),
      });

      const json = await response.json();
      if (json.success) {
        fetchData();
        toast.success("Profile updated successfully.");
        setIsClicked(false);
        setModalOpen(false);
      } else {
        toast.error(json.message);
        setIsClicked(false);
        setModalOpen(false);
      }
    } catch (err) {
      toast.error("Failed to update profile.");
      setIsClicked(false);
      setModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50">
      <h2 className="text-2xl md:text-4xl font-bold my-8">Profile</h2>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-start mb-8 space-y-4 md:space-y-0 md:space-x-6 w-full max-w-4xl">
          <img src={accountImg} alt="Profile" className="w-full md:w-1/3 object-cover" />
          <div className="border rounded-lg shadow-lg p-4 md:p-6 bg-white w-full md:flex-1">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Hello, <span className="text-blue-600">{profileDetails.name}</span>
              </h3>
              <p className="text-sm md:text-lg text-gray-700 mt-2">
                Contact Number: <span className="font-semibold">{profileDetails.contactNumber}</span>
              </p>
              <p className="text-sm md:text-lg text-gray-700 mt-1">
                Bio: <span className="font-semibold">{profileDetails.bio}</span>
              </p>
              <p className="text-sm md:text-lg text-gray-700 mt-1">
                Type: <span className="font-semibold">{profileDetails.type}</span>
              </p>
              <p className="text-sm md:text-lg text-gray-700 mt-1">
                Company Name: <span className="font-semibold">{profileDetails.companyName}</span>
              </p>
              <p className="text-sm md:text-lg text-gray-700 mt-1">
                Location: <span className="font-semibold">{profileDetails.location}</span>
              </p>
              <p className="text-sm md:text-lg text-gray-700 mt-1">
                Industry: <span className="font-semibold">{profileDetails.industry}</span>
              </p>
              <p className="text-sm md:text-lg text-gray-700 mt-1">
                Company Description: <span className="font-semibold">{profileDetails.companyDescription}</span>
              </p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition duration-300 ease-in-out w-full md:w-auto"
              onClick={() => setModalOpen(true)}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4 md:p-8">
          <div className="relative bg-white p-4 md:p-8 rounded-lg shadow-2xl w-full max-w-lg md:max-w-2xl mx-4 my-8 mt-6 overflow-y-auto h-5/6">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setModalOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl md:text-3xl font-semibold mb-4 md:mb-8 text-center text-gray-800">
              Update Profile
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-4 md:mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Name</label>
                <input
                  type="text"
                  value={profileDetails.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  value={profileDetails.contactNumber}
                  onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-sm font-medium text-blue-700 mb-2">Bio</label>
                <textarea
                  rows="4"
                  value={profileDetails.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Type</label>
                <input
                  type="text"
                  value={profileDetails.type}
                  readOnly
                  className="input-field w-full border-2 border-gray-400 shadow-xl outline-none rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={profileDetails.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profileDetails.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={profileDetails.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-sm font-medium text-blue-700 mb-2">Company Description</label>
                <textarea
                  rows="4"
                  value={profileDetails.companyDescription}
                  onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
            </div>
            <button
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out ${
                isClicked ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleUpdate}
              disabled={isClicked}
            >
              {isClicked ? "Updating..." : "Update Details"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterProfile;
