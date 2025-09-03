import express from "express";

import {DemoServices} from "../services/DemoServices.js"

export const demo = async (req, res) => {
   let data = await DemoServices();
   console.log("democontroller connected");
   return res.status(200).json(data);
}

