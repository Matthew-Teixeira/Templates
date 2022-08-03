const express = require("express");
const app = express();
const errorHandler  = require("./middleware/errorMiddleware");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(require("./routes"));
//app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});