import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiList, { server } from "../../libs/apiLists";
import defaultProfilePhoto from "../../Images/user.png";
import { FaChevronDown, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(apiList.applicants, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          const filteredApplications = json.filter(
            (application) => application.status === "Accepted"
          );
          setEmployees(filteredApplications);
        } else {
          //toast.error(json.message || "Failed to fetch employees");
        }
      } catch (error) {
        toast.error("Error fetching employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-6 my-5 bg-white min-h-screen shadow-lg rounded-lg w-full">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        Accepted Applicants
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : employees.length === 0 ? (
        <div>No employees found</div>
      ) : (
        employees &&
        employees.map((employee, index) => (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6" key={index}>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <img
                src={
                  employee.profile
                    ? `${server}${employee.profile.replace("./", "/")}`
                    : defaultProfilePhoto
                }
                alt="Profile"
                className="rounded-full h-12 w-12 mr-4 mb-4 md:mb-0"
              />
              <div>
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p className="text-gray-600">{employee.email}</p>
                <p className="text-gray-600">Job: {employee.job.title}</p>
                <p className="text-gray-600">
                  Date of Joining:{" "}
                  {new Date(employee.dateOfJoining).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Date of Application:{" "}
                  {new Date(employee.dateOfApplication).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Accordion employee={employee} />
          </div>
        ))
      )}
    </div>
  );
};

const Accordion = ({ employee }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const formatText = (text) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const urlRegex = /(?:https?|ftp):\/\/[\S]+/g;

    return text.split("\n").map((line, index) => {
      const emailReplaced = line.replace(
        emailRegex,
        (match) =>
          `<a href="mailto:${match}" className="text-blue-700 underline">${match}</a>`
      );

      const urlReplaced = emailReplaced.replace(
        urlRegex,
        (match) =>
          `<a href="${match}" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">${match}</a>`
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

  return (
    <div className="border-t border-gray-200 mt-4">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-semibold text-gray-800">
          Proposal Documents
        </span>
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
            {new Date(employee.dateOfApplication).toLocaleDateString()}
          </div>
          <div className="text-gray-600 mb-4">
            <strong className="mr-2">Statement of Purpose</strong>
            <br />
            {formatText(employee.sop)}
          </div>
          <div className="text-gray-600 mb-2">
            <p className="text-lg text-gray-700 mt-1 flex items-center">
              <FaFileAlt className="mr-2" />
              Resume:
              <a
                href={`${server}${employee.resume.replace("./", "/")}`}
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

export default EmployeePage;
