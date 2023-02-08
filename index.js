const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const mongoDB = require("./mongoose.js");

const authRouter = require("./Routes/auth");
const defaultRouter = require("./Routes/default");

app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api", defaultRouter);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

mongoDB.connect();
