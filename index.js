import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roleRoute from "./routes/role.js";

import uploadFile from "./routes/upload.js";

import products from "./routes/products.js";
import category from "./routes/category.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import session  from "express-session";



const app = express();
dotenv.config();

const connect = async () => {
  try {
   // console.log("process.env.JWT",process.env.JWT)
    //await mongoose.connect("mongodb://localhost:27017/nodejs-React");
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: true,
}));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/role", roleRoute);
app.use("/api/Products", products);
app.use("/api/category", category);


app.use("/api",uploadFile)


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  connect();
  console.log("Connected to backend", +port);
});
