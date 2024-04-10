const ShippingAddress = require('../model/Shipping_Adress_model');

const createshippingaddress = async (req, res) => {
    try {
        const { userId, fullname, mobilenumber, pincode, state, city, fulladdress, roadnumber } = req.body;

        if (userId) {
            const newShippingAddress = new ShippingAddress({
                userId,
                fullname,
                mobilenumber,
                pincode,
                state,
                city,
                fulladdress,
                roadnumber
            });
            const savedShippingAddress = newShippingAddress.save();
            return res.status(201).json({ message: "savedsavedShippingAddress_200" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error })
    }

}

const getshippingaddress = async (req, res) => {
    
    try {
        const { userId } = req.body;
        if (userId) {
            const userAddress = await ShippingAddress.find({userId})
        //    console.log(userAddress);
            return res.status(201).json({ message: "gethippingAddress_200",userAddress })
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ error: error })
    }
}


module.exports = { createshippingaddress ,getshippingaddress}