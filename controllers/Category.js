import { convertFilter } from "../util/index.js";
import Category  from "../models/Category.js"

export const createCategory = async (req, res, next) => {
    try {
      const {  name, description} = req.body;
      console.log("req.body",req.body)
      const newCategory = new Category({
        name,
        description
      });
      console.log("Category",newCategory)
        const createdCategory = await newCategory.save();
  
      res.status(201).json(createdCategory);
    } catch (error) {
      next(error);
    }
  };
export const updateCategory = async (req, res, next) => {
    try {
        const CategoryId = req?.params?.id;
        const data = req.body;
        const checkID = await Category.findOne({ _id: CategoryId});
        console.log("checkID", checkID);
        if (!checkID) {
          return res.status(404).json({ message: "Trường này khôgn tồn tại" });
        }
        const updateCategory = await Category.findOneAndUpdate(
          { _id: CategoryId },
          { $set: data },
          { new: true }
        );
        console.log("Category", updateCategory);
      
        if (updateCategory === null) {
          return res.status(500).json({ message: "Không thể cập nhật ID." });
        }
      
        res.status(200).json({
          message: "updateCategory đã được cập nhật.",
          updateCategory,
        });
      } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Lỗi server." });
      }
  };
export const deleteCategory = async (req, res, next) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Category has been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getCategory  = async (req, res, next) => {
    try {
      const { Page, PageSize, Sorts, filters } = req.query;
      const page = parseInt(Page) || 1;
      const pageSize = parseInt(PageSize) || 10;
      const _filter = convertFilter(filters);
      const getCategory  = await Category.find(_filter, "-createdAt -updatedAt -__v")
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(Sorts)
        .lean();
      const total = Category.find(_filter);
      const totalUsers = await Category.countDocuments(total);
  
      res.status(200).json({ getCategory , totalUsers });
      } catch (err) {
        next(err);
      }
    };
export const getCategoryId = async (req, res, next) => {
    try {
      const getCategory = await Category.findOne({ _id: req.params.id}).exec();
      if (!getCategory) {
        return res.status(404).json({message: "getCategoryId không tồn tại"})
      }
     const data = { ...getCategory._doc};

      return res.status(200).json({message: "Lay Ra Category thành công",data});
    } catch (err) {
      next(err);
    }
  };


