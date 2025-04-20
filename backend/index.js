import express from "express";
import bodyParser from "body-parser";
import cors  from 'cors';
// import userRoute from "./routes/userRoute.js"
// import todoRoute from './routes/taskRoute.js'
import authRoute from "./routes/authRoute.js";

import sequelize from "./config/db.js";

import dotenv from "dotenv"; //imp
import { verifyToken } from "./utils/tokenMiddleware.js";
dotenv.config(); //imp

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(express.json()); //imp
app.use(verifyToken); //imp

app.use('/api', authRoute); //imp

// app.use("/api", userRoute)
// app.use("/tasks", todoRoute)


sequelize.sync()
.then(()=>{
    console.log("Mysql Connected")
})
.catch((err)=>{
    console.log("Error ", err)
})


const port =8085
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});






