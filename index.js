const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./db");
const cors =require('cors')
const userRoutes = require("./Routes/userRoutes");
const sellerRoutes = require("./Routes/sellerRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderHistoryRoutes = require("./Routes/orderHistoryRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());


const Port = process.env.PORT || 8000;
ConnectDB();

app.use("/user/api", userRoutes);
app.use("/seller/api", sellerRoutes);
app.use("/product/api", productRoutes);
app.use("/cart/api", cartRoutes);
app.use("/orderHistory/api", orderHistoryRoutes);
app.use("/review/api", reviewRoutes);

app.listen(Port, () => console.log(`http://localhost:${Port}`));
