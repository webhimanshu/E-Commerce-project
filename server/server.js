const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookie_parser = require("cookie-parser");
const port = process.env.PORT || 5000;

dotenv.config({ path: "./config.env" });
require("./db/conn.js");
app.use(express.json());
app.use(cookie_parser());
app.use(cors());
app.use(fileupload({ useTempFiles: true }));


app.use("/user",require("./routes/userRoutes"));
app.use("/api",require("./routes/categoryRouter"));
app.use("/api",require("./routes/upload"))
app.use("/api",require("./routes/productRouter"));
app.use("/api",require("./routes/paymentRouter"));


app.get("/", (req, resp) => {
  resp.json({ msg: "Hello From Server" });
});


app.listen(port, () => {
  console.log("Server is running on port number", port);
});
