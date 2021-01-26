import { config } from "dotenv";
import express from "express";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/client", clientRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
