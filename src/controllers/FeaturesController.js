import express from "express";

import { FeaturesServices,LegalDetailsServices } from "../services/FeaturesServices.js";

export const FeaturesController = async (req, res) => {
  let data = await LegalDetailsServices();
  return res.json(data);
};

export const LegalDetails = async (req, res) => {
  let result = await LegalDetailsServices(req);
   return res.json(result);
};
