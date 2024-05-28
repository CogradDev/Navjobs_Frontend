export const server = "http://localhost:4444";
// export const server = "https://navjobs-backend.onrender.com";

const apiList = {
    login: `${server}/auth/login`,
    sendotp: `${server}/auth/sendotp`,
    signup: `${server}/auth/signup`,
    sendotp: `${server}/auth/sendotp`,
    resendotp : `${server}/auth/resendotp`,
    verifyotp: `${server}/auth/verifyotp`,
    uploadResume: `${server}/upload/resume`,
    uploadProfileImage: `${server}/upload/profile`,
    jobs: `${server}/api/jobs`,
    applications: `${server}/api/applications`,
    rating: `${server}/api/rating`,
    user: `${server}/api/user`,
    applicants: `${server}/api/applicants`,
};

export default apiList;