import express from 'express'
import { getJobById, getJobs } from '../Controller/jobController.js'

const router = express.Router();

//Route to get all jobs data
router.get('/', getJobs)

//Route to get a single job by Id
router.get('/:id', getJobById)

export default router;