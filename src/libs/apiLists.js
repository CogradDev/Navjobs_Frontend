export const server = "https://navjobs-backend.onrender.com";
// export const server = "http://localhost:8000";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  verifyotp: `${server}/auth/verifyotp`,
  sendotp: `${server}/auth/sendotp`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  recruiterJobs : `${server}/api/jobs/recruiter`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
};

export default apiList;
