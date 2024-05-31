import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiList from "../../libs/apiLists";
import accountImg from "../../Images/Account-rafiki.png";
import userPhoto from "../../Images/user.png";
import { server } from "../../libs/apiLists";

const ApplicantProfile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
    type: "",
    resume: null,
    profile: null,
    education: [],
    skills: [],
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

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
        const userData = json.jobApplicant;
        setProfileDetails({
          ...userData,
          resume: null,
          profile: null,
        });
        setProfileUrl(`${server}${userData.profile.replace("./", "/")}`);
        setResumeUrl(`${server}${userData.resume.replace("./", "/")}`);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Failed to fetch user data.");
    }
  };

  const handleInputChange = (key, value) => {
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", profileDetails.name);
    formData.append("contactNumber", profileDetails.contactNumber);
    formData.append("bio", profileDetails.bio);

    formData.append("education", JSON.stringify(profileDetails.education));
    formData.append("skills", JSON.stringify(profileDetails.skills));

    if (profileDetails.resume) {
      formData.append("resume", profileDetails.resume);
    }
    if (profileDetails.profile) {
      formData.append("profile", profileDetails.profile);
    }

    console.log(formData)
    try {
      const response = await fetch(apiList.user, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
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

  const handleAddEducation = () => {
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      education: [
        ...prevDetails.education,
        {
          institutionName: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const handleEducationChange = (index, key, value) => {
    const newEducation = profileDetails.education.map((edu, i) =>
      i === index ? { ...edu, [key]: value } : edu
    );
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      education: newEducation,
    }));
  };

  const handleAddSkill = () => {
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      skills: [...prevDetails.skills, ""],
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = profileDetails.skills.map((skill, i) =>
      i === index ? value : skill
    );
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      skills: newSkills,
    }));
  };

  const handleFileChange = (key, file) => {
    if (!file) {
      return;
    }

    const maxResumeSizeInBytes = 2 * 1024 * 1024; // 2MB
    const maxProfileSizeInBytes = 200 * 1024; // 200KB

    if (key === "resume" && file.size > maxResumeSizeInBytes) {
      toast.warn("Resume file size must not exceed 2MB.");
    } else if (key === "profile" && file.size > maxProfileSizeInBytes) {
      toast.warn("Profile photo file size must not exceed 200KB.");
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange(key, file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col p-4 min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold my-8 text-left ml-8">Profile</h2>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex h-full items-start mb-8">
          <img src={accountImg} alt="Profile" className="w-1/3 object-cover" />
          <div className="ml-6 border rounded-lg shadow-lg p-6 bg-white flex-1 h-3/4 relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={profileUrl || userPhoto}
                alt="Profile Photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-20">
              <h3 className="text-xl font-semibold">
                Hello,{" "}
                <span className="text-blue-600">{profileDetails.name}</span>
              </h3>
              <p className="text-lg text-gray-700 mt-2">
                Contact Number:{" "}
                <span className="font-semibold">
                  {profileDetails.contactNumber}
                </span>
              </p>
              <p className="text-lg text-gray-700 mt-1">
                Bio: <span className="font-semibold">{profileDetails.bio}</span>
              </p>
              <p className="text-lg text-gray-700 mt-1">
                Resume:{" "}
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              </p>
              <p className="text-lg text-gray-700 mt-1">
                Skills:{" "}
                <span className="font-semibold">
                  {profileDetails.skills.join(", ")}
                </span>
              </p>
              <div className="text-lg text-gray-700 mt-1">
                Education:
                {profileDetails.education.map((edu, index) => (
                  <div key={index} className="mt-2">
                    <span className="font-semibold">
                      {edu.institutionName} (
                      {new Date(edu.startDate).getFullYear()} -{" "}
                      {new Date(edu.endDate).getFullYear()})
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition duration-300 ease-in-out"
              onClick={() => setModalOpen(true)}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl mx-4 my-8 h-5/6 overflow-y-auto">
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
            <h3 className="text-3xl font-semibold mb-8 text-center text-gray-800">
              Update Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={profileDetails.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={profileDetails.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows="4"
                  value={profileDetails.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleFileChange("resume", e.target.files[0])
                  }
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Max size: 2MB (.pdf, .doc, .docx)
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange("profile", e.target.files[0])
                  }
                  className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Max size: 200KB (jpg, png, gif)
                </p>
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Skills
                </label>
                {profileDetails.skills.map((skill, index) => (
                  <input
                    key={index}
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2 mb-2"
                  />
                ))}
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  onClick={handleAddSkill}
                >
                  Add Skill
                </button>
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Education
                </label>
                {profileDetails.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      placeholder="Institution Name"
                      value={edu.institutionName}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "institutionName",
                          e.target.value
                        )
                      }
                      className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2 mb-2"
                    />
                    <div className="flex gap-4">
                      <input
                        type="datetime-local"
                        placeholder="Start Date"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2 mb-2"
                      />
                      <input
                        type="datetime-local"
                        placeholder="End Date"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="input-field w-full border-2 border-gray-400 rounded-lg shadow-sm p-2 mb-2"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  onClick={handleAddEducation}
                >
                  Add Education
                </button>
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

export default ApplicantProfile;
