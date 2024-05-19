export const server = "https://navjobs-backend.onrender.com";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  verifyotp: `${server}/auth/verifyotp`,
  sendotp: `${server}/auth/sendotp`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
};

export default apiList;
