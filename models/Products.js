import mongoose from "mongoose";
const ProductsSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    author: {
      type: String,
      require: true
    },
    categoryId: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    image: {
      type: String,
      require: true
    },
    judge: {
      type: String,
      // require: true
    },
    description: {
       type: String,
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema);
