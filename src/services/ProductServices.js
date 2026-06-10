import express from "express";
import BrandModel from "../models/BrandModel.js";
import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";
import ProductSliderModel from "../models/ProductSliderModel.js";
import ProductDetailModel from "../models/ProductDetailsModel.js";
//import ProductReviewModel from '../models/ReviewModel.js';
import ReviewModel from "../models/ReviewModel.js";

import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;
//import

export const BrandListService = async (req) => {
  try {
    let data = await BrandModel.find({});
    return {
      status: "success",
      message: "BrandListService connected",
      data: data,
    };
  } catch (error) {
    return { status: "error", message: "BrandListService error", error: error.message };
  }
};
export const CategoryListService = async (req) => {
  try {
    let data = await CategoryModel.find({});
    return {
      status: "success",
      message: "CategoryListService connected",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "CategoryListService error",
      error: error,
    };
  }
};
export const SliderListService = async (req) => {
  let data = await ProductSliderModel.find({});
  return {
    status: "success",
    message: "SliderListService connected",
    data: data,
  };
};

//--------

export const ListByBrandService = async (req) => {
  try {
    let BrandID = new ObjectID(req.params.BrandID);
    let MatchStage = { $match: { brandID: BrandID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBranStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBranStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    console.log(data);
    return {
      status: "success",
      message: "ListByBrandService connected",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "ListByBrandService error",
      error: error.message,
    };
  }
};

export const ListByCatagoryService = async (req) => {
  try {
    let CategoryID = new ObjectID(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBranStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBranStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return {
      status: "success",
      message: "ListByBrandService connected",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "ListByBrandService error",
      error: error.message,
    };
  }
};

export const ListByRemarkService = async (req) => {
  try {
    let Remark = req.params.Remark;
    let MatchStage = { $match: { remark: Remark } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBranStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBranStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return {
      status: "success",
      message: "ListByRemarkService connected",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "ListByRemarkService error",
      error: error.message,
    };
  }
};

//--------

export const ListBySimilierService = async (req) => {
  try {
    let CategoryID = new ObjectID(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let limitStage = { $limit: 10 };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBranStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      limitStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBranStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return {
      status: "success",
      message: "ListBySimilerService connected",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "ListBySimilerService error",
      error: error.message,
    };
  }
};

export const ListByFilterService = async (req) => {
  try {
    let matchCondition = {};

    if (req.body['categoryID']){
      matchCondition.categoryID = new ObjectID(req.body['categoryID']);
    }

    if (req.body['brandID']){
      matchCondition.brandID = new ObjectID(req.body['brandID']);
    }

    let MatchStage = { $match: matchCondition };

    let AddFieldsStage = {
      $addFields: {
        numericPrice:{$toInt:"$price"}
    }
  }
  let priceMin = parseInt(req.body['priceMin']);
  let priceMax = parseInt(req.body['priceMax']);

  let PriceMatchConditions = {};

  if (!isNaN(priceMin)){
    PriceMatchConditions['numericPrice']={$gte:priceMin};
  }

  
  if (!isNaN(priceMax)){
    PriceMatchConditions['numericPrice']={...PriceMatchConditions['numericPrice'],$lte:priceMax};
  }

  let PriceMatchStage = {$match:PriceMatchConditions};
  let JoinWithBrandStage = {
      $lookup: {from: "brands",
      localField: "brandID",
      foreignField: "_id",
      as: "brand",
      },
  };
  let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
  };
  let UnwindBranStage = {$unwind:"$brand"};
  let UnwindCategoryStage = {$unwind:"$category"};
  let ProjectionStage = {
    $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
 
      },
  };

  let data = await ProductModel.aggregate([
    MatchStage,
    AddFieldsStage,
    PriceMatchStage,
    JoinWithBrandStage,
    JoinWithCategoryStage,
    UnwindBranStage,
    UnwindCategoryStage,
    ProjectionStage,
  ]);

  return {
    status: "success",
    message: "ListByFilterService connected",
    data: data,
  };

  } catch (error) {
    return {
      status: "error",
      message: "ListByFilterService error",
      error: error.message,
    };
  }
}

export const DetailsService = async (req) => {
  try {
    let ProductID = new ObjectID(req.params.ProductID);
    let MatchStage = { $match: { _id: ProductID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let JoinWithDetailsStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };

    let UnwindBranStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let UnwindDetailsStage = { $unwind: "$details" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      JoinWithDetailsStage,
      UnwindBranStage,
      UnwindCategoryStage,
      ProjectionStage,
      UnwindDetailsStage,
    ]);

    return {
      status: "success",
      message: "ListByDetailsService connected",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "ListByDetailsService error",
      error: error.message,
    };
  }
};

export const ListByKeywordService = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.Keyword, $options: "i" };
    let Searchparams = [{ title: SearchRegex }, { shortDes: SearchRegex }];
    let SearchQuery = { $or: Searchparams };

    let MatchStage = { $match: SearchQuery };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBranStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      //SearchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBranStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return {
      status: "success",
      message: "ListByKeywordService connected",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "ListByKeywordService error",
      error: error.message,
    };
  }
};

export const ReviewListService = async (req) => {
  try {
    let ProductID = new ObjectID(req.params.ProductID);
    let MatchStage = { $match: { productID: ProductID } };

    let JoinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };

    let UnwindProfileStage = { $unwind: "$profile" };



    let ProjectionStage = {
      $project: {
        des: 1,
        rating: 1,
        "profile.cus_name": 1,
      },
    };
    let data = await ReviewModel.aggregate([
      MatchStage,
      JoinWithProfileStage,
       UnwindProfileStage,
      ProjectionStage,
    ]);

    return {
      status: "success",
      message: "ReviewListService connected...",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "ReviewListService error",
      error: error.message,
    };
  }
};

export const CreateReviewService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;

    let data = await ReviewModel.create({
      productID: reqBody["productID"],
      userID: user_id,
      des: reqBody["des"],
      rating: reqBody["rating"],
    });

    return {
      status: "success",
      message: "CreateReviewService connected",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "CreateReviewService error",
      error: error.message,
    };
  }
};

export default {
  BrandListService,
  CategoryListService,
  SliderListService,
  ListByBrandService,
  ListByCatagoryService,
  ListByFilterService,
  DetailsService,
  ListByKeywordService,
  ListBySimilierService,
  ReviewListService,
  ListByRemarkService,
  CreateReviewService,
};
