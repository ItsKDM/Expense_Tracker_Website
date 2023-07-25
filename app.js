const express = require("express");
const app = express();
let cors = require("cors")

const sequelize = require("./util/database");

const bodyParser = require("body-parser");

const dotenv = require('dotenv');
dotenv.config();

const userRouter = require("./router/userRouter");
const expenseRouter = require("./router/expenseRouter");
const purchaseMembershipRouter = require("./router/purchaseMembershipRouter");

const User = require("./models/userModel")
const Expense = require("./models/expenseModel");
const Order = require("./models/ordersModel");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/homePage", expenseRouter);
app.use("/expense", expenseRouter);
app.use("/purchase", purchaseMembershipRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);
// app.listen(3000);
sequelize.sync().then((result) => {
    app.listen(3000);
})
.catch((err) => console.log(err));