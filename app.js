const express = require("express");
const app = express();
let cors = require("cors")

const dotenv = require('dotenv');
dotenv.config();
const sequelize = require("./util/database");
const path = require("path");
const fs = require("fs");

const bodyParser = require("body-parser");

const helmet = require("helmet");

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
);

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {flags: "a"}
);

const morgan = require("morgan");
app.use(morgan("combined", {stream: accessLogStream}));


const userRouter = require("./router/userRouter");
const expenseRouter = require("./router/expenseRouter");
const purchaseMembershipRouter = require("./router/purchaseMembershipRouter");
const leaderboardRouter = require("./router/leaderboardRouter");
const resetPasswordRouter = require("./router/resetPasswordRouter");
const reportsRouter = require("./router/reportsRouter")

const User = require("./models/userModel")
const Expense = require("./models/expenseModel");
const Order = require("./models/ordersModel");
const ResetPassword = require("./models/resetPasswordModel");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/homePage", expenseRouter);
app.use("/expense", expenseRouter);
app.use("/purchase", purchaseMembershipRouter);
app.use("/premium", leaderboardRouter);
app.use("/password", resetPasswordRouter);
app.use("/reports", reportsRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

ResetPassword.belongsTo(User);
User.hasMany(ResetPassword);

// app.listen(3000);
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000);
})
.catch((err) => console.log(err));