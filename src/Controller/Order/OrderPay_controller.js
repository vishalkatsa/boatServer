const AddToCart = require('../../model/AddToCart_model');
const config = require('../../config/config');
const crypto = require('crypto');
const axios = require('axios');
const Order = require('../../model/Order/Order_model');
const { Product } = require('../../model/product_model')


const orderpay = async (req, res) => {
    try {
        const { userId } = req.body;

        if (userId) {
            const findUserAddToCart = await AddToCart.find({ userId }).populate("userId", { firstname: 1, lastname: 1, number: 1 });;

            const orderAmount = findUserAddToCart.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            const name = findUserAddToCart.length > 0 ? `${findUserAddToCart[0].userId.firstname} ${findUserAddToCart[0].userId.lastname}` : '';
            const number = findUserAddToCart.length > 0 ? `${findUserAddToCart[0].userId.number}` : '';

            const paydata = {
                name: name,
                amount: orderAmount,
                number: number,
                MUID: "MUID" + Date.now(),
                transactionId: 'T' + Date.now(),
            }
            ///////////////////////////////////////////////////   Phone Pe way /////////////////////////////////////////////////
            const data = {
                merchantId: config.merchant_id,
                merchantTransactionId: paydata.transactionId,
                merchantUserId: paydata.MUID,
                name: paydata.name,
                amount: paydata.amount,
                redirectUrl: `http://localhost:4000/api/order/createorderproduct/?id=${paydata.transactionId}`,
                redirectMode: 'POST',
                mobileNumber: paydata.number,
                paymentInstrument: {
                    type: 'PAY_PAGE'
                }
            };
            const payload = JSON.stringify(data);
            const payloadMain = Buffer.from(payload).toString('base64');
            const keyIndex = 1;
            const string = payloadMain + '/pg/v1/pay' + config.salt_key;
            const sha256 = crypto.createHash('sha256').update(string).digest('hex');
            const checksum = sha256 + '###' + keyIndex;
            // console.log(checksum);
            // console.log(payloadMain);
            // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
            const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

            const options = {
                method: 'POST',
                url: prod_URL,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum
                },
                data: {
                    request: payloadMain
                }
            };

            let response = await axios.request(options)
            // console.log("data pay",response.data)
            if (response.data.success === true) {
                ////////////////////////////// payment prosssion /////////////////////////////////

                const orders = findUserAddToCart.map(async item => {
                    try {
                        const product = await Product.findById(item.productId);
                        if (!product) {
                            throw new Error("Product not found");
                        }
                        const sellerId = product.sellerId;
                        const newOrder = new Order({
                            totalprice: (item.price) * (item.quantity),
                            productId: item.productId,
                            quantity: item.quantity,
                            userId: item.userId,
                            sellerId: sellerId,
                            paymentID: paydata.transactionId,
                            paymentStatus: false
                        });
                        await newOrder.save();
                        return newOrder;
                    } catch (err) {
                        console.error("Error saving order:", err);
                        throw err;
                    }
                });
                let datal = await Promise.all(orders);
                return res.status(201).json({ message: "SavedOrder_200" ,data:response.data });
            }else{
                console.log("j");
            }
            // return res.json(response.data)
        } else {
            return res.status(201).json({ message: "wrong userid" })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }


};


module.exports = { orderpay }