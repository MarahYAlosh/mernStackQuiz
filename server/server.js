import express from "express";import morgan from "morgan";
import cors from "cors";import { config } from "dotenv";
import router from "./router/route.js";import connect from "./database/conn.js";
import cookieParser from "cookie-parser";import userSchema from "./models/userSchema.js";
import bcrypt from "bcryptjs";import jwt from "jsonwebtoken";
import path from "path";import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);console.log(__dirname);
const app = express();

app.use(morgan("tiny"));app.use(
  cors({    origin: [ "https://mernstackquiz-8.onrender.com" , "http://localhost:3000"],
    methods: ["GET", "POST"],    credentials: true, // للسماح بإرسال الكوكيز
  }));
app.use(express.json());app.use(cookieParser());
config();
app.use("/api", router);
const verifyStudent = (req, res, next) => {  const token = req.cookies.token;
  if (!token) {
    return res.json("missing Token");
  } else {    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {        return res.json("Error with Token");
      } else {        if (decoded.role === "student") {
          next();        } else {
          return res.json("not student");        }
      }    });
  }};
app.get("/getName", (req, res) => {
  userSchema    .find()
    .then((users) => res.json(users))    .catch((err) => res.json(err));
});
app.get("/", verifyStudent, (req, res) => {  try {
    res.json("Success");    res.header({});
  } catch (error) {    res.json(error);
  }});

connect()  .then(() => {
    try {      app.listen(process.env.PORT, () => {
        console.log("server connected");        console.log(process.env.PORT);
      });    } catch (error) {
      console.log(error);    }
  })  .catch((error) => console.log(error));
const verifyTeacher = (req, res, next) => {
  const token = req.cookies.token;  if (token) {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {      if (err) {
        return res.json("Error with Token");      } else {
        if (decoded.role === "admin") {          next();
        } else {          return res.json("not admin");
        }      }
    });  } else {
    return res.json("missing Token");  }
};
app.get("/teacher", verifyTeacher, (req, res) => {
  res.json("Success");});
app.post("/addTeacher", (req, res) => {
  const { name, email, password } = req.body;  bcrypt
    .hash(password, 10)    .then((hash) => {
      userSchema
        .create({ name, email, password: hash, role: "admin" })        .then((user) => {
          res.json("Success");        })
        .catch((err) => res.json(err));    })
    .catch((err) => res.json(err));});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;  bcrypt
    .hash(password, 10)    .then((hash) => {
      userSchema        .create({ name, email, password: hash })
        .then((user) => {          res.json("Success");
        })        .catch((err) => res.json(err));
    })    .catch((err) => res.json(err));
});
app.post("/login", (req, res) => {  const { email, password } = req.body;
  userSchema.findOne({ email: email }).then((user) => {    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {        if (response) {
          const token = jwt.sign(            { email: user.email, role: user.role },
            "jwt-secret-key",            { expiresIn: "1d" }
          );
          // طبع التوكن عشان تتأكد إنه بيتولد صح          console.log(token);
          // إرسال الكوكي مع الإعدادات الصحيحة
          res.cookie("token", token, {            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // secure فقط في حالة الإنتاج            sameSite: "None", // مطلوب لتفعيل cross-site usage
          });
          // طبع الكوكيز لتأكيد إرسال التوكن          console.log(req.cookies);
          res.json({ status: "Success", role: user.role, token: token });
        } else {          res.json("password incorrect");
        }      });
    } else {      return res.json("No Record Exist");
    }  });
});
