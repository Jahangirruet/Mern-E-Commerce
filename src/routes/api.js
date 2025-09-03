import express from 'express';
export const router = express.Router();
console.log("api connected");


import * as ProductController from "../controllers/ProductController.js";
import * as UserController from '../controllers/UserController.js';
import * as WishlistController from '../controllers/WishListController.js';
import * as CartListController from '../controllers/CartListController.js';
import * as InvoiceController from '../controllers/InvoiceController.js';
import * as FeaturesController from '../controllers/FeaturesController.js';
import AuthVerification from '../middlewares/AuthVerification.js';


// Products

router.get('/ProductBrandList',ProductController.ProductBrandList)
router.get('/ProductCategoryList',ProductController.ProductCategoryList)
router.get('/ProductSliderList',ProductController.ProductSliderList)
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID',ProductController.ProductListByCatagory)
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark)

router.get('/ProductListBySimilier/:CategoryID',ProductController.ProductListBySimilier)
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails)


router.get('/ProductListByKeyword/:Keyword',ProductController.ProductListByKeyword)

router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList)

// Users

router.get('/userotp/:email',UserController.UserOTP)
router.get('/verifyotp/:email/:otp',UserController.VerifyLogin)
router.post('/userlogout',AuthVerification,UserController.UserLogout)
router.post('/CreateProfile',AuthVerification,UserController.CreateProfile)
router.get('/readprofile',AuthVerification,UserController.ReadProfile)

// wishList

router.post('/savewishlist',AuthVerification,WishlistController.SaveWishList)
router.post('/removewishlist',AuthVerification,WishlistController.RemoveWishList)
router.get('/WishList',AuthVerification,WishlistController.WishList)

// cart

router.get('/cartlist',AuthVerification,CartListController.CartList)
router.post('/savecartlist',AuthVerification,CartListController.SaveCartList)
router.post('/updatecartlist/:cartID',AuthVerification,CartListController.UpdateCartList)
router.delete('/removecartlist',AuthVerification,CartListController.RemoveCartList)

// Invoice and Payment

router.get('/createinvoice',AuthVerification,InvoiceController.CreateInvoice)
router.get('/invoicelist',AuthVerification,InvoiceController.InvoiceList)
router.get('/invoiceproductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList)

router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess)
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail)
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancel)
router.post('/PaymentPending/:trxID',InvoiceController.PaymentPending)
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN)

// Features
router.get('/features',FeaturesController.FeaturesController)

// Create riview
router.post('/createriview',AuthVerification,ProductController.CreateReview)


 
export  default router  