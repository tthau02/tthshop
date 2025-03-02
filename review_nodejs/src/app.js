import exxpress from 'express';
import mongoose, { connect } from 'mongoose';
import productRoter from './routers/product.js';
import authRoter from './routers/auth.js';
import categoryRoter from './routers/category.js';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors"; 

const app = exxpress();
dotenv.config();

app.use(exxpress.json());
app.use(morgan("tiny"));
app.use(cors());

function connectDB() {
try {
    mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
    console.log("Ket noi thanh cong");
} catch (error) {
    console.log(error);
}}

connectDB();

app.use('/api', productRoter);
app.use('/api', authRoter);
app.use('/api', categoryRoter);

export const viteNodeApp = app;