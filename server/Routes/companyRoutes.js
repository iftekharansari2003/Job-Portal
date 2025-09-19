import { registerCompany, loginCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs, changeJobApplicationStatus, changeVisibility } from "../Controller/companyController.js";
import express from 'express';
import upload from "../Config/multer.js";
import { protectCompany } from "../Middleware/authMiddleware.js";

const router = express.Router();

//Register a company
router.post('/register', upload.single('image'), registerCompany)

//Company login
router.post('/login', loginCompany)

//Get Company Data
router.get('/company', protectCompany, getCompanyData)

//Post a Job
router.post('/post-job', protectCompany, postJob)

//Get Applicant Data of company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

//Get Company Job List
router.get('/list-job', protectCompany, getCompanyPostedJobs)

//Change application status
router.post('/change-status', protectCompany, changeJobApplicationStatus)

//Change Application Visibility
router.post('/change-visibility', protectCompany, changeVisibility)

export default router;