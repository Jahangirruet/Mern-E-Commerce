import express from "express";

import mongoose from "mongoose";

import FeaturesModel from "../models/FeaturesModel.js";
import LegalModel from "../models/LegalModel.js";



export const FeaturesServices = async(req, res) => {
  try {
    let data = await FeaturesModel.find({});
    return {
      status: "success",
      message: "FeaturesServices connected",
      data: data,
    };
  } catch (error) {
    return { status: "error", message: "BrandListService error", error: error };
  }
};


export const LegalDetailsServices = async (req) => {
  try {
    let type = req.params.type;
    let data = await LegalModel.find({type:type});
    return {
      status: "success",
      message: "LegalDetailsServices connected",
      data: data,
    };
  } catch (error) {
    return { status: "error", message: "LegalDetailsServices error", error: error.message };
  }
}


export default {FeaturesServices,LegalDetailsServices};