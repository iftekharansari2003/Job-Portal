import Company from "../Models/company.js";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../Utils/generateToken.js";
import Job from "../Models/Job.js";
import JobApplication from "../Models/JobApplication.js";


//Register a new Company
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing Details" })
    }

    try {
        const companyExists = await Company.findOne({ email })

        if (companyExists) {
            return res.json({ success: false, message: "Company Already Registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company.id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

//Company Login
export const loginCompany = async (req, res) => {
    const { email, password } = req.body
    try {
        const company = await Company.findOne({ email });

        if (await bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                message:"Login Successfully",
                company: {
                    _id: company.id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        } else {
            res.json({
                success: false,
                message: "Invalid email or Password"
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Get company data
export const getCompanyData = async (req, res) => {

    try {
        const company = req.company

        res.json({
            success: true,
            company
        })

    } catch (error) {
        res.json({
            success: true,
            message: error.message
        })
    }

}

//Post a new Job
export const postJob = async (req, res) => {

    const { title, description, location, salary, level, category } = req.body

    const companyId = req.company._id;

    try {

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })

        await newJob.save();

        res.json({
            success: true,
            message:"Job Added Successfully",
            newJob
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }



}

//Get company Job Applicant
export const getCompanyJobApplicants = async (req, res) => {
    try {
        const companyId = req.company._id

        //Find job application for the user and populate related data
        const applications = await JobApplication.find({ companyId })
            .populate('userId', 'name image resume')
            .populate('jobId', 'title location category level salary').exec()

        return res.json({
            success: true,
            applications
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Get Company posted Job
export const getCompanyPostedJobs = async (req, res) => {
    try {

        const companyId = req.company._id
        const jobs = await Job.find({ companyId })

        //Adding No. of Applicants in data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id })
            return { ...job.toObject(), applicants: applicants.length }
        }))


        res.json({
            success: true,
            jobsData
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Change job Application Status
export const changeJobApplicationStatus = async (req, res) => {
    try {
        const { id, status } = req.body
        //find job applocation data and update status
        await JobApplication.findOneAndUpdate({ _id: id }, { status })
        res.json({
            success: true,
            message: 'Status Changed'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Change job Visibility

export const changeVisibility = async (req, res) => {
    try {

        const { id } = req.body
        const companyId = req.company._id

        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }

        await job.save()

        res.json({
            success: true,
            job
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}