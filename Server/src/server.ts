import express , {Express} from "express";
import "dotenv/config";
import connectDb from "../config/db";
import session, { SessionOptions,MemoryStore,SessionData } from "express-session"
import {studentRouter} from "./routes/studentRouter/studentRouter";
import {tutorRouter} from "./routes/tutorRouter/tutorRouter";
import { adminRouter } from "./routes/adminRouter/adminRouter";

import cors from "cors";
import nocache from "nocache";
import path from "path";
import morgan from 'morgan'

const app:Express = express()
const port:number = Number(process.env.PORT)


const store = new MemoryStore();
declare module 'express-session'{
    interface Session {
        otp: number | null;
        student: {
            studentname: string;
            studentemail: string;
            phone: string;
            password: string;
        }; 
        tutor: {
            tutorname: string;
            tutoremail: string;
            phone: string;
            password: string;
        };
       
    }
}

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 60 * 1000,
    },
    store: store,
} as SessionOptions)
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

app.use(nocache());
app.use(morgan('tiny'));
connectDb.connect();

app.use('/student', studentRouter);
app.use('/tutor', tutorRouter);
app.use('/admin', adminRouter);



app.listen(port,()=>console.log(`server is ruunig at port ${port}`))