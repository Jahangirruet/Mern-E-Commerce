import { BrandListService } from "../services/ProductServices.js";
import { CategoryListService } from "../services/ProductServices.js";
import { SliderListService } from "../services/ProductServices.js";
import { ListByBrandService } from "../services/ProductServices.js";
import { ListByCatagoryService } from "../services/ProductServices.js";
import { ListBySimilierService } from "../services/ProductServices.js";
import { ListByKeywordService } from "../services/ProductServices.js";
import { ListByRemarkService } from "../services/ProductServices.js";
import { DetailsService } from "../services/ProductServices.js";
import { ReviewListService } from "../services/ProductServices.js";
import { CreateReviewService } from "../services/ProductServices.js";
import { ListByFilterService } from "../services/ProductServices.js";

export const ProductBrandList = async (req, res) => {
  let data = await BrandListService(req);
  return res.status(200).json(data);
};

export const ProductCategoryList = async (req, res) => {
  let data = await CategoryListService(req);
  return res.status(200).json(data);
};

export const ProductSliderList = async (req, res) => {
  let data = await SliderListService(req);
  return res.status(200).json(data);
};

export const ProductListByBrand = async (req, res) => {
  let data = await ListByBrandService(req);
  return res.status(200).json(data);
};

export const ProductListByCatagory = async (req, res) => {
  let data = await ListByCatagoryService(req);
  return res.status(200).json(data);
};

export const ProductListBySimilier = async (req, res) => {
  let data = await ListBySimilierService(req);
  return res.status(200).json(data);
};

export const ProductListByKeyword = async (req, res) => {
  let data = await ListByKeywordService(req);
  return res.status(200).json(data);
};

export const ProductListByRemark = async function (req, res) {
  let data = await ListByRemarkService(req);
  return res.status(200).json(data);
};

export const ProductDetails = async function (req, res) {
  let data = await DetailsService(req);
  return res.status(200).json(data);
};

export const ProductReviewList = async function (req, res) {
  let data = await ReviewListService(req);
  return res.status(200).json(data);
};

export const CreateReview = async function (req, res) {
  let data = await CreateReviewService(req);
  return res.status(200).json(data);
};

export const ProductListByFilter = async function (req, res) {
  let data = await ListByFilterService(req);
  return res.status(200).json(data);
}
