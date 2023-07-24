const express = require("express");
const app = express();

const sequelize = require("./util/database");

const bodyParser = require("body-parser");

const userRouter = require("./router/userRouter");
const expenseRouter = require("./router/expenseRouter");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/homePage", expenseRouter);
app.use("/expense", expenseRouter);

// app.listen(3000);
sequelize.sync().then((result) => {
    app.listen(3000);
})
.catch((err) => console.log(err));