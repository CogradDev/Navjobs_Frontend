import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiList from "../../libs/apiLists";
import { server } from "../../libs/apiLists";
import defaultProfilePhoto from "../../Images/user.png";
import {
  FaChevronDown,
  FaCalendarAlt,
  FaGraduationCap,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${apiList.jobs}/${jobId}/applications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const json = await response.json();

        if (json.success) {
          const applications = json.applications;
          setApplications(applications);
        } else {
          console.log(json.message);
          toast.error(json.message || "Failed to fetch applications");
        }
      } catch (error) {
        toast.error("Error fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "text-blue-500";
      case "Shortlisted":
        return "text-yellow-500";
      case "Accepted":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      case "Deleted":
        return "text-gray-500";
      case "Cancelled":
        return "text-purple-500";
      case "Finished":
        return "text-gray-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="p-6 my-5 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Job Applications</h2>
      {loading ? (
        <div>Loading...</div>
      ) : applications && applications.length === 0 ? (
        <div>No applications found</div>
      ) : (
        applications.map((application, index) => (
          <div
            className="bg-white p-6 rounded-lg shadow-md mb-6"
            key={index}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Application Details</h3>
              <span
                className={`text-md font-semibold rounded-full px-3 py-1 mt-2 md:mt-0 ${getStatusColor(
                  application.status
                )}`}
              >
                {application.status}
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <img
                src={
                  application.profile
                    ? `${server}${application.profile.replace("./", "/")}`
                    : defaultProfilePhoto
                }
                alt="Profile"
                className="rounded-full h-12 w-12 mr-4 mb-4 md:mb-0"
              />
              <div>
                <h3 className="text-lg font-semibold">{application.name}</h3>
                <p className="text-gray-600">{application.email}</p>
              </div>
            </div>
            <Accordion application={application} />
          </div>
        ))
      )}
    </div>
  );
};

const formatText = (text) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const urlRegex = /(?:https?|ftp):\/\/[\S]+/g;

  return text
    .split("\n")
    .map((line, index) => {
      const emailReplaced = line.replace(
        emailRegex,
        (match) =>
          `<a href="mailto:${match}" class="text-blue-700 underline">${match}</a>`
      );

      const urlReplaced = emailReplaced.replace(
        urlRegex,
        (match) =>
          `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline">${match}</a>`
      );

      return (
        <p
          key={index}
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: urlReplaced }}
        />
      );
    });
};

const Accordion = ({ application }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t border-gray-200 mt-4">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-semibold text-gray-800">Proposal Documents</span>
        <FaChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4">
          <div className="text-gray-600 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2" />
            <strong className="mr-2">Date of Application:</strong>
            {new Date(application.dateOfApplication).toLocaleDateString()}
          </div>
          <div className="text-gray-600 mb-4">
            <strong className="mr-2">Statement of Purpose</strong><br/>
            {formatText(application.sop)}
          </div>
          <div className="text-gray-600 mb-2">
            <p className="text-lg text-gray-700 mt-1 flex items-center">
              <FaFileAlt className="mr-2" />
              Resume:
              <a
                href={`${server}${application.resume.replace("./", "/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline ml-2"
              >
                View Resume
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
