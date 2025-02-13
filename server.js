import express from "express";
import productsRouter from "./routes/products.js";
const port = 8000;
const app = express();

// middleware för loggning
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

//Body parser middleware
app.use(express.json());
app.use(logger);

//Routes
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
