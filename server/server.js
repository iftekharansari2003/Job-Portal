
import './Config/instrument.js'
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import ConnectDb from './Config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './Controller/webhooks.js';
import connectCloudinary from './Config/cloudinary.js';
import companyRoutes from './Routes/companyRoutes.js'
import jobRoutes from './Routes/jobRoutes.js'
import userRoute from './Routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'

// Initialize Express
const app = express();

//Connect To DB
await ConnectDb();
await connectCloudinary();

//Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())


//Routes
app.get('/', (req, res) => {
  res.send("API Working")
})
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoute)

// Port
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);

})