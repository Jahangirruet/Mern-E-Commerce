import mongoose, { mongo } from "mongoose";
import WishListModel from "../models/WishListModel.js";

let ObjectID = mongoose.Types.ObjectId;
export const SaveWishListServices = async (req, res) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await WishListModel.updateOne(reqBody,{$set:reqBody},{upsert:true});
        return { status: "success", message: "wishlist save" };
    } catch (error) {
        return { status: "errors", message: error.message };
    }
}

export const RemoveWishListServices = async (req, res) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await WishListModel.deleteOne(reqBody);
        return { status: "success", message: "wishlist remove" };
    } catch (error) {
        return { status: "errorssss", message: error.message };
    }
}

export const WishListServices = async (req, res) => {
    try {
        let use_id =new ObjectID(req.headers.user_id); // req.headers.user_id;
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
            '_id': 0,
            'userID': 0,
            "createdAt": 0,
            "updatedAt": 0,
            'product._id': 0,
            'product.categoryID': 0,
            'product.brandID': 0,
            'brand._id': 0,
            'category._id': 0
        },
    };


        let data = await WishListModel.aggregate([
            matchStage, 
            JoinWithProductStage, UnwindProductStage,
            JoinWithBrand,UnwindBrandStage,JoinWithCategory,UnwindCategoryStage,
            ProjectionStage
        ]);

        return { status: "success", data: data };
    } catch (error) {
        return { status: "errors", message: error.message };
    }
}