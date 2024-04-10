const Order = require('../../model/Order/Order_model');
const AddToCart = require('../../model/AddToCart_model');


const createorderproduct = async (req, res) => {
    try {
        const { userId } = req.body;
        // console.log(userId);
        const findUserAddToCart = await AddToCart.find({ userId });
        // console.log(findUserAddToCart);

        const orders = findUserAddToCart.map(item => {
            const newOrder = new Order({
                totalprice: (item.price)*(item.quantity),
                productId: item.productId,
                quantity: item.quantity,
                userId: item.userId
            });
            return newOrder.save();
        });

        const data = await Promise.all(orders);
        // console.log(data);

        return res.status(201).json({ message: "SavedOrder_200" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "FailedOrder_500", error: error });
    }
}

const getorderseller = async (req, res) => {
    try {
        const userId = req?.params?.id;
        console.log("userId".userId);
        if (userId) {
            const allOrder = await Order.find({ userId })
            .populate("productId", { price: 1, catagory: 1, productname: 1, image: 1, creatAt: 1, discription: 1 })
            .populate("addressId", { fullname: 1, mobilenumber: 1, pincode: 1, state: 1, creatAt: 1, city: 1 , fulladdress: 1, roadnumber: 1});
            return res.status(201).json({ message: "Getgetorder_201", allOrder })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error })
    }
}
const updateproductorder = async (req, res) => {
    const { quantity, _id,price } = req.body;

    try {
        if (_id | quantity !== 0) {
            const updatedquantity = await Order.findByIdAndUpdate(_id, { quantity ,price});
            return res.status(201).json({ message: "updatedquantity_201", updatedquantity: updatedquantity })
        } else if (quantity === 0) {
            const deleted = await Order.findByIdAndDelete(_id);
            return res.status(201).json({ message: "deleted_201", deleted: deleted })
        }
         else {
            return res.status(400).json({ message: "_id_400_not" })
        }
    } catch (error) {
        return res.status(500).json({ message: "catch_error" })
        
    }

};
const deleteaddtocardorder = async (req,res)=>{
    try {
        const _id = req.params.id;
        if (_id) {
            const deletedAddtocard = await Order.findByIdAndDelete(_id);
            return res.status(200).json({message:"deletedAddtocard_200",deletedAddtocard})
        }deletedAddtocard
    } catch (error) {
        return res.status(500).json({message:"deletedAddtocard_500",error})
    }
}
module.exports = { createorderproduct,getorderseller}