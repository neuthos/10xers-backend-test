require("dotenv").config();
const express = require("express");
const router = require("./src/routes/index.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/v1/api", router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res
    .status(statusCode)
    .json({success: false, message: err.message, code: statusCode});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
