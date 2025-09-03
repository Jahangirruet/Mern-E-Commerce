import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            unique: true,
            required: true,
        },
        categoryImage: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const CategoryModel = mongoose.model("categories", DataSchema);

export default CategoryModel;