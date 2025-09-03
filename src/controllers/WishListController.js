import { SaveWishListServices,RemoveWishListServices, WishListServices } from "../services/WishListServices.js";


export const SaveWishList = async (req, res) => {
    let data = await SaveWishListServices(req);
    return res.status(200).json(data);
}

export const RemoveWishList = async (req, res) => {
    let data = await RemoveWishListServices(req);
    return res.status(200).json(data);
}

export const WishList = async (req, res) => {
    let data = await WishListServices(req);
    return res.status(200).json(data);
}

