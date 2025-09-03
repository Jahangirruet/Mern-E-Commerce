import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
    {
        title: { type: String,required: true,},
        description: {type: String,required: true},
        img: {type: String},
        codelink: {type: String},
        livelink: {type: String},
        user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
        
    },
    { timestamps: true, versionKey: false }
);

const PortfilioModel = mongoose.model("portfolio", DataSchema);

export default PortfilioModel;