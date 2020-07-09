import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import routes from "./routes/transaction-routes";

const app = express();
const apiPort = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/build")));

routes(app);

mongoose
  .connect("mongodb://127.0.0.1:27017/transactiondata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.get("/", (req, res) => {
  res.send(`Server is running on port ${apiPort}`);
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

app.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});
