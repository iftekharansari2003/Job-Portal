import jwt from 'jsonwebtoken'
import Company from '../Models/company.js'

export const protectCompany = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.json({
            success: false,
            message: 'Not Authorized, Login Again'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.company = await Company.findById(decoded.id).select('-password');

        next();

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
