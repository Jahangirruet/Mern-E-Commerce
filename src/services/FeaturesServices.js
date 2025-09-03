import express from "express";

import mongoose from "mongoose";

import FeaturesModel from "../models/FeaturesModel.js";



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

export default FeaturesServices;