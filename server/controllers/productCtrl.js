const Products = require("../modal/productModel");

// Filter ,Sorting,Pagination

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    // we got sort from queryString object and did sorting by sortBy variable
    // ANd or part we did sorting via timestamp(present in collection model)
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  filtering() {
    const queryObj = { ...this.queryString }; // queryString=req.query

    console.log({ queryObj: queryObj }); // before delete page

    const excludedFiels = ["page", "sort", "limit"];

    // we are deleting becoz we get data on backend it comes with key and value pair so we are deleting key and value bcoz  we dont need them

    excludedFiels.forEach((e1) => delete queryObj[e1]);

    console.log({ queryObj: queryObj }); // after delete page

    // we are strinify our obj to perform regex operation
    let queryStr = JSON.stringify(queryObj);

    //gte=Greter than or equal
    //gt=greater than
    // lt= less than
    // lte=less than or equal

    //we are adding $ sign at start of our queryStr
    // for character filter [regex]=man
    // for numbering filter price[gte]=45
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //we are injecting to find
    this.query.find(JSON.parse(queryStr));

    // it return the object
    return this;
  }

  pagination() {
    //
    const page = this.queryString.page * 1 || 1;

    const limit = this.queryString.limit * 1 || 10;
  
    const skip = (page - 1) * limit;
    

    //  the skip() method will skip the first n document from the query result, you just need to pass the number of records/documents to be skipped.
    //The limit() function in MongoDB is used to specify the maximum number of results to be returned.
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const productCtrl = {
  getProducts: async (req, resp) => {
    try {
      //we created a class and created object with query and queryString  query contain Products.find  and quryString contain queryString
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .pagination();

      const products = await features.query;
      resp.json({
        status: "Success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      resp.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, resp) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return resp.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({ product_id });

      if (product)
        return resp
          .status(400)
          .json({ msg: "This product is already exists." });

      const newProduct = await Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      resp.json({ msg: "Created a product" });
    } catch (err) {
      resp.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, resp) => {
    try {
      await Products.findOneAndDelete(req.param.id);
      resp.json({ msg: "Deleted a Product" });
    } catch (err) {
      resp.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, resp) => {
    try {
      const { title, price, description, content, images, category } = req.body;

      if (!images) return resp.status(400).json({ msg: "No image uploaded" });

      await Products.findOneAndUpdate(
        { _id: req.param.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
      resp.json({ msg: "Updated a Product" });
    } catch (err) {
      resp.status(500).json({ msg: err.message });
    }
  },
};
module.exports = productCtrl;
