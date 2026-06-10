import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }
);

const UserModelPassword = mongoose.model("userspassword", DataSchema);

export default UserModelPassword;