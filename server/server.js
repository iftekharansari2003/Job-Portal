
import './Config/instrument.js'
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import ConnectDb from './Config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './Controller/webhooks.js';

// Initialize Express
const app =express();

//Connect To DB
await ConnectDb();

//Middleware
app.use(cors());
app.use(express.json());


//Routes
app.get('/',(req,res)=>{
    res.send("API Working")
})
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)

// Port
const PORT=process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);  

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    
})