import { convertFilter } from "../util/index.js";
import Products  from "../models/Products.js"

export const createProducts = async (req, res, next) => {
    try {
      const {  name, description, image, author, categoryId, price, judge } = req.body;
      console.log("req.body",req.body)
      const newProducts = new Products({
        name,
        author,
        categoryId,
        price,
        judge,   
        description,
        image,

      });
      console.log("Products",newProducts)
        const createdProducts = await newProducts.save();
        console.log("createdProducts",createdProducts)
  
      res.status(201).json(createdProducts);
    } catch (error) {
      next(error);
    }
  };
export const updateProducts = async (req, res, next) => {
    try {
        const ProductsId = req?.params?.id;
        const data = req.body;
        const checkID = await Products.findOne({ _id: ProductsId});
        console.log("checkID", checkID);
        if (!checkID) {
          return res.status(404).json({ message: "Trường này khôgn tồn tại" });
        }
        const updateProducts = await Products.findOneAndUpdate(
          { _id: ProductsId },
          { $set: data },
          { new: true }
        );
        console.log("Products", updateProducts);
      
        if (updateProducts === null) {
          return res.status(500).json({ message: "Không thể cập nhật ID." });
        }
      
        res.status(200).json({
          message: "updateProducts đã được cập nhật.",
          updateProducts,
        });
      } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Lỗi server." });
      }
  };
export const deleteProducts = async (req, res, next) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.status(200).json("Products has been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getProducts  = async (req, res, next) => {
    try {
      const { Page, PageSize, Sorts, filters } = req.query;
      const page = parseInt(Page) || 1;
      const pageSize = parseInt(PageSize) || 10;
      const _filter = convertFilter(filters);
      const getProducts  = await Products.find(_filter, "-createdAt -updatedAt -__v")
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(Sorts)
        .lean();
      const total = Products.find(_filter);
      const totalUsers = await Products.countDocuments(total);
  
      res.status(200).json({ getProducts , totalUsers });
      } catch (err) {
        next(err);
      }
    };
export const getProductsId = async (req, res, next) => {
    try {
      const getProducts = await Products.findOne({ _id: req.params.id}).exec();
      if (!getProducts) {
        return res.status(404).json({message: "getProductsId không tồn tại"})
      }
     const data = { ...getProducts._doc};

      return res.status(200).json({message: "Lay Ra Products thành công",data});
    } catch (err) {
      next(err);
    }
  };


