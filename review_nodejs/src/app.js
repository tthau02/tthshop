import exxpress from 'express';
import mongoose, { connect } from 'mongoose';
import productRoter from './routers/product.js';
import authRoter from './routers/auth.js';
import dotenv from "dotenv";

const app = exxpress();
dotenv.config();
app.use(exxpress.json());


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

export const viteNodeApp = app;