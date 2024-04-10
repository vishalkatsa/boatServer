const { Product } = require("../model/product_model")


const creatproduct = async (req, res) => {
    try {
        const { sellerId, productname, discription, catagory, price, stock } = req.body;
        // console.log(req.body);
        const file = req.file ? req.file?.path : '';
        const product = new Product({
            sellerId,
            productname,
            discription,
            catagory,
            price,
            stock,
            image: file
        });
        // console.log(file,product);
        const savedProduct = await product.save();
        res.status(200).json({ message: "productSaved_200", savedProduct: savedProduct });
    } catch (error) {
        res.status(500).json({ message: "productError_500", error: error });
        // console.log(error);
    }
};

const getproduct = async (req, res) => {
    try {
        const product = await Product.find();
        return res.status(201).json({ message: "productGet_201", product: product })

    } catch (error) {
        res.status(400).json({ message: "productErrorGet_400", error: error })
        // console.log(error);
    }
}

module.exports = { creatproduct, getproduct };