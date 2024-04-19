const Order = require('../../model/Order/Order_model');
const AddToCart = require('../../model/AddToCart_model');
const { Product } = require('../../model/product_model')
const config = require('../../config/config');
const crypto = require('crypto');
const axios = require('axios');


const createorderproduct = async (req, res) => {
    try {
        const merchantTransactionId = req.query.id
        const merchantId = config.merchant_id

        const keyIndex = 1;
        const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + config.salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + "###" + keyIndex;

        const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${merchantId}`
            }
        };

        let response = await axios.request(options);
        
        // console.log("response data order", response.data);
        if (response.data.success === true ) { 
            let paymentID = response.data.data.merchantTransactionId;
            try {
                const updateResult = await Order.updateMany(
                    { paymentID },
                    { paymentStatus: true }
                );
                if (updateResult.nModified === 0) {
                    return res.status(404).json({ message: "paymentID_orders_404_not_found" });
                }
                const url = `http://localhost:4200/`;
                return res.redirect(url)
                // return res.status(200).json({ message: "payment_200_updated", });;
            } catch (error) {
                console.error("Error updating orders with paymentID:", error);
                const url = `http://localhost:4200/account` 
                return res.redirect(url);
                // return res.status(500).json({ message: "payment_update_error", error: error.message, redirectUrl: url });
            }
        } else {
            const url = `http://localhost:4200/account`
            return res.status(201).json({ message: "payment_failed", redirectUrl: url });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "FailedOrder_500", error: error });
    }
}



const getorderseller = async (req, res) => {
    try {
        const userId = req.params.id;
        // console.log("userId",userId);
        // console.log(req.params);
        if (userId) {
            const allOrder = await Order.find({ sellerId: userId })
                .populate("productId", { price: 1, catagory: 1, productname: 1, image: 1, creatAt: 1, discription: 1 })
                .populate("userId", { firstname: 1, lastname: 1 });
            // console.log(allOrder);
            return res.status(201).json({ message: "Getgetorder_201", allOrder })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error })
    }
}
const getordercustomer = async (req, res) => {
    try {
        const userId = req.params.id;
        // console.log("userId",userId);
        // console.log(req.params);
        if (userId) {
            const allOrder = await Order.find({ userId })
                .populate("productId", { price: 1, catagory: 1, productname: 1, image: 1, creatAt: 1, discription: 1, image: 1 })
                .populate("userId", { firstname: 1, lastname: 1 });
            // console.log(allOrder);   
            return res.status(201).json({ message: "Getgetorder_201", allOrder })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error })
    }
}
const updateorder = async (req, res) => {
    const { orderId, cancelStatus } = req.body;

    try {
        if (!orderId) {
            return res.status(400).json({ message: "orderId_400_not_provided" });
        }
        if (cancelStatus !== undefined && typeof cancelStatus !== 'boolean') {
            return res.status(400).json({ message: "cancelStatus_400_invalid" });
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { cancelStatus }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "order_404_not_found" });
        }
        return res.status(200).json({ message: "order_200_updated", updatedOrder });
    } catch (error) {
        console.error("Error updating order:", error);
        return res.status(500).json({ message: "internal_server_error" });
    }
};

const deleteaddtocardorder = async (req, res) => {
    try {
        const _id = req.params.id;
        if (_id) {
            const deletedAddtocard = await Order.findByIdAndDelete(_id);
            return res.status(200).json({ message: "deletedAddtocard_200", deletedAddtocard })
        }
    } catch (error) {
        return res.status(500).json({ message: "deletedAddtocard_500", error })
    }
}
module.exports = { createorderproduct, getorderseller, getordercustomer, updateorder }