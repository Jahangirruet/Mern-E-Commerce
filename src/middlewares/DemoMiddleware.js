import express from "express";
import { DemoUtility } from "../utility/DemoUtility.js";

export const DemoMiddleware = (req, res, next) => {
    let data = DemoUtility();
    console.log("demo middleware connected");
    next();
}

export default DemoMiddleware

// 