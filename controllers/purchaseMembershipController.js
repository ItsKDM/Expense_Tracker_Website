const Razorpay = require('razorpay');
const Order = require("../models/ordersModel");
const userController = require("./userController");

const purchasePremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const amount = 2500;
        console.log("Entered in Controller");
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            req.user
                .createOrder({ orderid: order.id, status: "PENDING" })
                .then(() => {
                    return res.status(201).json({ order, key_id: rzp.key_id });
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};

const updateTransactionStatus = async(req, res) => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } })
        // .then(order => {
        //     order.update({paymenid: payment_id, status: 'SUCCESSFUL'}).then(() => {
        //         req.user.update({isPremiumUser: true});
        //         return res.status(202).json({success: true, message: "Transaction Successful!"})
        //     }).catch((err) => {
        //         throw new Error(err);
        //     })
        // }).catch(err => {
        //     throw new Error(err);
        // })
        const promise1 = order.update({
            paymenid: payment_id,
            status: "SUCCESSFUL",
        });
        const promise2 = req.user.update({ isPremiumUser: true });

        Promise.all([promise1, promise2])
            .then(() => {
                return res.status(202).json({
                    success: true,
                    message: "Transaction Successful",
                    token: userController.generateAccessToken(userId, undefined, true),
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: "Something went Wrong" });
    }
};

module.exports = {
    purchasePremium,
    updateTransactionStatus,
};