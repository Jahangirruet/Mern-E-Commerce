import CartModel from "../models/CartModel.js";

import mongoose from "mongoose";

let ObjectID = mongoose.Types.ObjectId;

export const CartListService = async (req, res) => {
  try {
    let use_id = new ObjectID(req.headers.user_id); // req.headers.user_id;
    let matchStage = { $match: { userID: use_id } };

    let JoinWithProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let UnwindProductStage = { $unwind: "$product" };

    let JoinWithBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };

    let JoinWithCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    //let data = await CartModel.find();
    let data = await CartModel.aggregate([
      matchStage,
      JoinWithProductStage,
      UnwindProductStage,
      JoinWithBrand,
      UnwindBrandStage,
      JoinWithCategory,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return {
      status: "success",
      message: "CartListService connected",
      data: data,
    };
  } catch (error) {
    return { status: "errors", message: error.message };
  }
};

export const SaveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.create(reqBody);
    return { status: "success", message: "Cart save" };
  } catch (error) {
    return { status: "errors...", message: error.message };
  }
};

export const UpdateCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let cartID = req.params.cartID;
    let reqBody = req.body;

    let data = await CartModel.updateOne(
      { _id: cartID, userID: user_id },
      { $set: reqBody }
    );

    return {
      status: "success",
      message: "Cart update",
      cartID: cartID,

    };
  } catch (error) {
    return { status: "errors", message: error.message };
  }
};

export const RemoveCartListService = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.deleteOne(reqBody);
    return { status: "success", message: "Cart remove" };
  } catch (error) {
    return { status: "errors", message: error.message };
  }
};

export default CartListService;
