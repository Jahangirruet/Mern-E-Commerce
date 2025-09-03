import express from "express";
import {
  CreateInvoiceService,
  PaymentFailService,
  PaymentCancelService,
  PaymentSuccessService,
  PaymentIPNService,
  InvoiceListService,
  InvoiceProductListService
} from "../services/InvoiceServices.js";

export const CreateInvoice = async(req, res) => {


try {
    //let data = CreateInvoiceService(req,res);
    //return res.status(200).json({ status: "success" , data: data});
    let data = await CreateInvoiceService(req);
        return res.json(data);
    
} catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
}
};

export const InvoiceList =async (req, res) => {
  try {
    let data = await InvoiceListService(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const InvoiceProductList =async (req, res) => {
  try {
    let data = await InvoiceProductListService(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const PaymentSuccess = async (req, res) => {
  try {
    let data = await PaymentSuccessService(req);

        return res.status(200).json(data);
  } catch (error) {
     //return res.json(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const PaymentCancel = async (req, res) => {
  try {
    let data =await PaymentCancelService(req);
    return res.json(data);
  } catch (error) {
         //return res.json(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const PaymentFail = async(req, res) => {
  try {
    let data =await PaymentFailService(req);
    return res.json(data);
  } catch (error) {
        // return res.json(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const PaymentIPN =async (req, res) => {
  try {
    let data = await PaymentIPNService(req);
    return res.json(data);
  } catch (error) {}
};

export const PaymentPending = async(req, res) => {
  try {
    let data =await PaymentIPNService(req);
    return res.json(data);
  } catch (error) {
        // return res.json(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

