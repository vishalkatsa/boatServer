const AddToCart = require('../model/AddToCart_model');


const addtocardproduct = async (req, res) => {
    try {
        const { userId, productId,price, quantity } = req.body;
        const findproductid = await AddToCart.findOne({ productId });
        if (findproductid == null) {
            const newCard = new AddToCart({
                userId,
                productId,
                quantity,
                price
            });
            const savedCard = newCard.save();
            return res.status(201).json({ message: "savedCard_200", savedCard: savedCard })
        } else if (findproductid) {
            let quantityNumber = findproductid.quantity;
            const quantityUpdate = await AddToCart.findOneAndUpdate({
                productId,
                quantity: quantityNumber + 1,
            });
            return res.status(201).json({ message: "savedCard_200", quantityUpdate: quantityUpdate })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error })
    }

}
const getaddtocardproduct = async (req, res) => {
    try {
        const userId = req?.params?.id
        if (userId) {
            const userProduct = await AddToCart.find({ userId }).populate("productId", { price: 1, catagory: 1, productname: 1, image: 1, creatAt: 1, discription: 1 });
            return res.status(201).json({ message: "GetuserProduct_201", userProduct: userProduct })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error })
    }
}
const updateproductquantity = async (req, res) => {
    const { quantity, _id } = req.body;

    try {
        if (_id | quantity !== 0) {
            const updatedquantity = await AddToCart.findByIdAndUpdate(_id, { quantity });
            return res.status(201).json({ message: "updatedquantity_201", updatedquantity: updatedquantity })
        } else if (quantity === 0) {
            const deleted = await AddToCart.findByIdAndDelete(_id);
            return res.status(201).json({ message: "deleted_201", deleted: deleted })
        }
         else {
            return res.status(400).json({ message: "_id_400_not" })
        }
    } catch (error) {
        return res.status(500).json({ message: "catch_error" })
        
    }

};
const deleteaddtocardproduct = async (req,res)=>{
    try {
        const _id = req.params.id;
        if (_id) {
            const deletedAddtocard = await AddToCart.findByIdAndDelete(_id);
            return res.status(200).json({message:"deletedAddtocard_200",deletedAddtocard})
        }
    } catch (error) {
        return res.status(500).json({message:"deletedAddtocard_500",error})
    }
}
const deleteaddtocardall = async (req, res) => {
    try {
        const userId = req.params.userid;
        if (userId) {
            const deletedAddtocard = await AddToCart.deleteMany({userId});
            if (deletedAddtocard) {
                return res.status(200).json({ message: "deletedAddtocard_200", deletedAddtocard });
            } else {
                return res.status(404).json({ message: "No documents found with the provided userId" });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "deletedAddtocard_500", error });
    }
}

module.exports = { addtocardproduct, getaddtocardproduct, updateproductquantity ,deleteaddtocardproduct,deleteaddtocardall}