import {
  CartListService,
  SaveCartListService,
  UpdateCartListService,
  RemoveCartListService,
} from "../services/CartListServices.js";

export const CartList = async (req, res) => {
  let data = await CartListService(req);
  return res.json(data);
};

export const SaveCartList = async (req, res) => {
  let data = await SaveCartListService(req);
  return res.json(data);
};

export const UpdateCartList = async (req, res) => {
  let data = await UpdateCartListService(req);
  return res.json(data);
};

export const RemoveCartList = async (req, res) => {
  let data = await RemoveCartListService(req);
  return res.json(data);
};

export default CartList;
