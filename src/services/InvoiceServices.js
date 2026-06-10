import express from "express";
import InvoiceModel from "../models/InvoiceModel.js";
import CartModel from "../models/CartModel.js";
import ProfileModel from "../models/ProfileModel.js";
import InvoiceProductsModel from "../models/InvoicePorductsModel.js";
import PaymentSettingModel from "../models/PaymentSettingModel.js";
import FormData from "form-data";
import axios from "axios";
import mongoose from "mongoose";
let ObjectID = mongoose.Types.ObjectId;

export const CreateInvoiceService = async (req, res) => {
  try {
    //==========================Step 01: Total Payable and vat============================//

    let user_id = new ObjectID(req.headers.user_id);
    let cus_email = new ObjectID(req.headers.email_id);
    let MatchStage = { $match: { userID: user_id } };

    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };

    let unwindStage = { $unwind: "$product" };
    let CartProducts = await CartModel.aggregate([
      MatchStage,
      JoinStageProduct,
      unwindStage,
    ]);

    let TotalAmmount = 0;
    CartProducts.forEach((element) => {
      let price = 0;
      if (element["product"]["discount"]) {
        price = parseFloat(element["product"]["discountPrice"]);
      } else price = parseFloat(element["product"]["price"]);
      TotalAmmount = TotalAmmount + price * parseFloat(element["qty"]);
    });
    let vat = TotalAmmount * 0.033;
    let payable = TotalAmmount + vat;

    //==========================Step 02: Prepeare Customer Details and Shipping Details============================//

    let Profile = await ProfileModel.aggregate([MatchStage]);
    let cus_details = `name:${Profile[0]["cus_name"]},email:${Profile[0][cus_email]},phone:${Profile[0]["cus_phone"]},address:${Profile[0]["cus_address"]}`;
    let shipping_details = `name:${Profile[0]["ship_name"]},city:${Profile[0]["ship_city"]},phone:${Profile[0]["ship_phone"]},postcode:${Profile[0]["ship_postcode"]},state:${Profile[0]["ship_state"]}`;

    //==========================Step 03: Transactions and other ID ============================//
    let tran_id = Math.floor(Math.random() * 1000000);
    let val_id = 0;
    let payment_status = "pending";
    let delivery_status = "pending";
    //==========================Step 04: Create Invocie============================//

    let createInvoice = await InvoiceModel.create({
      userID: user_id,
      payable: payable,
      cus_details: cus_details,
      ship_details: shipping_details,
      tran_id: tran_id,
      val_id: val_id,
      payment_status: payment_status,
      delivery_status: delivery_status,
      total: TotalAmmount,
      vat: vat,
    });

    //==========================Step 05: Create invoice Product ============================//

    let invoice_id = createInvoice["_id"];
    CartProducts.forEach(async (element) => {
      await InvoiceProductsModel.create({
        userID: user_id,
        productID: element["productID"],
        invoiceID: invoice_id,
        qty: element["qty"],
        price: element["product"]["price"]
          ? element["product"]["discountPrice"]
          : element["product"]["price"],
        color: element["color"],
        size: element["size"],
      });
    });

    //==========================Step 06: remove cart ============================//

    await CartModel.deleteMany({ userID: user_id });
    //==========================step 07: payment setting ============================//

    let paymentSetting = await PaymentSettingModel.find();
    const form = new FormData();
    form.append("store_id", paymentSetting[0]["store_id"]);
    form.append("store_passwd", paymentSetting[0]["store_passwd"]);
    form.append("total_amount", payable);
    form.append("currency", paymentSetting[0]["currency"]);
    form.append("tran_id", tran_id);
    form.append(
      "success_url",
      `${paymentSetting[0]["success_url"]}/${tran_id}`
    );
    form.append("fail_url", `${paymentSetting[0]["fail_url"]}/${tran_id}`);
    form.append("cancel_url", `${paymentSetting[0]["cancel_url"]}/${tran_id}`);
    form.append("ipn_url", `${paymentSetting[0]["ipn_url"]}/${tran_id}`);

    form.append("cus_name", Profile[0]["cus_name"]);
    form.append("cus_email", Profile[0]["npm i form-data"]);
    form.append("cus_add1", Profile[0]["cus_address"]);
    form.append("cus_add2", Profile[0]["cus_address"]);
    form.append("cus_city", Profile[0]["cus_city"]);
    form.append("cus_state", Profile[0]["cus_state"]);
    form.append("cus_postcode", Profile[0]["cus_postcode"]);
    form.append("cus_country", Profile[0]["cus_country"]);
    form.append("cus_phone", Profile[0]["cus_phone"]);
    form.append("cus_fax", Profile[0]["cus_fax"]);

    form.append("shipping_method", "YES");
    form.append("ship_name", Profile[0]["ship_name"]);
    form.append("ship_add1", Profile[0]["ship_address"]);
    form.append("ship_add2", Profile[0]["ship_address"]);
    form.append("ship_city", Profile[0]["ship_city"]);
    form.append("ship_state", Profile[0]["ship_state"]);
    form.append("ship_postcode", Profile[0]["ship_postcode"]);
    form.append("ship_country", Profile[0]["ship_country"]);
    //form.append("ship_phone", Profile[0]['ship_phone']);

    form.append("product_name", "according invocie");
    form.append("product_category", "according invocie");
    form.append("product_profile", "according invocie");
    form.append("product_amount", "according invocie");

    let SSLRes = await axios.post(paymentSetting[0]["init_url"], form);

    return {
      status: "success",
      message: "CreateInvoiceService connected",
      data: SSLRes.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "CreateInvoiceService error",
      error: error.message,
    };
  }
};
export const PaymentFailService = async (req, res) => {
  try {
    let trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { $set: { payment_status: "failed" } }
    );
    return { status: "success", message: "payment failed" };
  } catch (error) {
    return { status: "errors", message: error.message };
  }
};

export const PaymentCancelService = async (req, res) => {
  try {
    let trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { $set: { payment_status: "cancelled" } }
    );
    return { status: "success", message: "payment cancelled" };
  } catch (error) {
    return { status: "errors", message: error.message };
  }
};

export const PaymentIPNService = async (req, res) => {
  try {
    let trxID = req.params.trxID;
    let status = req.body['status'];
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      {payment_status: status }
    )
    return { "status": "success" };
  } catch (error) {
    return { "status": "fail" };
  }
};

export const PaymentSuccessService = async (req, res) => {
  try {
    let trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "success" }
    );
    return { status: "successssss" };
  } catch (error) {
    return { status: "fail" };
  }
};

export const InvoiceListService = async (req, res) => {
try {
    let user_id = req.headers.user_id;
    let data = await InvoiceModel.find({ userID: user_id });
    return { status: "success", message: "Invoice List", data: data };
} catch (error) {
    return { status: "errors", message: error.message };
}
};

export const InvoiceProductListService = async (req, res) => {
    try {
        let user_id = new ObjectID(req.headers.user_id);
        let invoice_id = new ObjectID(req.params.invoice_id);
        let MatchStage = { $match: { userID: user_id, invoiceID: invoice_id } };
        let LookupStage = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } };
        let UnwindProductStage = { $unwind: "$product" };
        let data = await InvoiceProductsModel.aggregate([MatchStage, LookupStage, UnwindProductStage]);
        return { status: "successfull", data: data };
    } catch (error) {
        return { status: "errors", message: error.message };
    }
}
