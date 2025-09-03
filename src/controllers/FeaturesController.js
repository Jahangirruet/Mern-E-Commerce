import express from "express";

import { FeaturesServices } from "../services/FeaturesServices.js";

export const FeaturesController = async (req, res) => {
  let data = await FeaturesServices();
  console.log("FeaturesServices connected");
  return res.json(data);
};
