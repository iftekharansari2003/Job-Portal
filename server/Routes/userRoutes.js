import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../Controller/userController.js'
import upload from '../Config/multer.js';

const router = express.Router()

//Get User Data
router.get('/', getUserData);

//Apply for a job
router.post('/apply', applyForJob)

//Get applied job  data
router.get('/application', getUserJobApplication)

//Update User Profile(Resume)
router.post('/update-resume', upload.single('resume'), updateUserResume);

export default router;

